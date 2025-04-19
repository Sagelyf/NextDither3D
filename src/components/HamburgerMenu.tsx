import React from 'react';

interface HamburgerMenuProps {
    isOpen: boolean;
    onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
    return (
        <button onClick={onClick} className="hamburger-menu">
            <div className={`bar ${isOpen ? 'open' : ''}`} />
            <div className={`bar ${isOpen ? 'open' : ''}`} />
            <div className={`bar ${isOpen ? 'open' : ''}`} />
        </button>
    );
};

export default HamburgerMenu;