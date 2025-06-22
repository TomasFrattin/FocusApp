import React from "react";

const Header = () => {
    return (
        <header className="shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a
                    href="/"
                    className="text-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    FocusApp
                </a>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="#features"
                                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a
                                href="#pricing"
                                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;