import { Types } from "mongoose";

export interface ITcpClientParameters {
    ip_address: string;
    port: number;
}

export interface ITcpServerParameters {
    port: number;
}

export interface ISerialParameters {
    port: number;
    baud_rate: number;
    parity: string;
    data_bits: number;
    stop_bits: number;
}

export interface ITechnicalLink {
    tcp_client_parameters: ITcpClientParameters;
    tcp_server_parameters: ITcpServerParameters;
    serial_parameters: ISerialParameters;
}

export interface IDevice {
    device_protocol: string;
    device_name: string;
    device_type: string;
    supplier: string;
    device_code: string;
    ip_device: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    technical_link: ITechnicalLink;

}