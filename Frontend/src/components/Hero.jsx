import { useRef } from 'react';
import { motion as Motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Terminal, Shield } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useCursor } from '../context/CursorContext.jsx';

// ─────────────────────────────────────────────────────────────
// AboutAvatar — floating photo used in the About section
// ─────────────────────────────────────────────────────────────
export const AboutAvatar = ({ isVisible = false }) => (
  <Motion.div
    className="relative flex items-center justify-center"
    animate={isVisible ? { y: [0, -10, 0] } : {}}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}
  >
    {/* Glow ring */}
    <div
      className="absolute inset-[-6px] rounded-full border border-orange-500/25 pointer-events-none"
      style={{ boxShadow: '0 0 30px rgba(251,146,60,0.12)' }}
    />
    <img
      src={profile.image}
      alt={profile.name}
      className="w-full h-auto object-cover rounded-full"
      style={{
        border: '2px solid rgba(251,146,60,0.4)',
        boxShadow: '0 0 40px rgba(251,146,60,0.2)',
      }}
    />
  </Motion.div>
);

// ─────────────────────────────────────────────────────────────
// HeroAvatar — circular photo, floating bob, scroll fade+scale
// ─────────────────────────────────────────────────────────────
const HeroAvatar = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.45], [1, 0.82]);

  return (
    <Motion.div
      style={{ opacity, scale }}
      className="relative flex items-center justify-center w-full"
    >
      {/* Inner breathing glow ring */}
      <Motion.div
        className="absolute rounded-full border border-orange-500/40 pointer-events-none"
        style={{ inset: '-10px' }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Outer breathing glow ring */}
      <Motion.div
        className="absolute rounded-full border border-orange-300/15 pointer-events-none"
        style={{ inset: '-22px' }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Floating photo */}
      <Motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={profile.image}
          alt={profile.name}
          className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-full pointer-events-none"
          style={{
            border: '3px solid rgba(251,146,60,0.5)',
            boxShadow:
              '0 0 60px rgba(251,146,60,0.30), 0 0 120px rgba(251,146,60,0.12)',
          }}
        />
      </Motion.div>
    </Motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const { setCursorType } = useCursor();

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const xSpring = useSpring(0, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMagnetic = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    xSpring.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    ySpring.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const resetMagnetic = () => { xSpring.set(0); ySpring.set(0); };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-y-visible z-30 px-4 md:px-20 selection:bg-neon-blue/30"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 hero-grid opacity-[0.10]" />
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-neon-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-neon-purple/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7">
            <Motion.div
              style={{ y: yText }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onMouseEnter={() => setCursorType('text')}
              onMouseLeave={() => setCursorType('default')}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-4 md:mb-8 cursor-default">
                Design. Code. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">
                  Engineering.
                </span>
              </h1>

              <p className="text-md md:text-xl text-gray-400 font-light leading-relaxed max-w-xl mb-6 md:mb-12">
                {profile.hero.summary}
              </p>

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
                <Motion.a
                  href={profile.hero.primaryCta.href}
                  style={{ x: xSpring, y: ySpring }}
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                  className="relative group px-4 py-2 md:px-10 md:py-5 bg-white text-black rounded-full overflow-hidden transition-all duration-300 transform active:scale-95 flex items-center gap-3"
                >
                  <span className="relative z-10 font-bold uppercase tracking-widest text-[10px] md:text-xs">View My Work</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-neon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Motion.a>

                <a
                  href={profile.hero.secondaryCta.href}
                  className="text-gray-400 hover:text-white font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase transition-all flex items-center gap-3 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Contact Me</span>
                  <div className="h-px w-8 bg-gray-800 transition-all group-hover:bg-neon-purple group-hover:w-12 ml-2" />
                </a>
              </div>
            </Motion.div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative -mt-20 md:mt-0">
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full flex justify-center items-center pointer-events-none"
            >
              <HeroAvatar scrollYProgress={scrollYProgress} />
            </Motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <Motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden absolute md:bottom-12 left-1/2 -translate-x-1/2 md:flex flex-col items-center gap-3 text-gray-500 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.4em] vertical-text">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-700 to-transparent relative">
          <Motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-neon-blue rounded-full shadow-[0_0_8px_rgba(0,243,255,0.8)]"
          />
        </div>
      </Motion.a>
    </section>
  );
};

export default Hero;
