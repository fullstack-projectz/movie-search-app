import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p className="text-sm">© {new Date().getFullYear()} Movie Search App. All rights reserved.</p>
                <p className="text-xs">Created by Meganathan@2024</p>
            </div>
        </footer>
    );
};

export default Footer;
