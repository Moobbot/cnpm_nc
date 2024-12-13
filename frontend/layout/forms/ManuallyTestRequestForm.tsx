import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import SaveButton from '../components/SaveButton';
import RBAC from '@/app/api/RBAC';

const ManuallyTestRequestForm = ({ initialBarcode }: { initialBarcode?: string }) => {
    const [barcode, setBarcode] = useState(initialBarcode || '');

    useEffect(() => {
        if (initialBarcode) {
            setBarcode(initialBarcode);
        }
    }, [initialBarcode]);
    
    const permissions = RBAC();

    const formSchema = z.object({
        name: z.string().min(1, "Họ tên là bắt buộc"),
        address: z.string().min(1, "Địa chỉ là bắt buộc"),
        doctor: z.string().min(1, "Bác sĩ chỉ định là bắt buộc"),
        department: z.string().min(1, "Khoa là bắt buộc"),
        room: z.string().min(1, "Phòng là bắt buộc"),
        diagnosis: z.string().min(1, "Chẩn đoán là bắt buộc"),
        ghichu: z.string().optional(),
        gender: z.string().nullable(),
        birthdate: z.date().nullable(),
        insurance: z.string().min(1, "Số thẻ BHYT là bắt buộc"),
        insuranceFrom: z.date().nullable(),
        insuranceTo: z.date().nullable(),
        loaiXetNghiem: z.string().nullable(),
        loaiMauBenhPham: z.string().nullable()

    });
    type FormData = z.infer<typeof formSchema>;
    const [formData, setFormData] = useState<FormData>({
        name: '',
        gender: null,
        birthdate: null,
        insurance: '',
        insuranceFrom: null,
        insuranceTo: null,
        address: '',
        doctor: '',
        department: '',
        room: '',
        diagnosis: '',
        loaiXetNghiem: null,
        loaiMauBenhPham: null,
        ghichu: ''
    });
    

    const genderOptions = [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
        { label: 'Khác', value: 'other' }
    ];

    const loaiXetNghiemOptions = [
        { label: 'Xét nghiệm máu', value: 'xet-nghiem-1' },
        { label: 'Xét nghiệm nước tiểu', value: 'xet-nghiem-2' },
        { label: 'Xét nghiệm dịch tiết', value: 'xet-nghiem-3' },
        { label: 'Xét nghiệm ADN', value: 'xet-nghiem-4' }
    ];

    const loaiMauBenhPhamOptions = [
        { label: 'Máu', value: 'mau-1' },
        { label: 'Nước tiểu', value: 'mau-2' },
        { label: 'Dịch tiết', value: 'mau-3' },
        { label: 'Mẫu sinh thiết', value: 'mau-4' }
    ];
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
        <div className="p-fluid" style={{ position: 'relative' }}>
            <div className="field col-12">
                <label htmlFor="barcode">Mã vạch:</label>
                <InputText id="barcode" value={barcode} readOnly />
            </div>
            <div className="formgrid grid">
                {/* Thông tin bệnh nhân */}
                <div className="col-12 md:col-6">
                    <div className="p-3">
                        <h3>Thông tin bệnh nhân</h3>
                        <div className="formgrid grid">
                            <div className="field col-12 md:col-6 lg:col-4">
                                <label htmlFor="name">Họ tên:</label>
                                <InputText id="name" placeholder="Nhập họ tên" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                {errors.name && <small className="p-error">{errors.name}</small>}
                            </div>
                            <div className="field col-12 md:col-6 lg:col-4">
                                <label htmlFor="gender">Giới tính:</label>
                                <Dropdown id="gender" options={genderOptions} value={formData.gender} onChange={(e) => handleInputChange('gender', e.value)} placeholder="Chọn" />
                            </div>
                            <div className="field col-12 md:col-6 lg:col-4">
                                <label htmlFor="birthdate">Ngày sinh:</label>
                                <Calendar id="birthdate" dateFormat="dd/mm/yy"  value={formData.birthdate || null} onChange={(e) => handleInputChange('birthdate', e.value || null)} showIcon />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="insurance">Số thẻ BHYT:</label>
                                <InputText id="insurance" placeholder="Nhập số thẻ BHYT" value={formData.insurance} onChange={(e) => handleInputChange('insurance', e.target.value)} />
                                {errors.insurance && <small className="p-error">{errors.insurance}</small>}
                            </div>
                            <div className="field col-6 md:col-3">
                                <label htmlFor="from">Hạn thẻ từ:</label>
                                <Calendar id="from" dateFormat="dd/mm/yy"  value={formData.insuranceFrom || null} onChange={(e) => handleInputChange('insuranceFrom', e.value || null)} showIcon />
                            </div>
                            <div className="field col-6 md:col-3">
                                <label htmlFor="to">Đến:</label>
                                <Calendar id="to" dateFormat="dd/mm/yy" value={formData.insuranceTo || null} onChange={(e) => handleInputChange('insuranceTo', e.value || null)} showIcon />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="address">Địa chỉ:</label>
                                <InputText id="address" placeholder="Nhập địa chỉ" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                                {errors.address && <small className="p-error">{errors.address}</small>}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-6"></div>

                {/* Thông tin khám bệnh */}
                <div className="col-12 md:col-6">
                    <div className="p-3">
                        <h3>Thông tin khám bệnh</h3>
                        <div className="formgrid grid">
                            <div className="field col-12">
                                <label htmlFor="doctor">Bác sĩ chỉ định:</label>
                                <InputText id="doctor" placeholder="Nhập tên bác sĩ" value={formData.doctor} onChange={(e) => handleInputChange('doctor', e.target.value)} />
                                {errors.doctor && <small className="p-error">{errors.doctor}</small>}

                            </div>
                            <div className="field col-6">
                                <label htmlFor="department">Khoa:</label>
                                <InputText id="department" placeholder="Nhập khoa" value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} />
                                {errors.department && <small className="p-error">{errors.department}</small>}

                            </div>
                            <div className="field col-6">
                                <label htmlFor="room">Phòng:</label>
                                <InputText id="room" placeholder="Nhập phòng" value={formData.room} onChange={(e) => handleInputChange('room', e.target.value)} />
                                {errors.room && <small className="p-error">{errors.room}</small>}

                            </div>
                            <div className="field col-12">
                                <label htmlFor="diagnosis">Chẩn đoán:</label>
                                <InputText id="diagnosis" placeholder="Nhập chẩn đoán" value={formData.diagnosis} onChange={(e) => handleInputChange('diagnosis', e.target.value)} />
                                {errors.diagnosis && <small className="p-error">{errors.diagnosis}</small>}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin xét nghiệm */}
                <div className="col-12 md:col-6">
                    <div className="p-3" style={{ height: '100%' }}>
                        <h3>Thông tin xét nghiệm</h3>
                        <div className="formgrid grid">
                            <div className="field col-6">
                                <label htmlFor="testType">Loại xét nghiệm:</label>
                                <Dropdown id="testType" options={loaiXetNghiemOptions} value={formData.loaiXetNghiem} onChange={(e) => handleInputChange('loaiXetNghiem', e.value)} placeholder="Chọn" />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="sampleType">Mẫu bệnh phẩm:</label>
                                <Dropdown id="sampleType" options={loaiMauBenhPhamOptions} value={formData.loaiMauBenhPham} onChange={(e) => handleInputChange('loaiMauBenhPham', e.value)} placeholder="Chọn" />
                            </div>
                            <div className="field col-12" style={{ height: '120px' }}>
                                <label htmlFor="notes">Ghi chú:</label>
                                <InputText id="notes" style={{ height: '100%' }} value={formData.ghichu} onChange={(e) => handleInputChange('ghichu', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Nút Submit */}
            <div style={{ width: '200px', marginLeft: '11px' }}>
            <SaveButton label='Submit' onClick={handleSubmit} permissions={permissions} />

            </div>
        </div>
    );
};

export default ManuallyTestRequestForm;
