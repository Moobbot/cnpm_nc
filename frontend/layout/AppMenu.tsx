/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import RBAC from '@/app/api/RBAC';
import { Permissions } from '@/enums/permissions.enums';

const AppMenu = () => {
    // Lấy danh sách quyền của người dùng
    let permissions = RBAC();

    const { layoutConfig } = useContext(LayoutContext);

    // Xây dựng danh sách menu
    const model: AppMenuItem[] = [
        {
            label: 'HOME',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/auth/login' },
                { label: 'Quản lý thiết bị', icon: 'pi pi-fw pi-cog', to: '/quan-ly-thiet-bi' },
                { label: 'Tiếp nhận yêu cầu', icon: 'pi pi-fw pi-inbox', to: '/request' },
                ...(permissions.includes(Permissions.LIST_ALL_PERMISSIONS)
                    ? [
                          { label: 'Quản lý hàng đợi', icon: 'pi pi-fw pi-list', to: '/quan-ly-hang-doi' },
                          { label: 'Quản lý kết quả', icon: 'pi pi-fw pi-file', to: '/quan-ly-ket-qua' },
                          { label: 'Quản lý danh mục', icon: 'pi pi-fw pi-tags', to: '/quan-ly-danh-muc' },
                          { label: 'Nhật kí hoạt động', icon: 'pi pi-fw pi-circle', to: '/logs' }
                      ]
                    : []),
                ...(permissions.includes(Permissions.LIST_ALL_USERS) ? [{ label: 'Quản lý người dùng', icon: 'pi pi-fw pi-user', to: '/crud' }] : []),
                ...(permissions.includes(Permissions.LIST_ALL_ROLES) ? [{ label: 'Quản lý vai trò', icon: 'pi pi-fw pi-circle', to: '/permission' }] : [])
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
