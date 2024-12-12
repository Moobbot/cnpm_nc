
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { z } from 'zod';
import SaveButton from '../components/SaveButton';
import RBAC from '@/app/api/RBAC';
import CancelButton from '../components/CancelButton';
import SerialForm from './SerialForm';
import { Button } from 'primereact/button';



export default function TestDeviceForm() {

    const permissions = RBAC();

    const formSchema = z.object({
        deviceName: z.string().min(1, "Tên thiết bị là bắt buộc"),
        deviceCode: z.string().min(1, "Mã thiết bị là bắt buộc"),
        manufacturer: z.string().min(1, "Hãng sản xuất là bắt buộc"),
        warranty: z.string().min(1, "Hạn bảo hành là bắt buộc"),
        testGroup: z.string().min(1, "Nhóm xét nghiệm là bắt buộc"),
        port: z.string().min(1, "Cổng là bắt buộc"),
        baudrate: z.string().min(1, "Baudrate là bắt buộc"),
        parity: z.string().min(1, "Parity là bắt buộc"),
        databits: z.string().min(1, "Databits là bắt buộc"),
        stopbits: z.string().min(1, "Stopbits là bắt buộc"),

    });
    type FormData = z.infer<typeof formSchema>;
    const [formData, setFormData] = React.useState<FormData>({
        deviceName: '',
        deviceCode: '',
        manufacturer: '',
        warranty: '',
        testGroup: '',
        port: '',
        baudrate: '',
        parity: '',
        databits: '',
        stopbits: '',
    });
    const [selectedOption, setSelectedOption] = useState('serial'); // Trạng thái mặc định là 'Nhập thủ công'


    const renderForm = () => {
        switch (selectedOption) {
            case 'serial':
                return <SerialForm formData={formData} errors={errors} handleInputChange={handleInputChange} />
            case 'tcpclient':
                return <h2>TCP client</h2> // Thay thế bằng form thực tế
            case 'tcpserver':
                return <h2>TCP server</h2>; // Thay thế bằng form thực tế
            default:
                return null;
        }
    };

    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleInputChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setFormData({ ...formData, [key]: value });
        if (errors[key]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[key];
            setErrors(updatedErrors);
        }
    };
    const handleSubmit = () => {
        const result = formSchema.safeParse(formData);

        if (!result.success) {
            const validationErrors = result.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {} as Record<string, string>);
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        console.log('Form Data:', result.data);
        alert('Dữ liệu hợp lệ và đã được gửi đi!');
    };
  return (
    <div className="p-fluid" style={{ position: 'relative', minHeight: '60vh', paddingBottom:'40px'}}>
      <div className="formgrid grid">
        <div className="col-12 md:col-6">
            <div className='p-3'>
            <h3 style={{marginBottom:'47px'}}>THÔNG TIN THIẾT BỊ XÉT NGHIỆM</h3>
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="deviceName">Tên thiết bị:</label>
              <InputText id="deviceName" value={formData.deviceName} onChange={(e) => handleInputChange('deviceName', e.target.value)} />
              {errors.deviceName && <small className="p-error">{errors.deviceName}</small>}

            </div>
            <div className="field col-12 ">
              <label htmlFor="deviceCode">Mã thiết bị:</label>
              <InputText id="deviceCode" value={formData.deviceCode} onChange={(e) => handleInputChange('deviceCode', e.target.value)} />
                {errors.deviceCode && <small className="p-error">{errors.deviceCode}</small>}
            </div>
            <div className="field col-12 ">
              <label htmlFor="manufacturer">Hãng sản xuất:</label>
                <InputText id="manufacturer" value={formData.manufacturer} onChange={(e) => handleInputChange('manufacturer', e.target.value)} />
              {errors.manufacturer && <small className="p-error">{errors.manufacturer}</small>}

                
            </div>
            <div className="field col-12">
              <label htmlFor="warranty">Hạn bảo hành:</label>
                <InputText id="warranty" value={formData.warranty} onChange={(e) => handleInputChange('warranty', e.target.value)} />
                {errors.warranty && <small className="p-error">{errors.warranty}</small>}
            </div>
            <div className="field col-12 ">
              <label htmlFor="testGroup">Nhóm xét nghiệm:</label>
                <InputText id="testGroup" value={formData.testGroup} onChange={(e) => handleInputChange('testGroup', e.target.value)} />
                {errors.testGroup && <small className="p-error">{errors.testGroup}</small>}
            </div>
          </div>
            </div>
          
        </div>
    
        <div className="col-12 md:col-6">
            <div className='p-3'>
            <h3>CẤU HÌNH THÔNG SỐ KẾT NỐI</h3>
            <div style={{display: 'flex', flexDirection: 'row', gap: 2, marginBottom: '10px'}}>
                <Button label="Serial" className={selectedOption === 'serial' ? 'p-button p-button-primary' : 'p-button-outlined'} style={{height:'20px'}} onClick={() => setSelectedOption('serial')} />
                <Button label="TCP Client" className={selectedOption === 'tcpclient' ? 'p-button p-button-primary' : 'p-button-outlined'} style={{height:'20px'}} onClick={() => setSelectedOption('tcpclient')} />
                <Button label="TCP server" className={selectedOption === 'tcpserver' ? 'p-button p-button-primary' : 'p-button-outlined'} style={{height:'20px'}} onClick={() => setSelectedOption('tcpserver')} />
            </div>
          {renderForm()}
            </div>
          
        </div>
      </div>
    
      <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
            }}>
                <SaveButton label='Cập nhật' permissions={permissions} onClick={handleSubmit} />
                <CancelButton label='Quay lại' onClick={handleSubmit}/>
            </div>
    </div>
    

  )
}
