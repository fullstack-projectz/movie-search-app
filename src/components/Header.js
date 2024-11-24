import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/">🎬 Movie Search App</Link>
                </h1>
                <nav className="space-x-4">
                    <Link to="/" className="hover:text-blue-400">Home</Link>
                    <Link to="/favorites" className="hover:text-blue-400">Favorites</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
