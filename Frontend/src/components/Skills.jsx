import { skills } from '../data/portfolio';
import { motion } from 'framer-motion';

const Skills = () => (
  <section id="skills" className="min-h-screen flex flex-col items-center justify-center relative z-10 py-20">
    <div className="flex flex-col items-center mb-12 px-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-2 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-gray-400">
          SKILL UNIVERSE
        </span>
      </h2>
    </div>

    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
    </div>
  </section>
);

export default Skills;
