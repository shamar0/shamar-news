// 'use client'
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';
// import axios from 'axios'; // Axios for API calls
// import '../../../public/voiceStyle.css';
// import Popup from './Popup';

// export default function VoiceControl () {
//   const router = useRouter();
//   const [position, setPosition] = useState({ top: 'auto', bottom: '100px', left: 'auto', right: '25px' });
//   const [isListening, setIsListening] = useState(false);
//   const [isSearchMode, setIsSearchMode] = useState(false);
//   const [popupMessage, setPopupMessage] = useState(null); 
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [transcripts, setTranscripts] = useState("");
//   const [showTranscriptPopup, setShowTranscriptPopup] = useState(false);
//   const isRecognitionActive = useRef(false);
//   const recognition = useRef(null);
//   const timeoutRef = useRef(null);

//   const openSearch = () => {
//     // setIsSearchMode(true);
//     setIsSearchMode(true);
//     setIsSearchActive(true);
//     const searchInput = document.querySelector('.form-control');
//     console.log('Opening search...');
//     console.log('isSearchMode in open Search',isSearchMode);

//     if (searchInput) searchInput.focus();
//   };    
//     useEffect(() => {
//     if (isSearchActive && !transcripts.toLowerCase().includes('search')) {
//       const searchInput = document.querySelector('.form-control');
//       setShowTranscriptPopup(false);
//       if (searchInput) {
//         searchInput.value = transcripts;
//         console.log('Search input detected:', transcripts);

//         // Trigger search after 2 seconds of inactivity
//         if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
//         timeoutRef.current = setTimeout(() => {
//           handleSearch(transcripts);
//           // setIsSearchActive(false);
//           searchInput.blur();
//         }, 1000);
//       }
//     }
//   }, [ transcripts,isSearchActive]);

//   const handleSearch = (searchTerm) => {
//         const url = `/products?search=${encodeURIComponent(searchTerm)}`;
//         console.log("Redirecting to: " + url);
//         router.push(url); // Redirect to the search results page
//         console.log("isSearchActive in handleSearch54",isSearchActive);
//         setIsSearchActive(false);
//         setShowTranscriptPopup(false);
//         if (!isListening) {
//           startListening(); // Restart listening after search
//         }
//       };
  
    
    
//   const loadMoreContent = () => {
//     const loadMoreButton = document.querySelector('button.load-more');
//     if (loadMoreButton) loadMoreButton.click();
//   };

//   const scrollDown = () => {
//     window.scrollBy(0, window.innerHeight);
//   };

//   const scrollUp = () => {
//     window.scrollBy(0, -window.innerHeight);
//   };

//   const stopListeningCommand = () => {
//     recognition.current.stop();
//     setIsListening(false);
//   };

//   function clickTrendingCategory() {
//   router.push('/category/trending'); 
    
//   }
  
//   function clickAllCategory() {
//     router.push('/news'); 
//   }
  
//   function clickItCategory() {
//     router.push('/category/it'); 
//   }
  
//   function clickEvCategory() {
//     router.push('/category/ev'); 
//   }
  
//   function clickTechnologyCategory() {
//     document.querySelector('a[href="/category/tech"]').click();
//   }
  
//   function clickScienceOrEnvironmentCategory() {
//     document.querySelector('a[href="/category/science&enviroment"]').click();
//   }
  
//   function clickBusinessCategory() {
//     document.querySelector('a[href="/category/business"]').click();
//   }
  
//   function clickEntertainmentCategory() {
//     document.querySelector('a[href="/category/entertainment"]').click();
//   }
  
//   function clickPoliticsCategory() {
//     document.querySelector('a[href="/category/politics"]').click();
//   }
  
//   function clickEducationCategory() {
//     document.querySelector('a[href="/category/education"]').click();
//   }
  
//   function clickHealthCategory() {
//     document.querySelector('a[href="/category/health"]').click();
//   }
  
//   function clickSportsCategory() {
//     router.push('/category/sports'); 
//   }
  
//   function clickTechnologyCategory() {
//     router.push('/category/tech'); 
//   }
  
//   const callOpenAI = async (transcript) => {
//     if (!isSearchActive) {
//       try {
//         const response = await axios.post('/api/openai', { transcript });
  
//         console.log('OpenAI Response:', response.data.message);
//         return response.data.message;
//       } catch (error) {
//         console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
//         throw error;
//       }
//     }
//   };
  

//   // Handles voice commands
//   const handleVoiceCommand = async (transcript) => {
//     if (isSearchActive) {
//       console.log("Search is active, skipping voice command handling.");
//       return;
//     }
//     try {
//       setShowTranscriptPopup(true);
//       setPopupMessage(null);
//       if(!isSearchActive){
//       const aiResponse = await callOpenAI(transcript);
//       if (aiResponse.includes('()')) {
//         const functionName = aiResponse;
//       setShowTranscriptPopup(false);
//       setPopupMessage(null);
//       if (functionName === 'openSearch()' || functionName === 'openSearch') {
//         openSearch();
//       } else if (functionName === 'loadMoreContent()') {
//         loadMoreContent();
//       } else if (functionName === 'scrollDown()') {
//         scrollDown();
//       } else if (functionName === 'scrollUp()') {
//         scrollUp();
//       } else if (functionName === 'clickTechnologyCategory()') {
//         clickTechnologyCategory();
//       } else if (functionName === 'clickSportsCategory()') {
//         clickSportsCategory();
//       }else if (functionName === 'clickAllCategory()') {
//         clickAllCategory();
//       } else if (functionName === 'clickBusinessCategory()') {
//         clickBusinessCategory();
//       } else if (functionName === 'clickEntertainmentCategory()') {
//         clickEntertainmentCategory();
//       } else if (functionName === 'clickPoliticsCategory()') {
//         clickPoliticsCategory();
//       } else if (functionName === 'clickEvCategory()') {
//         clickEvCategory();
//       } else if (functionName === 'clickItCategory()') {
//         clickItCategory();
//       } else if (functionName === 'clickTrendingCategory()') {
//         clickTrendingCategory();
//       } else if (functionName === 'clickHealthCategory()') {
//         clickHealthCategory();
//       } else if (functionName === 'clickEducationCategory()') {
//         clickEducationCategory();
//       } else if (functionName === 'clickScienceOrEnvironmentCategory()') {
//         clickScienceOrEnvironmentCategory();
//       } else {
//         console.log('Unknown command or function not mapped');
//       }
//     }else{
//       setTimeout(()=>{
//       setShowTranscriptPopup(false);
//       setPopupMessage(aiResponse);
//       console.log('AI Response:', aiResponse);
//       },1000);
//     }
//   }
//     if (!isListening) {
//       startListening();
//     }
//     } catch (error) {
//       console.error('Error handling voice command:', error);
//     }
//     }

//     const closePopup = () => {
//       setPopupMessage(null); // Close the popup when the user clicks the close button
//     };

//     const closeTranscriptPopup = () => {
//       setShowTranscriptPopup(false); // Close the transcript popup manually
//     };
  

//   useEffect(() => { 
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognition.current = new SpeechRecognition();
//     recognition.current.continuous = true;
//     recognition.current.lang = 'en-US';
//     recognition.current.interimResults = false;
  
//     recognition.current.onresult = (event) => {
//       const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
//       console.log("Heard: ", transcript);
//       setTranscripts(transcript);
//       setShowTranscriptPopup(true);
//       if (!isSearchActive) {
//         console.log("isSearchActive in if",isSearchActive)
//         console.log("Calling handleVoiceCommand");
//         handleVoiceCommand(transcript);
//       } else {
//         console.log("isSearchMode in else ",isSearchMode)
//         console.log("Search mode is active, skipping handleVoiceCommand.");
//       }
//     };
  
//     recognition.current.onend = () => {
//       console.log("Recognition ended.");
      
//       // Only restart if recognition is active and we're still listening
//       if (isRecognitionActive.current && isListening) {
//         console.log("Restarting recognition...");
        
//         // Check if recognition is initialized
//         if (!recognition.current) {
//           console.log("Recognition instance not found, creating a new one.");
//           const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//           recognition.current = new SpeechRecognition();
//         }
        
//         // Always restart recognition here, regardless of the 'continuous' property
//         try {
//           recognition.current.start();
//         } catch (error) {
//           console.error("Failed to start recognition: ", error);
//         }
//       } else {
//         console.log("Recognition stopped manually or is not active.");
//       }
//     };
    
//     recognition.current.onerror = (event) => {
//       console.error('Speech recognition error', event.error);
//       if (event.error === 'no-speech') {
//         console.log('No speech detected, stopping recognition.');
//         isRecognitionActive.current = true;
//         setIsListening(true);
//       } else if (event.error === 'aborted') {
//         console.log('Recognition aborted, not restarting.');
//         isRecognitionActive.current = false;
//         setIsListening(false);
//       }
//     };
  
//     // Start recognition if conditions are met
//     if (isListening && isRecognitionActive.current) {
//       recognition.current.start();
//     }
  
//     return () => {
//       recognition.current && recognition.current.stop();
//     };
//   }, [isListening, isSearchActive]);
  
//   useEffect(() => {
//     if (!recognition.current || isRecognitionActive.current || !isListening || isSearchActive) {
//       console.log("Skipping recognition start due to conditions.");
//       return;
//     }
//     console.log("Starting recognition.");
//     recognition.current.start();
//   }, [isListening, isSearchActive]);
  
// const startListening = () => {
//   if (isRecognitionActive.current) {
//     console.log("Recognition already started, skipping start.");
//     return; // Prevent starting again if already active
//   }
//   console.log("Starting recognition by startListening.");
//   isRecognitionActive.current = true;
//   setIsListening(true);

//   // Ensure that recognition isn't already started
//   if (!recognition.current) {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognition.current = new SpeechRecognition();
//   }
  
//   if (recognition.current && recognition.current.continuous === false) {
//     recognition.current.start();
//   }
// }
// // Function to stop listening
// const stopListening = () => {
//   if (isRecognitionActive.current && recognition.current) {
//     console.log("Stopping recognition by stopListening.");
//     isRecognitionActive.current = false;
//     setIsListening(false);
//     recognition.current.stop();
//   } else {
//     console.log("Recognition already stopped, skipping stop.");
//   }
// };

  
//   // Function to toggle listening state
//   const toggleListening = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };
  

//   const handleDragStart = (e) => {
//     e.dataTransfer.setData('text/plain', '');
//   };

//   const handleDragEnd = (e) => {
//     const newX = e.clientX - 10; 
//     const newY = e.clientY - 10; 
//     setPosition({ top: `${newY}px`, left: `${newX}px`, bottom: 'auto', right: 'auto' });
//   };

//   const handleTouchStart = (e) => {
//     // e.preventDefault();
//     document.body.classList.add('no-scroll');
//   };
//   const handleTouchEnd = () => {
//     document.body.classList.remove('no-scroll'); // Re-enable scroll after touch ends
//   };
  
//   const handleTouchMove = (e) => {
//     const touch = e.touches[0];
//     const newX = touch.clientX - 40; 
//     const newY = touch.clientY - 40; 
//     setPosition({ top: `${newY}px`, left: `${newX}px`, bottom: 'auto', right: 'auto' });
//   };

//   return (
//   <div>
//   {isListening ? 
//       <img
//       onClick={toggleListening}
//       src="/mic.gif"
//       alt="AI Robot"
//       className='chatbot-image mic-image'
//       style={{ 
//         top: position.top,
//         bottom: position.bottom,
//         left: position.left,
//         right: position.right,
//         zIndex: '1001',
//       }}
//       draggable="true"
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       />
//       : 
//       <img
//       onClick={toggleListening}
//       src="/chatbot.gif"
//       alt="AI Robot"
//       className='chatbot-image'
//       style={{ 
//         top: position.top,
//         bottom: position.bottom,
//         left: position.left,
//         right: position.right,
//         zIndex: '1001',
//       }}
//       draggable="true"
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       />
//       }
//       {showTranscriptPopup && 
//         <Popup message={`${transcripts}`} onClose={closeTranscriptPopup} isTranscript={true}/>
//       }
//       {popupMessage && <Popup message={popupMessage} onClose={closePopup} isTranscript={false} />}
//     </div>
//   );
// }
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Axios for API calls
import '../../../public/voiceStyle.css';
import Popup from './Popup';
import { getVisibleHeadlines } from './getVisibleHeadlines';

export default function VoiceControl () {
  const router = useRouter();
  const [position, setPosition] = useState({ top: 'auto', bottom: '100px', left: 'auto', right: '25px' });
  const [isListening, setIsListening] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null); 
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [transcripts, setTranscripts] = useState("");
  const [showTranscriptPopup, setShowTranscriptPopup] = useState(false);
  const isRecognitionActive = useRef(false);
  const recognition = useRef(null);
  const timeoutRef = useRef(null);

  const openSearch = () => {
    // setIsSearchMode(true);
    setIsSearchMode(true);
    setIsSearchActive(true);
    const searchInput = document.querySelector('.form-control');
    // console.log('Opening search...');
    // console.log('isSearchMode in open Search',isSearchMode);

    if (searchInput) searchInput.focus();
  };    
    useEffect(() => {
    if (isSearchActive && !transcripts.toLowerCase().includes('search')) {
      const searchInput = document.querySelector('.form-control');
      setShowTranscriptPopup(false);
      if (searchInput) {
        searchInput.value = transcripts;
        // console.log('Search input detected:', transcripts);

        // Trigger search after 2 seconds of inactivity
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
        timeoutRef.current = setTimeout(() => {
          handleSearch(transcripts);
          // setIsSearchActive(false);
          searchInput.blur();
        }, 1000);
      }
    }
  }, [ transcripts,isSearchActive]);

  const handleSearch = (searchTerm) => {
        const url = `/products?search=${encodeURIComponent(searchTerm)}`;
        console.log("Redirecting to: " + url);
        router.push(url); // Redirect to the search results page
        // console.log("isSearchActive in handleSearch54",isSearchActive);
        setIsSearchActive(false);
        setShowTranscriptPopup(false);
        if (!isListening) {
          startListening(); // Restart listening after search
        }
      };
  
    
    
  const loadMoreContent = () => {
    const loadMoreButton = document.querySelector('button.load-more');
    if (loadMoreButton) loadMoreButton.click();
  };

  const scrollDown = () => {
    window.scrollBy(0, window.innerHeight);
  };

  const scrollUp = () => {
    window.scrollBy(0, -window.innerHeight);
  };

  const stopListeningCommand = () => {
    recognition.current.stop();
    setIsListening(false);
  };

  function clickTrendingCategory() {
  router.push('/category/trending'); 
    
  }
  
  function clickAllCategory() {
    router.push('/news'); 
  }
  
  function clickItCategory() {
    router.push('/category/it'); 
  }
  
  function clickEvCategory() {
    router.push('/category/ev'); 
  }
  
  function clickTechnologyCategory() {
    document.querySelector('a[href="/category/tech"]').click();
  }
  
  function clickScienceOrEnvironmentCategory() {
    document.querySelector('a[href="/category/science&enviroment"]').click();
  }
  
  function clickBusinessCategory() {
    document.querySelector('a[href="/category/business"]').click();
  }
  
  function clickEntertainmentCategory() {
    document.querySelector('a[href="/category/entertainment"]').click();
  }
  
  function clickPoliticsCategory() {
    document.querySelector('a[href="/category/politics"]').click();
  }
  
  function clickEducationCategory() {
    document.querySelector('a[href="/category/education"]').click();
  }
  
  function clickHealthCategory() {
    document.querySelector('a[href="/category/health"]').click();
  }
  
  function clickSportsCategory() {
    router.push('/category/sports'); 
  }
  
  function clickTechnologyCategory() {
    router.push('/category/tech'); 
  }

const readHeadline = () => {
  const visibleHeadlines = getVisibleHeadlines();
  if (visibleHeadlines.length > 0) {
    visibleHeadlines.forEach((headline, index) => {
      setTimeout(() => {
        // console.log(`Reading headline ${index + 1}: ${headline}`);
        speakText(headline,index);
      }, index * 2000); // Adjust the timing as needed for readability
    });
  } else {
    console.log("No visible headlines to read.");
    speakText("No visible headlines to read.");
  }
};

// Function to handle text-to-speech
const speakText = (text,index) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(`Headline ${index + 1}: ${text}`);
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Text-to-speech is not supported in this browser.");
  }
};

  const callOpenAI = async (transcript) => {
    if (!isSearchActive) {
      try {
        const response = await axios.post('/api/openai', { transcript });
  
        // console.log('OpenAI Response:', response.data.message);
        return response.data.message;
      } catch (error) {
        console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  };
  

  // Handles voice commands
  const handleVoiceCommand = async (transcript) => {
    if (isSearchActive) {
      // console.log("Search is active, skipping voice command handling.");
      return;
    }
    try {
      setShowTranscriptPopup(true);
      setPopupMessage(null);
      if(!isSearchActive){
      const aiResponse = await callOpenAI(transcript);
      if (aiResponse.includes('()')) {
        const functionName = aiResponse;
      setShowTranscriptPopup(false);
      setPopupMessage(null);
      if (functionName === 'readHeadline()') {
        // console.log("headline")
        readHeadline();
      }
      else if (functionName === 'openSearch()' || functionName === 'openSearch') {
        openSearch();
      } else if (functionName === 'loadMoreContent()') {
        loadMoreContent();
      } else if (functionName === 'scrollDown()') {
        scrollDown();
      } else if (functionName === 'scrollUp()') {
        scrollUp();
      } else if (functionName === 'clickTechnologyCategory()') {
        clickTechnologyCategory();
      } else if (functionName === 'clickSportsCategory()') {
        clickSportsCategory();
      }else if (functionName === 'clickAllCategory()') {
        clickAllCategory();
      } else if (functionName === 'clickBusinessCategory()') {
        clickBusinessCategory();
      } else if (functionName === 'clickEntertainmentCategory()') {
        clickEntertainmentCategory();
      } else if (functionName === 'clickPoliticsCategory()') {
        clickPoliticsCategory();
      } else if (functionName === 'clickEvCategory()') {
        clickEvCategory();
      } else if (functionName === 'clickItCategory()') {
        clickItCategory();
      } else if (functionName === 'clickTrendingCategory()') {
        clickTrendingCategory();
      } else if (functionName === 'clickHealthCategory()') {
        clickHealthCategory();
      } else if (functionName === 'clickEducationCategory()') {
        clickEducationCategory();
      } else if (functionName === 'clickScienceOrEnvironmentCategory()') {
        clickScienceOrEnvironmentCategory();
      } else {
        console.log('Unknown command or function not mapped');
      }
    }else{
      setTimeout(()=>{
      setShowTranscriptPopup(false);
      setPopupMessage(aiResponse);
      console.log('AI Response:', aiResponse);
      },1000);
    }
  }
    if (!isListening) {
      startListening();
    }
    } catch (error) {
      console.error('Error handling voice command:', error);
    }
    }

    const closePopup = () => {
      setPopupMessage(null); // Close the popup when the user clicks the close button
    };

    const closeTranscriptPopup = () => {
      setShowTranscriptPopup(false); // Close the transcript popup manually
    };
  

  useEffect(() => { 
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.lang = 'en-US';
    recognition.current.interimResults = false;
  
    recognition.current.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
      console.log("Heard: ", transcript);
      setTranscripts(transcript);
      setShowTranscriptPopup(true);
      if (!isSearchActive) {
        console.log("isSearchActive in if",isSearchActive)
        console.log("Calling handleVoiceCommand");
        handleVoiceCommand(transcript);
      } else {
        console.log("isSearchMode in else ",isSearchMode)
        console.log("Search mode is active, skipping handleVoiceCommand.");
      }
    };
  
    recognition.current.onend = () => {
      console.log("Recognition ended.");
      
      // Only restart if recognition is active and we're still listening
      if (isRecognitionActive.current && isListening) {
        console.log("Restarting recognition...");
        
        // Check if recognition is initialized
        if (!recognition.current) {
          console.log("Recognition instance not found, creating a new one.");
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          recognition.current = new SpeechRecognition();
        }
        
        // Always restart recognition here, regardless of the 'continuous' property
        try {
          recognition.current.start();
        } catch (error) {
          console.error("Failed to start recognition: ", error);
        }
      } else {
        console.log("Recognition stopped manually or is not active.");
      }
    };
    
    recognition.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'no-speech') {
        console.log('No speech detected, stopping recognition.');
        isRecognitionActive.current = true;
        setIsListening(true);
      } else if (event.error === 'aborted') {
        console.log('Recognition aborted, not restarting.');
        isRecognitionActive.current = false;
        setIsListening(false);
      }
    };
  
    // Start recognition if conditions are met
    if (isListening && isRecognitionActive.current) {
      recognition.current.start();
    }
  
    return () => {
      recognition.current && recognition.current.stop();
    };
  }, [isListening, isSearchActive]);
  
  useEffect(() => {
    if (!recognition.current || isRecognitionActive.current || !isListening || isSearchActive) {
      console.log("Skipping recognition start due to conditions.");
      return;
    }
    console.log("Starting recognition.");
    recognition.current.start();
  }, [isListening, isSearchActive]);
  
const startListening = () => {
  if (isRecognitionActive.current) {
    console.log("Recognition already started, skipping start.");
    return; // Prevent starting again if already active
  }
  console.log("Starting recognition by startListening.");
  isRecognitionActive.current = true;
  setIsListening(true);

  // Ensure that recognition isn't already started
  if (!recognition.current) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
  }
  
  if (recognition.current && recognition.current.continuous === false) {
    recognition.current.start();
  }
}
// Function to stop listening
const stopListening = () => {
  if (isRecognitionActive.current && recognition.current) {
    console.log("Stopping recognition by stopListening.");
    isRecognitionActive.current = false;
    setIsListening(false);
    recognition.current.stop();
  } else {
    console.log("Recognition already stopped, skipping stop.");
  }
};

  
  // Function to toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = (e) => {
    const newX = e.clientX - 10; 
    const newY = e.clientY - 10; 
    setPosition({ top: `${newY}px`, left: `${newX}px`, bottom: 'auto', right: 'auto' });
  };

  const handleTouchStart = (e) => {
    // e.preventDefault();
    document.body.classList.add('no-scroll');
  };
  const handleTouchEnd = () => {
    document.body.classList.remove('no-scroll'); // Re-enable scroll after touch ends
  };
  
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const newX = touch.clientX - 40; 
    const newY = touch.clientY - 40; 
    setPosition({ top: `${newY}px`, left: `${newX}px`, bottom: 'auto', right: 'auto' });
  };

  return (
  <div>
  {isListening ? 
      <img
      onClick={toggleListening}
      src="/mic.gif"
      alt="AI Robot"
      className='chatbot-image mic-image'
      style={{ 
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        zIndex: '1001',
      }}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      />
      : 
      <img
      onClick={toggleListening}
      src="/chatbot.gif"
      alt="AI Robot"
      className='chatbot-image'
      style={{ 
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        zIndex: '1001',
      }}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      />
      }
      {showTranscriptPopup && 
        <Popup message={`${transcripts}`} onClose={closeTranscriptPopup} isTranscript={true}/>
      }
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} isTranscript={false} />}
    </div>
  );
}