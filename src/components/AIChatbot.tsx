import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { startChatSession } from '../lib/gemini';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Welcome to RK Fitness Center! 💪 I'm your AI Concierge. How can I help you achieve your fitness goals today? Are you interested in learning about our facilities or our membership plans?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const [apiError, setApiError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session only once when component mounts
    try {
      const session = startChatSession();
      setChatSession(session);
    } catch (e: any) {
      console.error("Failed to initialize chat session", e);
      if (e.message?.includes('API key')) {
        setApiError(true);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession || isLoading) return;

    if (apiError) {
       // Mock response if API key is failing
       handleMockConversation(input.trim());
       return;
    }

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userMessage,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Send message to Gemini API
      const result = await chatSession.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();
      
      // Add bot response to UI
      setMessages(prev => [
        ...prev, 
        { id: (Date.now() + 1).toString(), role: 'model', text }
      ]);
    } catch (error: any) {
      console.error("Error communicating with Gemini API:", error);
      if (error.message?.includes('API key')) {
        setApiError(true);
        handleMockConversation(userMessage);
      } else {
        // Add general error message to UI
        setMessages(prev => [
          ...prev, 
          { 
            id: (Date.now() + 1).toString(), 
            role: 'model', 
            text: "I'm having a little trouble connecting to my brain right now. 🧠 Please try again later, or contact the gym directly!" 
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback if no API key is provided, just so the UI doesn't visually break while user is testing
  const handleMockConversation = (userMessage: string) => {
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setIsLoading(true);
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          role: 'model', 
          text: "I notice the VITE_GEMINI_API_KEY is missing from the environment variables! 😅 Please add it to your .env file or Vercel dashboard so I can properly answer your questions about RK Fitness!" 
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }

  // Formatting helper for simple text
  const formatText = (text: string) => {
    // Convert bold **text** to <strong>
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      <AnimatePresence>
        {/* Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="bg-orange-accent p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-black font-bold tracking-wider leading-tight">RK Assistant</h3>
                  <p className="text-black/70 text-xs">AI Gym Concierge</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-black/10 p-2 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-zinc-800' : 'bg-orange-accent/20 text-orange-accent border border-orange-accent/30'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-gray-400" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-zinc-800 text-white rounded-tr-sm' 
                        : 'bg-white/5 text-gray-300 rounded-tl-sm border border-white/5'
                    }`}>
                      {formatText(msg.text)}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-accent/20 border border-orange-accent/30 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-orange-accent" />
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 bg-orange-accent rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-orange-accent rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-orange-accent rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-950 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pricing, classes..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-accent focus:border-orange-accent disabled:opacity-50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-orange-accent hover:bg-orange-600 rounded-full flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                </button>
              </form>
            </div>
            
            <div className="text-center py-1.5 bg-zinc-950 text-[10px] text-gray-600 font-medium">
              Powered by Google Gemini
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-accent text-black rounded-full shadow-[0_0_20px_rgba(255,87,34,0.3)] flex items-center justify-center z-[90] hover:bg-orange-600 transition-colors"
        aria-label="Toggle AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 fill-black/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
