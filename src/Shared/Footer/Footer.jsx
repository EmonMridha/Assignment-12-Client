import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-10">
            <div>
                <h2 className="text-xl font-bold">AppOrbit</h2>
                <p>© 2025 AppOrbit. All rights reserved.</p>
            </div>
            <div>
                <span className="footer-title">Useful Links</span>
                <a className="link link-hover">About Us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Privacy Policy</a>
                <a className="link link-hover">Terms & Conditions</a>
            </div>
        </footer>
    );
};

export default Footer;