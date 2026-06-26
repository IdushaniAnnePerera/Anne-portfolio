import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SendHorizontal,
  X,
  Activity,
  Bot
} from 'lucide-react';
import { BOT_CONFIG } from './data/ChatbotConfig';
import { buildKnowledgeBase, resolvePortfolioIntent } from './data/chatbotKnowledge';

const TYPING_DELAY_MS = 250;
const TYPING_SPEED_MS = 8;

function createMessage(role, text, extras = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ...extras,
  };
}

export default function PortfolioChatbot({ isOpen, onOpenChange }) {
  const knowledgeBase = useMemo(() => buildKnowledgeBase(), []);
  const intentMap = knowledgeBase.entriesById;
  const inputRef = useRef(null);

  const welcomeMessage = useMemo(
    () =>
      createMessage(
        'bot',
        `Portfolio assistant online. ${BOT_CONFIG.personality} Ask me anything about Anne's website, or use the quick questions below.`,
        { reaction: 'wave' }
      ),
    []
  );

  const [messages, setMessages] = useState([welcomeMessage]);
  const [promptIds, setPromptIds] = useState(knowledgeBase.defaultPromptIds);
  const [draft, setDraft] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const typingIntervalRef = useRef(null);
  const thinkingTimeoutRef = useRef(null);
  const scrollRef = useRef(null);

  const handleClose = useCallback(() => {
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
    if (thinkingTimeoutRef.current) window.clearTimeout(thinkingTimeoutRef.current);
    setMessages([welcomeMessage]);
    setPromptIds(knowledgeBase.defaultPromptIds);
    setIsThinking(false);
    setDraft('');
    onOpenChange(false);
  }, [welcomeMessage, knowledgeBase.defaultPromptIds, onOpenChange]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
      if (thinkingTimeoutRef.current) window.clearTimeout(thinkingTimeoutRef.current);
    };
  }, []);

  const typeBotReply = (intent) => {
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
    if (thinkingTimeoutRef.current) window.clearTimeout(thinkingTimeoutRef.current);
    setIsThinking(true);

    thinkingTimeoutRef.current = window.setTimeout(() => {
      setIsThinking(false);

      if (intent.action === 'CLEAR_CHAT') {
        setMessages([welcomeMessage]);
        setPromptIds(knowledgeBase.defaultPromptIds);
        return;
      }

      const botMessage = createMessage('bot', '', { isTyping: true });
      let nextIndex = 0;

      setMessages((current) => [...current, botMessage]);
      setPromptIds(intent.followUps);

      typingIntervalRef.current = window.setInterval(() => {
        nextIndex += 1;
        setMessages((current) =>
          current.map((msg) =>
            msg.id === botMessage.id
              ? { ...msg, text: intent.reply.slice(0, nextIndex), isTyping: nextIndex < intent.reply.length }
              : msg
          )
        );
        if (nextIndex >= intent.reply.length) {
          window.clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }, TYPING_SPEED_MS);
    }, TYPING_DELAY_MS);
  };

  const sendMessage = (text, isInternal = false) => {
    const intent = resolvePortfolioIntent(text, knowledgeBase);
    if (!isInternal) {
      setMessages((current) => [...current, createMessage('user', text)]);
    }
    typeBotReply(intent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = draft.trim();
    if (!next) return;
    setDraft('');
    sendMessage(next);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => onOpenChange(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[120] hidden items-center gap-4 rounded-3xl border p-2 shadow-2xl backdrop-blur-2xl transition-all duration-500 md:bottom-8 md:right-8 md:flex ${
          isOpen
            ? 'pointer-events-none translate-y-12 opacity-0'
            : 'border-orange-500/30 bg-black/60 text-white'
        }`}
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-gray-600/20">
          <Bot className="h-7 w-7 text-orange-400" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]"
          />
        </div>
      </motion.button>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[130] hidden items-center justify-center md:flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />

            {/* Chat Panel — full width, centred, max-width constrained */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative z-10 mx-auto flex h-[85vh] w-full max-w-2xl flex-col rounded-3xl border border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white/90">Curator AI</h2>
                  <p className="text-[10px] mt-0.5 font-bold tracking-[0.3em] text-orange-300/60 uppercase">
                    Portfolio Assistant
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto overscroll-contain space-y-8 px-8 py-8 no-scrollbar"
              >
                {messages.map((msg) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className="flex flex-col gap-3"
                  >
                    <div
                      className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase ${
                        msg.role === 'user' ? 'justify-end text-white/40' : 'text-orange-300/60'
                      }`}
                    >
                      {msg.role === 'bot' && <Activity className="h-3 w-3 animate-pulse" />}
                      {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                    </div>

                    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] text-sm leading-relaxed px-5 py-4 rounded-2xl border ${
                          msg.role === 'user'
                            ? 'bg-orange-600/10 border-orange-500/20 text-white/80 rounded-tr-none'
                            : 'bg-white/5 border-white/5 text-white/70 rounded-tl-none font-light'
                        }`}
                      >
                        {msg.text}
                        {msg.isTyping && (
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="ml-1 inline-block h-3.5 w-1 rounded-full bg-orange-400 align-middle"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isThinking && (
                  <div className="flex flex-col gap-3">
                    <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-300/60 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
                      Thinking…
                    </div>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <motion.div
                          key={d}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.12 }}
                          className="h-1 w-10 rounded-full bg-orange-500/25"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 px-8 py-6 space-y-5">
                {/* Quick-action chips */}
                <div className="flex flex-wrap gap-2">
                  {promptIds.map((id) => {
                    const entry = intentMap[id];
                    if (!entry) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setMessages((current) => [
                            ...current,
                            createMessage('user', entry.label, { isCommand: true }),
                          ]);
                          sendMessage(entry.id, true);
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium tracking-wider text-white/50 transition-all hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300"
                      >
                        {entry.label}
                      </button>
                    );
                  })}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Ask me anything…"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 pr-16 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-orange-500/40 focus:bg-white/8"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl text-white/40 hover:text-orange-400 transition-colors"
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
