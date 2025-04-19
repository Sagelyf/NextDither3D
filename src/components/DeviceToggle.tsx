import React from 'react';

interface DeviceToggleProps {
    isMobile: boolean;
    onToggle: () => void;
}

const DeviceToggle: React.FC<DeviceToggleProps> = ({ isMobile, onToggle }) => {
    return (
        <button onClick={onToggle}>
            {isMobile ? 'Switch to Desktop View' : 'Switch to Mobile View'}
        </button>
    );
};

export default React.memo(DeviceToggle);
