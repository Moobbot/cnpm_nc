// UserFieldComponents.js

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { Demo } from '@/types';
import { Dropdown } from 'primereact/dropdown';

type Props = {
    user: Demo.User;
    profile: Demo.UserProfile;
    onInputChange: (e: any, name: string) => void;
    submitted: boolean;
    roleOptions: any[];
    onMultiSelectChange: (e: { value: Demo.Role[] }, name: string) => void;
};

export const NameField = ({ user, onInputChange, submitted }: Props) => (
    <div className="field">
        <label htmlFor="name">Tên người dùng</label>
        <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
        {submitted && !user.name && <small className="p-error">Tên người dùng là bắt buộc.</small>}
    </div>
);

export const UsernameField = ({ user, onInputChange, submitted }: Props) => (
    <div className="field">
        <label htmlFor="username">Tên đăng nhập</label>
        <InputText id="username" value={user.username} onChange={(e) => onInputChange(e, 'username')} required className={classNames({ 'p-invalid': submitted && !user.username })} />
        {submitted && !user.username && <small className="p-error">Tên đăng nhập là bắt buộc.</small>}
    </div>
);

export const PasswordField = ({ user, onInputChange, submitted }: Props) => (
    <div className="field">
        <label htmlFor="password">Mật khẩu</label>
        <InputText id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required className={classNames({ 'p-invalid': submitted && !user.password })} />
        {submitted && !user.password && <small className="p-error">Mật khẩu là bắt buộc</small>}
    </div>
);

export const RoleField = ({ user, onMultiSelectChange, roleOptions }: Props) => (
    <div className="field">
        <label htmlFor="roles">Role</label>
        <MultiSelect id="roles" value={user.roles} options={roleOptions} onChange={(e) => onMultiSelectChange(e, 'roles')} placeholder="Select Roles" display="chip" />
    </div>
);
export const GenderField = ({ profile, onInputChange }: Props) => {
    const genderOptions = [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
        { label: 'Khác', value: 'other' }
    ];

    return (
        <div className="field">
            <label htmlFor="gender">Giới tính</label>
            <Dropdown id="gender" value={profile.gender} options={genderOptions} onChange={(e) => onInputChange(e, 'gender')} placeholder="Chọn giới tính" />
        </div>
    );
};

export const PhoneNumberField = ({ profile, onInputChange, submitted }: Props) => (
    <div className="field">
        <label htmlFor="phone">Số điện thoại</label>
        <InputText id="phone" value={profile.phone} onChange={(e) => onInputChange(e, 'phone')} required className={classNames({ 'p-invalid': submitted && !profile.phone })} />
        {submitted && !profile.phone && <small className="p-error">Số điện thoại là bắt buộc.</small>}
    </div>
);

export const AddressField = ({ profile, onInputChange }: Props) => (
    <div className="field">
        <label htmlFor="address">Địa chỉ</label>
        <InputText id="address" value={profile.address} onChange={(e) => onInputChange(e, 'address')} />
    </div>
);
