import { useRef, useEffect, useState } from 'react';
import {
  motion as Motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform
} from 'framer-motion';
import {
  Terminal,
  GraduationCap,
  Activity,
  Trophy,
  Star,
  Github,
  Linkedin,
  BookOpen,
} from 'lucide-react';
import { profile, education, awards } from '../data/portfolio';
import { Section } from './ui/Section';
import { AboutAvatar } from './Hero';

// ─── Spotlight hover card ─────────────────────────────────────
const SpotlightCard = ({ children, className = '', delay = 0, neoColor = 'blue' }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glows = {
    blue:   'border-neon-blue/40   group-hover:border-neon-blue/80',
    purple: 'border-neon-purple/40 group-hover:border-neon-purple/80',
    orange: 'border-orange-500/40  group-hover:border-orange-500/80',
    gray:   'border-white/20       group-hover:border-white/40',
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group relative border-x border-t border-white/5 border-b-2 overflow-hidden rounded-2xl transition-all duration-500 hover:bg-[#030712]/60 ${glows[neoColor] || glows.blue} ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <Motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.03), transparent 80%)`,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </Motion.div>
  );
};

// ─── About Section ────────────────────────────────────────────
const About = () => {
  const profileCardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll();
  const aboutAvatarOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0.049, 0.08] : [0.07, 0.08],
    [0, 1]
  );

  return (
    <Section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Section Heading */}
          <div className="md:col-span-12 mb-6">
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-end gap-6"
            >
              <div>
                <span className="text-neon-blue font-mono text-xs block mb-1 font-bold uppercase tracking-[0.3em]">
                  02. ABOUT
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                  Architecting Innovation.
                </h2>
              </div>
              <div className="h-px bg-white/10 flex-1 mb-3 hidden md:block" />
              <Activity className="text-neon-blue/20 w-10 h-10 mb-2 animate-pulse filter drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]" />
            </Motion.div>
          </div>

          {/* ── Bio Dossier ── */}
          <SpotlightCard className="md:col-span-12 lg:col-span-9 p-0 lg:order-none" delay={0.1}>
            <div className="h-8 border-b border-white/5 bg-white/5 px-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-500/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400/30" />
              </div>
              <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase font-bold">about.md</span>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-neon-blue/5 border border-neon-blue/10">
                  <Terminal className="w-5 h-5 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none mb-1">
                    About Me
                  </h4>
                  <p className="text-[9px] font-bold font-mono text-neon-blue/50 uppercase leading-none">
                    {profile.role.split('|')[0].trim()}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6 font-normal max-w-4xl tracking-tight">
                {profile.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {['AI / ML Research', 'Full-Stack Development', 'Research', 'Mobile Apps', 'Data Engineering'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono uppercase hover:text-white hover:border-neon-blue/30 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* ── Profile / Photo Card (spans 2 rows) ── */}
          <SpotlightCard
            className="md:col-span-12 lg:col-span-3 lg:row-span-2 min-h-[340px] lg:min-h-full order-first lg:order-none"
          >
            <div
              ref={profileCardRef}
              data-avatar-target="profile-card"
              className="relative h-full w-full flex flex-col"
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <Motion.div style={{ opacity: aboutAvatarOpacity }}>
                  <AboutAvatar isVisible={true} />
                </Motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
              </div>

              <div className="mt-auto p-5 relative z-20">
                <div className="flex justify-center gap-3">
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-neon-blue hover:border-neon-blue/30 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* ── Education Card ── */}
          <SpotlightCard className="md:col-span-12 lg:col-span-5 p-6 flex flex-col" delay={0.2} neoColor="orange">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <GraduationCap className="w-5 h-5 text-orange-400" />
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tighter">Education</h4>
            </div>

            <div className="flex-1 relative pl-5 border-l-2 border-orange-500/30">
              <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" />

              <h5 className="text-base md:text-lg font-black text-white leading-tight">
                {education.degree}
              </h5>
              <p className="text-sm text-gray-400 font-medium mt-0.5">{education.institution}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                  {education.period}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-[10px] font-mono font-bold text-neon-blue uppercase tracking-wider">
                  GPA: {education.gpa}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-3 h-3 text-gray-500" />
                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-gray-500 font-medium hover:text-gray-300 hover:border-white/20 transition-all cursor-default"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* ── Awards & Achievements Card ── */}
          <SpotlightCard className="md:col-span-12 lg:col-span-4 p-6" delay={0.3} neoColor="purple">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
                <Trophy className="w-5 h-5 text-neon-purple" />
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tighter">Achievements</h4>
            </div>

            <div className="space-y-4">
              {awards.map((award) => (
                <div key={award.id} className="flex items-start gap-3 group/award">
                  <div className="w-7 h-7 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/award:bg-neon-purple/20 transition-colors">
                    <Star className="w-3 h-3 text-neon-purple" />
                  </div>
                  <div>
                    <h6 className="text-sm font-bold text-white leading-tight group-hover/award:text-neon-purple/90 transition-colors">
                      {award.title}
                    </h6>
                    <p className="text-[10px] text-gray-500 mt-0.5 font-mono leading-relaxed">
                      {award.org}
                      <span className="text-neon-purple/40 mx-1">·</span>
                      {award.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>

        </div>
      </div>
    </Section>
  );
};

export default About;
