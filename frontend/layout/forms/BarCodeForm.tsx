import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import ManuallyTestRequestForm from './ManuallyTestRequestForm';

const BarCodeForm = () => {
    const [barcode, setBarcode] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const [reader, setReader] = useState<BrowserMultiFormatReader | null>(null);

    useEffect(() => {
        const initReader = () => {
            try {
                const reader = new BrowserMultiFormatReader();
                setReader(reader);
            } catch (error) {
                console.error('Lỗi khởi tạo barcode reader:', error);
            }
        };

        initReader();
    }, []);

    const startScanning = async () => {
        if (!videoRef.current || !reader) return;

        // Reset barcode value when starting a new scan
        setBarcode('');

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
            });

            if (videoRef.current) {
                // Stop existing video source
                if (videoRef.current.srcObject) {
                    const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                    tracks.forEach((track) => track.stop());
                }

                // Assign new video stream
                videoRef.current.srcObject = stream;

                // Ensure video playback
                if (videoRef.current.paused) {
                    try {
                        await videoRef.current.play();
                    } catch (error) {
                        console.error('Error starting video playback:', error);
                    }
                }

                // Use reader to decode from video stream
                try {
                    const result = await reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
                        if (result) {
                            setBarcode(result.getText());
                            // Stop video stream after successful scan
                            stream.getTracks().forEach((track) => track.stop());
                            reader.reset();
                        }
                    });
                } catch (error) {
                    console.error('Error decoding barcode:', error);
                }
            }
        } catch (error) {
            console.error('Error accessing camera or initializing scanner:', error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
                <div style={{
                    display: 'block',
                    height: '300px',
                    width: '300px',
                    position: 'relative',
                    border: '1px solid #ccc'
                }}>
                    <video
                        ref={videoRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />

                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <button onClick={startScanning}>Bắt đầu quét</button>
                    </div>

                    {barcode && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            padding: '5px'
                        }}>
                            Mã vạch: {barcode}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ flex: '5' }}>
                <ManuallyTestRequestForm initialBarcode={barcode} />
            </div>
        </div>
    );
};

export default BarCodeForm;
