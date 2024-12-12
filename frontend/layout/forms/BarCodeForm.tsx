import ManuallyTestRequestForm from './ManuallyTestRequestForm';

const BarCodeForm = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
                <div style={{ display: 'block', height: '300px', width: '300px' }}>BARCODE</div>
            </div>
            <div style={{ flex: '5' }}>
                <ManuallyTestRequestForm />
            </div>
        </div>
    );
};

export default BarCodeForm;
