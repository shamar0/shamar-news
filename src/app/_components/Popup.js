import React, { useEffect, useState } from 'react';

export default function Popup({ message, onClose, isTranscript }) {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let index = 0;
    let intervalId;

    const typeCharacter = () => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(typeCharacter, 10);

    return () => clearInterval(intervalId);
  }, [message]);
  

  const styles = {
    '@keyframes animateBorder': {
      '0%': { borderImageSlice: 1, borderImageSource: 'linear-gradient(90deg, #054D87 0%, #F7941F 100%)' },
      '50%': { borderImageSource: 'linear-gradient(180deg, #054D87 0%, #F7941F 100%)' },
      '100%': { borderImageSource: 'linear-gradient(270deg, #054D87 0%, #F7941F 100%)' },
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    content: {
      position: 'relative',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px', // Add rounded corners
      width: '90%',
      maxWidth: '500px',
      color: '#333',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      border: '4px solid', 
      borderImageSlice: 1,
      borderImageSource: 'linear-gradient(90deg, #003366, #F7941F)', // Initial gradient
      animation: 'animateBorder 3s linear infinite',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '8px',
      borderBottom: '1px solid transparent', 
      borderImageSource: 'linear-gradient(to right, #003366, #F7941F)', 
      borderImageSlice: 1, 
      animation: 'animateBorder 3s linear infinite',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#003366',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#F7941F',
      fontSize: '18px',
      cursor: 'pointer',
    },
    message: {
      marginTop: '15px',
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#333',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.title}>
            {isTranscript ? "Recognized Speech :" : 'AI Response :'}
          </span>
          <button style={styles.closeButton} onClick={onClose}>
            &#10005;
          </button>
        </div>
        <div style={styles.message}>{displayedMessage}</div>
      </div>
    </div>
  );
}
