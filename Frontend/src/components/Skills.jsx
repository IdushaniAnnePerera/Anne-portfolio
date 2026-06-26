import React, { useState, useMemo, useEffect } from 'react';
import { skills } from '../data/portfolio';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Box } from 'lucide-react';

const Word = ({ children, position, ...props }) => {
  const color = new THREE.Color();
  const ref = useMemo(() => React.createRef(), []);
  const [hovered, setHovered] = useState(false);

  const over = (e) => { e.stopPropagation(); setHovered(true); };
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
      ref.current.material.color.lerp(color.set(hovered ? '#f97316' : 'white'), 0.1);
    }
  });

  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      position={position}
      fontSize={0.5}
      color="white"
      {...props}
    >
      {children}
    </Text>
  );
};

const TagCloud = ({ skills: skillList }) => (
  <group>
    {skillList.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skillList.length);
      const theta = Math.sqrt(skillList.length * Math.PI) * phi;
      const radius = 8;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      if (isNaN(x) || isNaN(y) || isNaN(z)) return null;
      return (
        <Float key={skill} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Word position={[x, y, z]}>{skill}</Word>
        </Float>
      );
    })}
  </group>
);

const SkillList = () => (
  <motion.div
    key="list-view"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {Object.entries(skills).map(([category, data], index) => (
      <motion.div
        key={category}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-orange-400/50 transition-all group"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/5 rounded-lg text-orange-300 group-hover:text-gray-300 transition-colors">
            <data.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white">{category}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.items.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-gray-300 hover:bg-neon-blue/10 hover:border-neon-blue/30 hover:text-neon-blue transition-all cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const Skills = () => {
  const [viewMode, setViewMode] = useState('3d');

  const allSkills = useMemo(() => {
    const list = Object.values(skills).flatMap(cat => cat.items);
    return [...new Set(list)].filter(Boolean);
  }, []);

  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center relative z-10 py-20">
      <div className="flex flex-col items-center mb-12 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-gray-400">
            SKILL UNIVERSE
          </span>
        </h2>

        {/* Toggle — desktop only */}
        <div className="hidden md:flex bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm">
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              viewMode === '3d'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-400/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span className="text-sm font-mono">3D VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'list'
                ? 'bg-gray-500/20 text-gray-300 border border-gray-400/50 shadow-[0_0_10px_rgba(163,163,163,0.2)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm font-mono">LIST VIEW</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">

        {/* Mobile: always list */}
        <div className="md:hidden">
          <SkillList />
        </div>

        {/* Desktop: 3D or list based on toggle */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            {viewMode === '3d' ? (
              <motion.div
                key="3d-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-[600px] cursor-move relative z-20 bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 50 }}>
                  <fog attach="fog" args={['#050505', 0, 30]} />
                  <ambientLight intensity={0.5} />
                  <TagCloud skills={allSkills} />
                  <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enableZoom={false} />
                </Canvas>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs pointer-events-none">
                  Drag to rotate the universe
                </div>
              </motion.div>
            ) : (
              <SkillList />
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
