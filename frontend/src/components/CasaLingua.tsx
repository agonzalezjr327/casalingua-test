// // components/CasaLingua.tsx
// import { useState, useRef } from 'react';

// type Message = {
//   text: string;
//   sender: 'user' | 'bot';
//   type?: 'original' | 'simplified' | 'translated';
// };

// export default function CasaLingua() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { text: "Hi! I'm CasaLingua. Need help with a legal document? Upload it or paste text!", sender: 'bot' },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isBotTyping, setIsBotTyping] = useState(false);
//   const [actionType, setActionType] = useState<'simplify' | 'translate' | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const toggleChat = () => setIsOpen(!isOpen);

//   const processText = async (text: string, action: 'simplify' | 'translate') => {
//     try {
//       setIsBotTyping(true);
//       setActionType(action);
      
//       const response = await fetch("http://localhost:5000/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           text,
//           action: action === 'simplify' ? 'simplify' : 'translate' 
//         }),
//       });

//       if (!response.ok) throw new Error('API request failed');
      
//       const data = await response.json();
      
//       setMessages(prev => [
//         ...prev,
//         { 
//           text: action === 'simplify' 
//             ? "Here's the simplified version:" 
//             : "Here's the translated version:", 
//           sender: 'bot' 
//         },
//         { 
//           text: data.simplified || data.translated || "No response", 
//           sender: 'bot',
//           type: action === 'simplify' ? 'simplified' : 'translated'
//         }
//       ]);
      
//     } catch (error) {
//       setMessages(prev => [
//         ...prev,
//         { 
//           text: "Sorry, I couldn't process that. Please try again.", 
//           sender: 'bot' 
//         }
//       ]);
//       console.error("API Error:", error);
//     } finally {
//       setIsBotTyping(false);
//     }
//   };

//   const handleSend = () => {
//     if (!inputText.trim()) return;
    
//     // Add user message
//     setMessages(prev => [...prev, { text: inputText, sender: 'user', type: 'original' }]);
//     setInputText('');
    
//     // Ask for action
//     setMessages(prev => [
//       ...prev, 
//       { 
//         text: "I can simplify or translate this. Which would you like?", 
//         sender: 'bot' 
//       }
//     ]);
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setIsBotTyping(true);
      
//       // Read file content
//       const text = await file.text();
      
//       // Add user upload message
//       setMessages(prev => [
//         ...prev, 
//         { text: `Uploaded: ${file.name}`, sender: 'user' },
//         { text: text.slice(0, 500) + (text.length > 500 ? "..." : ""), sender: 'user', type: 'original' }
//       ]);
      
//       // Ask for action
//       setMessages(prev => [
//         ...prev, 
//         { 
//           text: "I found a legal document. Should I simplify or translate it?", 
//           sender: 'bot' 
//         }
//       ]);
      
//     } catch (error) {
//       setMessages(prev => [
//         ...prev, 
//         { 
//           text: "Failed to read the file. Please try another format.", 
//           sender: 'bot' 
//         }
//       ]);
//     } finally {
//       setIsBotTyping(false);
//     }
//   };

//   const handleQuickAction = (action: 'simplify' | 'translate') => {
//     // Find the last user message with original text
//     const lastOriginal = [...messages].reverse().find(m => m.sender === 'user' && m.type === 'original');
    
//     if (lastOriginal) {
//       processText(lastOriginal.text, action);
//     } else {
//       setMessages(prev => [
//         ...prev,
//         { text: "Please provide text to process first.", sender: 'bot' }
//       ]);
//     }
//   };

//   return (
//     <>
//       {/* Flower Icon Button */}
//       <button
//         onClick={toggleChat}
//         aria-label="Open legal assistance chat"
//         className={`fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110 ${
//           isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'
//         }`}
//       >
//         <div className="relative">
//           {/* Flower center and petals */}
//           <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center">
//             <div className="absolute w-10 h-10 bg-yellow-200 rounded-full"></div>
//             {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
//               <div
//                 key={angle}
//                 className="absolute w-7 h-7 bg-pink-400 rounded-full"
//                 style={{
//                   transform: `rotate(${angle}deg) translateX(25px)`,
//                 }}
//               />
//             ))}
//           </div>
//           {/* Pulsing animation ring */}
//           <div className="absolute -inset-2 border-2 border-pink-200 rounded-full animate-ping opacity-0 hover:opacity-70"></div>
//         </div>
//       </button>

//       {/* Chat Interface */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50 animate-fade-in">
//           {/* Header */}
//           <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
//             <h3 className="font-bold">CasaLingua</h3>
//             <button 
//               onClick={toggleChat}
//               className="text-white hover:text-gray-200 text-xl"
//               aria-label="Close chat"
//             >
//               ×
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="h-64 p-4 overflow-y-auto">
//             {messages.map((msg, i) => (
//               <div 
//                 key={i} 
//                 className={`mb-3 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}
//               >
//                 <div className={`inline-block p-3 rounded-lg ${msg.sender === 'bot' 
//                   ? 'bg-gray-100 text-gray-800' 
//                   : 'bg-blue-500 text-white'} ${
//                     msg.type === 'simplified' ? 'border-l-4 border-green-500' :
//                     msg.type === 'translated' ? 'border-l-4 border-purple-500' : ''
//                   }`}>
//                   {msg.text}
//                   {msg.type === 'original' && (
//                     <div className="text-xs mt-1 text-gray-500">Original text</div>
//                   )}
//                 </div>
//               </div>
//             ))}
//             {isBotTyping && (
//               <div className="flex space-x-1 p-2">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//               </div>
//             )}
//           </div>

//           {/* Quick Action Buttons */}
//           {!isBotTyping && messages.some(m => m.sender === 'user' && m.type === 'original') && (
//             <div className="flex space-x-2 px-4 pb-2">
//               <button 
//                 onClick={() => handleQuickAction('simplify')} 
//                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 Simplify
//               </button>
//               <button 
//                 onClick={() => handleQuickAction('translate')} 
//                 className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 Translate
//               </button>
//             </div>
//           )}

//           {/* Input Area */}
//           <div className="p-3 border-t border-gray-200">
//             <input
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               placeholder="Type or paste legal text..."
//               className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               disabled={isBotTyping}
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm"
//                 disabled={isBotTyping}
//               >
//                 📎 Upload Document
//               </button>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 accept=".pdf,.docx,.txt"
//                 className="hidden"
//                 disabled={isBotTyping}
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded disabled:opacity-50"
//                 disabled={isBotTyping || !inputText.trim()}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// components/CasaLingua.tsx
import { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  type?: 'original' | 'simplified' | 'translated';
};

type AnimationState = 'idle' | 'greeting' | 'thinking' | 'excited' | 'confused' | 'pointing' | 'reading' | 'looking-up';

export default function CasaLingua() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm CasaLingua. Need help with a legal document? Upload it or paste text!", sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [actionType, setActionType] = useState<'simplify' | 'translate' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('Need help with legal documents?');
  const [isMinimized, setIsMinimized] = useState(false);

  // Get expression-specific tooltip text
  const getExpressionTooltip = (expression: AnimationState): string => {
    switch(expression) {
      case 'greeting':
        return "Hello! I'm CasaLingua, your legal document assistant!";
      case 'thinking':
        return "Hmm, let me think about that...";
      case 'excited':
        return "Great! I've got your document ready!";
      case 'confused':
        return "I'm not sure I understand. Could you clarify?";
      case 'pointing':
        return tooltipText; // Use the random tooltip for pointing
      case 'reading':
        return "Let me read through this document...";
      case 'looking-up':
        return "How can I help with your legal document?";
      default:
        return "Need help understanding legal documents?";
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show expression-specific tooltips whenever animation state changes
  useEffect(() => {
    if (animationState !== 'idle') {
      setTooltipText(getExpressionTooltip(animationState));
      setShowTooltip(true);
      
      // Hide tooltip after a delay, but only if not in pointing state
      // (pointing state handles its own tooltip hiding)
      if (animationState !== 'pointing') {
        const timeout = setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [animationState]);

  // Periodic tooltip display when chat is closed
  useEffect(() => {
    if (!isOpen) {
      const tooltipInterval = setInterval(() => {
        const shouldShowTip = Math.random() > 0.7;
        if (shouldShowTip) {
          const tips = [
            "Need help understanding legal terms?",
            "Got a confusing lease agreement?",
            "I can translate documents to simpler language!",
            "Upload your housing documents for help!",
            "Confused by legal jargon? Let me help!"
          ];
          setTooltipText(tips[Math.floor(Math.random() * tips.length)]);
          setShowTooltip(true);
          setAnimationState('pointing');
          
          setTimeout(() => {
            setShowTooltip(false);
            setAnimationState('idle');
          }, 5000);
        }
      }, 20000);
      
      return () => clearInterval(tooltipInterval);
    } else {
      // If chat is open, keep looking up at the messages
      setAnimationState('looking-up');
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen) {
      setAnimationState('greeting');
      setTimeout(() => setAnimationState('looking-up'), 2000);
    } else {
      setAnimationState('confused');
      setTimeout(() => setAnimationState('idle'), 500);
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setShowTooltip(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setAnimationState(isMinimized ? 'excited' : 'confused');
    setTimeout(() => setAnimationState(isMinimized ? 'idle' : 'looking-up'), 1000);
  };

  const processText = async (text: string, action: 'simplify' | 'translate') => {
    try {
      setIsBotTyping(true);
      setActionType(action);
      setAnimationState('reading');
      
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text,
          action: action === 'simplify' ? 'simplify' : 'translate' 
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      
      setAnimationState('thinking');
      
      const data = await response.json();
      
      setAnimationState('excited');
      
      setMessages(prev => [
        ...prev,
        { 
          text: action === 'simplify' 
            ? "Here's the simplified version:" 
            : "Here's the translated version:", 
          sender: 'bot' 
        },
        { 
          text: data.simplified || data.translated || "No response", 
          sender: 'bot',
          type: action === 'simplify' ? 'simplified' : 'translated'
        }
      ]);
      
      setTimeout(() => setAnimationState('looking-up'), 1500);
      
    } catch (error) {
      setAnimationState('confused');
      setMessages(prev => [
        ...prev,
        { 
          text: "Sorry, I couldn't process that. Please try again.", 
          sender: 'bot' 
        }
      ]);
      console.error("API Error:", error);
      setTimeout(() => setAnimationState('looking-up'), 1500);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputText, sender: 'user', type: 'original' }]);
    setInputText('');
    
    // Set animation state
    setAnimationState('thinking');
    
    // Ask for action after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: "I can simplify or translate this. Which would you like?", 
          sender: 'bot' 
        }
      ]);
      setAnimationState('looking-up');
    }, 800);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsBotTyping(true);
      setAnimationState('reading');
      
      // Read file content
      const text = await file.text();
      
      // Add user upload message
      setMessages(prev => [
        ...prev, 
        { text: `Uploaded: ${file.name}`, sender: 'user' },
        { text: text.slice(0, 500) + (text.length > 500 ? "..." : ""), sender: 'user', type: 'original' }
      ]);
      
      setAnimationState('excited');
      
      // Ask for action
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            text: "I found a legal document. Should I simplify or translate it?", 
            sender: 'bot' 
          }
        ]);
        setAnimationState('looking-up');
      }, 1000);
      
    } catch (error) {
      setAnimationState('confused');
      setMessages(prev => [
        ...prev, 
        { 
          text: "Failed to read the file. Please try another format.", 
          sender: 'bot' 
        }
      ]);
      setTimeout(() => setAnimationState('looking-up'), 1500);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleQuickAction = (action: 'simplify' | 'translate') => {
    // Find the last user message with original text
    const lastOriginal = [...messages].reverse().find(m => m.sender === 'user' && m.type === 'original');
    
    if (lastOriginal) {
      processText(lastOriginal.text, action);
    } else {
      setAnimationState('confused');
      setMessages(prev => [
        ...prev,
        { text: "Please provide text to process first.", sender: 'bot' }
      ]);
      setTimeout(() => setAnimationState('looking-up'), 1500);
    }
  };

  // SVG Faces based on animation state - Now 3x bigger
  const getSVGFace = () => {
    const containerClass = `w-32 h-32 ${
      animationState === 'greeting' ? 'animate-bounce' : 
      animationState === 'excited' ? 'animate-pulse' : ''
    }`;

    switch(animationState) {
      case 'greeting':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              <circle cx="40" cy="35" r="6" fill="white" />
              <circle cx="60" cy="35" r="6" fill="white" />
              {/* Big smile */}
              <path d="M35,60 Q50,75 65,60" stroke="white" strokeWidth="3" fill="none" />
              {/* Eyebrows */}
              <path d="M30,28 Q40,22 50,28" stroke="white" strokeWidth="2" fill="none" />
              <path d="M50,28 Q60,22 70,28" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
        );
        
      case 'thinking':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              {/* One eye open, one closed */}
              <circle cx="40" cy="40" r="6" fill="white" />
              <path d="M55,40 Q60,38 65,40" stroke="white" strokeWidth="2" fill="none" />
              {/* Thinking mouth */}
              <path d="M40,65 Q50,60 60,65" stroke="white" strokeWidth="2" fill="none" />
              {/* Thought bubble */}
              <circle cx="80" cy="30" r="5" fill="white" className="animate-pulse" />
              <circle cx="85" cy="20" r="3" fill="white" className="animate-pulse" />
              <circle cx="88" cy="12" r="2" fill="white" className="animate-pulse" />
            </svg>
          </div>
        );
        
      case 'excited':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              {/* Wide eyes */}
              <circle cx="40" cy="35" r="8" fill="white" />
              <circle cx="60" cy="35" r="8" fill="white" />
              <circle cx="40" cy="35" r="3" fill="#1D4ED8" />
              <circle cx="60" cy="35" r="3" fill="#1D4ED8" />
              {/* Open mouth */}
              <ellipse cx="50" cy="65" rx="15" ry="10" fill="white" />
              <ellipse cx="50" cy="70" rx="8" ry="5" fill="#1D4ED8" />
            </svg>
          </div>
        );
        
      case 'confused':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              {/* Eyes with raised eyebrow */}
              <circle cx="40" cy="40" r="6" fill="white" />
              <circle cx="60" cy="40" r="6" fill="white" />
              {/* Raised eyebrow */}
              <path d="M30,30 Q40,25 50,35" stroke="white" strokeWidth="2" fill="none" />
              {/* Confused mouth */}
              <path d="M35,65 Q45,60 65,70" stroke="white" strokeWidth="3" fill="none" />
              {/* Question mark */}
              <text x="75" y="35" fill="white" fontSize="25" fontWeight="bold">?</text>
            </svg>
          </div>
        );
        
      case 'pointing':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              <circle cx="40" cy="40" r="6" fill="white" />
              <circle cx="60" cy="40" r="6" fill="white" />
              <path d="M40,65 Q50,70 60,65" stroke="white" strokeWidth="3" fill="none" />
              {/* Pointing arrow */}
              <path d="M85,30 L95,15" stroke="white" strokeWidth="2" />
              <polygon points="90,10 100,15 95,20" fill="white" />
            </svg>
          </div>
        );
        
      case 'reading':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              <circle cx="40" cy="40" r="6" fill="white" />
              <circle cx="60" cy="40" r="6" fill="white" />
              <path d="M40,65 Q50,65 60,65" stroke="white" strokeWidth="3" fill="none" />
              {/* Reading glasses */}
              <ellipse cx="40" cy="40" rx="12" ry="8" stroke="#EC4899" strokeWidth="2" fill="none" />
              <ellipse cx="60" cy="40" rx="12" ry="8" stroke="#EC4899" strokeWidth="2" fill="none" />
              <line x1="52" y1="40" x2="48" y2="40" stroke="#EC4899" strokeWidth="2" />
              {/* Document */}
              <rect x="30" y="80" width="40" height="20" fill="white" opacity="0.8" />
              <line x1="35" y1="85" x2="65" y2="85" stroke="#1D4ED8" strokeWidth="1" />
              <line x1="35" y1="90" x2="65" y2="90" stroke="#1D4ED8" strokeWidth="1" />
              <line x1="35" y1="95" x2="55" y2="95" stroke="#1D4ED8" strokeWidth="1" />
            </svg>
          </div>
        );
        
      case 'looking-up':
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              {/* Eyes looking up */}
              <circle cx="40" cy="35" r="6" fill="white" />
              <circle cx="60" cy="35" r="6" fill="white" />
              <circle cx="40" cy="32" r="3" fill="#1D4ED8" />
              <circle cx="60" cy="32" r="3" fill="#1D4ED8" />
              {/* Slight smile */}
              <path d="M40,65 Q50,70 60,65" stroke="white" strokeWidth="3" fill="none" />
            </svg>
          </div>
        );
        
      default: // idle
        return (
          <div className={containerClass}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" fill="#1D4ED8" />
              <circle cx="40" cy="40" r="6" fill="white" />
              <circle cx="60" cy="40" r="6" fill="white" />
              <path d="M40,65 Q50,70 60,65" stroke="white" strokeWidth="3" fill="none" />
            </svg>
          </div>
        );
    }
  };

  // CSS classes for tooltip based on animation state (coming from mouth)
  const getTooltipClass = () => {
    // Base classes for all tooltips
    const baseClasses = "absolute bg-white p-3 rounded-lg shadow-lg mb-2 w-64 animate-pulse";
    
    // Position the tooltip to appear as if coming from the mouth
    return `${baseClasses} left-1/2 transform -translate-x-1/2`;
  };

  return (
    <>
      {/* Chat Interface - Moved higher up */}
      {isOpen && (
        <div className="fixed bottom-48 right-6 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-40 animate-fadeIn">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              {/* Removed the duplicate face from the header */}
              <h3 className="font-bold">CasaLingua</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMinimize}
                className="text-white hover:text-gray-200 text-xl"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? '□' : '_'}
              </button>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 text-xl"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="h-64 p-4 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`mb-3 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}
                  >
                    <div 
                      className={`inline-block p-3 rounded-lg ${
                        msg.sender === 'bot' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-blue-500 text-white'
                        } ${
                          msg.type === 'simplified' ? 'border-l-4 border-green-500' :
                          msg.type === 'translated' ? 'border-l-4 border-purple-500' : ''
                        } ${
                          i === messages.length - 1 && msg.sender === 'bot' ? 'animate-fadeIn' : ''
                        }`}
                    >
                      {msg.text}
                      {msg.type === 'original' && (
                        <div className="text-xs mt-1 text-gray-500">Original text</div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                {isBotTyping && (
                  <div className="flex space-x-1 p-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                )}
              </div>

              {/* Quick Action Buttons */}
              {!isBotTyping && messages.some(m => m.sender === 'user' && m.type === 'original') && (
                <div className="flex space-x-2 px-4 pb-2">
                  <button 
                    onClick={() => handleQuickAction('simplify')} 
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition transform hover:scale-105"
                  >
                    Simplify
                  </button>
                  <button 
                    onClick={() => handleQuickAction('translate')} 
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition transform hover:scale-105"
                  >
                    Translate
                  </button>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 border-t border-gray-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or paste legal text..."
                  className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isBotTyping}
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm transition transform hover:scale-105"
                    disabled={isBotTyping}
                  >
                    📎 Upload Document
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                    disabled={isBotTyping}
                  />
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded disabled:opacity-50 transition transform hover:scale-105"
                    disabled={isBotTyping || !inputText.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Animated Face Button - Now larger with tooltips coming from mouth */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? "Close legal assistance chat" : "Open legal assistance chat"}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-105`}
      >
        <div className="relative">
          {/* Tooltip coming from mouth */}
          {showTooltip && (
            <div className={getTooltipClass()}>
              <p className="text-sm font-medium text-gray-700">{tooltipText}</p>
              {/* Triangle pointer coming from mouth */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
            </div>
          )}
          
          {/* SVG Face - Made 3x larger */}
          {getSVGFace()}
          
          {/* Pulsing animation ring on hover */}
          <div className="absolute -inset-1 border-2 border-pink-200 rounded-full animate-ping opacity-0 hover:opacity-70"></div>
        </div>
      </button>
      
      {/* Add keyframe animations */}
      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}