'use client'
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        const handleScrollToTop = () => {
            if (window.scrollY === 0) {
                setIsHovered(false); 
                window.removeEventListener('scroll', handleScrollToTop);
            }
        };
        
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        window.addEventListener('scroll', handleScrollToTop);
    };

    const buttonStyle = {
        border: "none",
        borderRadius: "100%",
        height: isHovered? "50px" : "40px",
        width: isHovered? "50px" : "40px",
        backgroundColor: "#F7941F",
        transition: 'height 0.1s ease-in-out, width 0.1s ease-in-out',
    }

    const containerStyle = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "50px",
        width: "50px",
        zIndex: 100,
        border: "1px solid #F7941F",
        borderRadius: "50%",
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
    }

    return (
        <>
            {showButton && (
                <div style={containerStyle}>
                    <button
                        onClick={scrollToTop}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="scroll-to-top-btn"
                        style={buttonStyle} >
                        <i className="fa-solid fa-angle-up" style={{ color: "#fff" }}></i>
                    </button>
                </div>
            )}
        </>
    );
}
