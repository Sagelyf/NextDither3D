import React, { createContext, useState, useContext } from 'react';
import { Device } from '../types';

interface DeviceContextProps {
    devices: Device[];
    selectedDevice: Device | null;
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
    setSelectedDevice: React.Dispatch<React.SetStateAction<Device | null>>;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    return (
        <DeviceContext.Provider value={{ devices, setDevices, selectedDevice, setSelectedDevice }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = (): DeviceContextProps => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error('useDevice must be used within a DeviceProvider');
    }
    return context;
};