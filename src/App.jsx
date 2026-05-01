/**
 * @fileoverview Main application component with routing, layout, and floating chat assistant.
 * Integrates React Router for navigation, i18next for multi-language support,
 * Framer Motion for animations, and Google Analytics for event tracking.
 */
import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Sun, Moon, Globe, ChevronRight, CheckCircle, Send, Bot } from 'lucide-react';
import { api } from './services/api';
import { sanitizeInput } from './utils/helpers';
import { CHAT_DEBOUNCE_MS } from './utils/constants';
import { trackPageView, trackChatOpened, trackChatMessageSent, trackLanguageChanged, trackThemeToggled } from './services/analytics';

// Lazy-loaded pages for code splitting and reduced initial bundle size
const HomePage = lazy(() => import('./pages/Home'));
const EligibilityPage = lazy(() => import('./pages/Eligibility'));
const RegisterPage = lazy(() => import('./pages/Register'));
const BoothPage = lazy(() => import('./pages/Booth'));
const GuidelinesPage = lazy(() => import('./pages/Guidelines'));
const ElectionResultsPage = lazy(() => import('./pages/ElectionResults'));
const DownloadEpicPage = lazy(() => import('./pages/DownloadEpic'));

/**
 * PageTransition component wraps page content with animated transitions.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content to animate.
 * @returns {React.ReactElement} Animated wrapper component.
 */
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Loading fallback displayed while lazy-loaded pages are being fetched.
 * Maintains the existing design language with a centered spinner.
 */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[300px]" role="status" aria-label="Loading page content">
    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

/**
 * RouteTracker component that tracks page views on route changes.
 * Uses React Router's useLocation hook to detect navigation.
 */
function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

/**
 * Layout component providing the application shell with header,
 * main content area, and floating AI chat assistant.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content rendered in the main area.
 * @returns {React.ReactElement} Application layout.
 */
function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: t('chat_greeting') }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatTriggerRef = useRef(null);
  const lastChatSubmitRef = useRef(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus chat input when chat opens, return focus to trigger when it closes
  useEffect(() => {
    if (chatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    } else if (!chatOpen && chatTriggerRef.current) {
      chatTriggerRef.current.focus();
    }
  }, [chatOpen]);

  const handleLanguageChange = useCallback((e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    trackLanguageChanged(lang);
  }, [i18n]);

  const handleThemeToggle = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      trackThemeToggled(newMode ? 'dark' : 'light');
      return newMode;
    });
  }, []);

  const handleChatOpen = useCallback(() => {
    setChatOpen(true);
    trackChatOpened();
  }, []);

  const handleChatClose = useCallback(() => {
    setChatOpen(false);
  }, []);

  const handleChatSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastChatSubmitRef.current < CHAT_DEBOUNCE_MS) {
      return;
    }
    lastChatSubmitRef.current = now;

    const userMsg = sanitizeInput(chatInput.trim());
    setMessages(prev => [...prev, { role: 'user', text: chatInput.trim() }]);
    setChatInput('');
    setIsTyping(true);

    trackChatMessageSent(userMsg.length);

    try {
      const responseText = await api.sendChatMessage(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: `Sorry, I encountered an error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  }, [chatInput]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col relative selection:bg-indigo-500/30">
      
      {/* Skip Navigation Link for Keyboard Users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-x-hidden z-10">
        {/* Glassmorphic Header */}
        <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40 border-b border-white/20 dark:border-slate-700/50 shadow-sm" role="banner">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
            <Link to="/" className="flex items-center gap-3 group" aria-label="VoterAssist Home">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300" aria-hidden="true">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight hidden sm:block">
                {t('app_title')}
              </h1>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/results" 
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                aria-label="View Election Results"
                aria-current={location.pathname === '/results' ? 'page' : undefined}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                Election Results
              </Link>

              {/* Language Dropdown */}
              <div className="relative flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl px-3 py-2 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow hidden sm:flex">
                <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mr-2" aria-hidden="true" />
                <label htmlFor="language-select" className="sr-only">Select Language</label>
                <select 
                  id="language-select"
                  onChange={handleLanguageChange} 
                  value={i18n.language}
                  className="bg-transparent text-sm font-semibold outline-none text-slate-700 dark:text-slate-200 cursor-pointer pr-2"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="te">తెలుగు</option>
                </select>
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={handleThemeToggle}
                className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md text-indigo-600 dark:text-indigo-400 transition-all hover:scale-105 active:scale-95"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main id="main-content" className="flex-1 p-6 lg:p-12 max-w-6xl mx-auto w-full" role="main" aria-label="Page content">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50" role="contentinfo">
          <p>© {new Date().getFullYear()} VoterAssist — Election Process Education. Powered by Google Gemini.</p>
        </footer>
      </div>

      {/* Floating Chat Assistant */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[420px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-indigo-500/20 border border-white/50 dark:border-slate-700/50 overflow-hidden z-50 flex flex-col h-[550px] max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-label="AI Chat Assistant"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white flex justify-between items-center z-10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm" aria-hidden="true">
                  <Bot className="w-5 h-5 text-indigo-100" />
                </div>
                <div>
                  <span className="font-bold text-lg block leading-tight">AI Assistant</span>
                  <span className="text-indigo-200 text-xs font-medium">Powered by Gemini</span>
                </div>
              </div>
              <button 
                onClick={handleChatClose} 
                className="text-white hover:bg-white/20 transition-colors p-1.5 rounded-xl backdrop-blur-sm"
                aria-label="Close chat assistant"
              >
                <ChevronRight className="w-5 h-5 rotate-90" aria-hidden="true" />
              </button>
            </div>
            
            <div 
              className="flex-1 p-5 overflow-y-auto flex flex-col gap-4" 
              aria-live="polite" 
              aria-label="Chat messages"
              role="log"
            >
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3.5 rounded-2xl max-w-[85%] text-sm shadow-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm shadow-indigo-500/20' 
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm'
                    }`}
                    role={msg.role === 'assistant' ? 'status' : undefined}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                  role="status"
                  aria-label="Assistant is typing"
                >
                  <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-indigo-400 dark:bg-indigo-600 rounded-full animate-bounce" aria-hidden="true"></span>
                    <span className="w-2 h-2 bg-indigo-400 dark:bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} aria-hidden="true"></span>
                    <span className="w-2 h-2 bg-indigo-400 dark:bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} aria-hidden="true"></span>
                    <span className="sr-only">Assistant is typing a response</span>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-slate-100/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
              <form onSubmit={handleChatSubmit} className="relative flex items-center" role="search" aria-label="Send a message to the AI assistant">
                <label htmlFor="chat-input" className="sr-only">Type your question</label>
                <input 
                  id="chat-input"
                  ref={chatInputRef}
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('chat_placeholder')} 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none dark:text-white shadow-inner"
                  aria-describedby="chat-hint"
                  autoComplete="off"
                />
                <span id="chat-hint" className="sr-only">Ask questions about the election process in India</span>
                <button 
                  type="submit" 
                  disabled={isTyping || !chatInput.trim()} 
                  className="absolute right-2 p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-md hover:shadow-lg active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      {!chatOpen && (
        <motion.button 
          ref={chatTriggerRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChatOpen}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white rounded-full shadow-[0_0_25px_rgba(99,102,241,0.7)] hover:shadow-[0_0_35px_rgba(99,102,241,0.9)] z-50 flex items-center justify-center group cursor-pointer border-2 border-indigo-300/30"
          aria-label="Open AI Chat Assistant"
          aria-expanded={chatOpen}
          aria-haspopup="dialog"
        >
          {/* Thick double pulse effect */}
          <span className="absolute inset-0 rounded-full border-[6px] border-indigo-400/80 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-100" aria-hidden="true"></span>
          <span className="absolute -inset-2 rounded-full border-[4px] border-purple-400/60 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-100" style={{ animationDelay: '0.4s' }} aria-hidden="true"></span>
          
          <Bot className="w-8 h-8 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-white group-hover:animate-pulse" aria-hidden="true" />
        </motion.button>
      )}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Root App component defining application routes.
 * Wraps all pages in the Layout shell and handles route-level code splitting.
 *
 * @returns {React.ReactElement} The complete application.
 */
export default function App() {
  return (
    <Router>
      <RouteTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/eligibility" element={<PageTransition><EligibilityPage /></PageTransition>} />
          <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          <Route path="/booth" element={<PageTransition><BoothPage /></PageTransition>} />
          <Route path="/guidelines" element={<PageTransition><GuidelinesPage /></PageTransition>} />
          <Route path="/results" element={<PageTransition><ElectionResultsPage /></PageTransition>} />
          <Route path="/download-epic" element={<PageTransition><DownloadEpicPage /></PageTransition>} />
        </Routes>
      </Layout>
    </Router>
  );
}
