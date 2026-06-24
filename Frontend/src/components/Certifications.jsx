import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Award, BookOpen } from 'lucide-react';
import { Section } from './ui/Section';

const CERTS = [
  {
    id: 'ds-python',
    title: 'Training Course on Data Science with Python',
    icon: BookOpen,
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.25)',
    borderColor: 'rgba(249,115,22,0.4)',
    badge: 'Data Science',
  },
  {
    id: 'pyquest',
    title: 'Python Workshop',
    subtitle: "PYQUEST '24",
    icon: Award,
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.25)',
    borderColor: 'rgba(167,139,250,0.4)',
    badge: 'Workshop · 2024',
  },
  {
    id: 'infosec',
    title: 'Introduction to Information Security',
    icon: ShieldCheck,
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.25)',
    borderColor: 'rgba(34,211,238,0.4)',
    badge: 'Security',
  },
];

const CertCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(rawX, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(rawY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovering(false);
  };

  const Icon = cert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl cursor-pointer select-none"
      >
        {/* Outer glow */}
        <motion.div
          animate={hovering ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-0.5 rounded-2xl blur-md pointer-events-none"
          style={{ background: cert.glow }}
        />

        {/* Card body */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#070b12] border"
          style={{ borderColor: hovering ? cert.borderColor : 'rgba(255,255,255,0.08)' }}
        >
          {/* Floating highlight that follows mouse */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '60%',
              height: '60%',
              left: glowX,
              top: glowY,
              transform: 'translate(-50%,-50%)',
              background: `radial-gradient(circle, ${cert.glow} 0%, transparent 70%)`,
              opacity: hovering ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Scanline texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)' }}
          />

          <div className="relative z-10 p-7">
            {/* Icon + badge row */}
            <div className="flex items-start justify-between mb-5">
              <motion.div
                animate={hovering ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="p-3 rounded-xl"
                style={{ background: `${cert.accent}18`, border: `1px solid ${cert.accent}30` }}
              >
                <Icon className="w-6 h-6" style={{ color: cert.accent }} />
              </motion.div>

              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{
                  background: `${cert.accent}18`,
                  color: cert.accent,
                  border: `1px solid ${cert.accent}30`,
                }}
              >
                {cert.badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-black text-white leading-snug mb-1"
              style={{ transform: 'translateZ(20px)' }}>
              {cert.title}
            </h3>
            {cert.subtitle && (
              <p className="text-sm font-mono font-bold mt-1" style={{ color: cert.accent }}>
                {cert.subtitle}
              </p>
            )}

            {/* Verified chip */}
            <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-widest font-bold">Certified</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certifications = () => (
  <Section id="certifications" className="py-20">
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex items-end gap-6"
      >
        <div>
          <span className="text-neon-blue font-mono text-xs block mb-1 font-bold uppercase tracking-[0.3em]">
            06. CREDENTIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
            Certifications.
          </h2>
        </div>
        <div className="h-px bg-white/10 flex-1 mb-3 hidden md:block" />
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </div>
  </Section>
);

export default Certifications;
