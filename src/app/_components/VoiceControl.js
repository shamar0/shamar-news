'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Axios for API calls
import '../../../public/voiceStyle.css';
import Popup from './Popup';

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
    setIsSearchMode(true);
    setIsSearchActive(true);
    const searchInput = document.querySelector('.form-control');
    console.log('Opening search...');
    if (searchInput) searchInput.focus();
  };    
    useEffect(() => {
    if (isSearchActive && !transcripts.toLowerCase().includes('search')) {
      const searchInput = document.querySelector('.form-control');
      if (searchInput) {
        searchInput.value = transcripts;
        console.log('Search input detected:', transcripts);

        // Trigger search after 2 seconds of inactivity
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
        timeoutRef.current = setTimeout(() => {
          handleSearch(transcripts);
          setIsSearchActive(false);
          searchInput.blur();
        }, 2000);
      }
    }
  }, [ transcripts,isSearchActive]);

  const handleSearch = (searchTerm) => {
        const url = `/products?search=${encodeURIComponent(searchTerm)}`;
        console.log("Redirecting to: " + url);
        router.push(url); // Redirect to the search results page
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
  
  const callOpenAI = async (transcript) => {
    if (!isSearchActive) {
      try {
        const response = await axios.post('/api/openai', { transcript });
  
        console.log('OpenAI Response:', response.data.message);
        return response.data.message;
      } catch (error) {
        console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  };
  

  // Handles voice commands
  const handleVoiceCommand = async (transcript) => {
    try {
      if (isSearchActive) {
        const searchInput = document.querySelector('.form-control');
        if (searchInput) {
          searchInput.value = transcript; // Write the transcript in the search input box
          setIsSearchMode(false); // Exit search mode after writing
          console.log('Search input updated with:', transcript);
        }
      }else {
      const aiResponse = await callOpenAI(transcript);
      if (aiResponse.includes('()')) {
        const functionName = aiResponse;
      if (functionName === 'openSearch()' || functionName === 'openSearch') {
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
    recognition.current.lang = 'en-IN';
    recognition.current.interimResults = false;

    recognition.current.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
      console.log("Heard: ",transcript);
      setTranscripts(transcript);
      setShowTranscriptPopup(true);
      handleVoiceCommand(transcript);
    };

    recognition.current.onend = () => {
      if (isListening && isRecognitionActive.current) {
        recognition.current.start(); // Restart only if it's supposed to be listening
      }
     
    };

    // recognition.current.onerror = (event) => {
    //   if (isListening && isRecognitionActive.current) {
    //     recognition.current.start(); // Handle error by restarting
    //   }
    // };
    recognition.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'no-speech') {
        console.log('No speech detected, stopping recognition.');
        isRecognitionActive.current = false;
      }
    };

    // return () => {
    //   recognition.current.stop();
    //   isRecognitionActive.current = false;
    // };
    return () => {
      recognition.current && recognition.current.stop();
    };
  }, []);

  const startListening = () => {
    if (!isRecognitionActive.current) {
      recognition.current.start();
      isRecognitionActive.current = true;
      setIsListening(true);
    } else {
      console.log("Recognition is already active.");
    }
  };

  const stopListening = () => {
    recognition.current.stop();
    isRecognitionActive.current = false;
    setIsListening(false);
  };

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
    const newX = e.clientX - 40; 
    const newY = e.clientY - 40; 
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
      />
      }
      {showTranscriptPopup && 
        <Popup message={`${transcripts}`} onClose={closeTranscriptPopup} isTranscript={true}/>
      }
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} isTranscript={false} />}
    </div>
  


  );
}