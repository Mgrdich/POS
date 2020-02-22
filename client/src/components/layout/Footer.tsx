import React from 'react';

const Footer:React.FC = () => {
    return(
        <footer className="footer">
            Copyright &copy; {new Date().getFullYear()} ITIS
        </footer>
    )
};

export default Footer;