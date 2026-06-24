import { motion } from 'framer-motion';

export function FemaleAvatar({ isSpeaking = false, isClosing = false }) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-full h-full"
      animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0.92 : 1 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
    >
      {/* Ambient pulse ring — reacts to speaking */}
      <motion.div
        className="absolute rounded-full border border-orange-500/25"
        animate={{
          width: isSpeaking ? '340px' : '290px',
          height: isSpeaking ? '340px' : '290px',
          opacity: isSpeaking ? 0.55 : 0.2,
          boxShadow: isSpeaking
            ? '0 0 50px rgba(251,146,60,0.25)'
            : '0 0 20px rgba(251,146,60,0.08)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />

      {/* Radiating ring when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute rounded-full border border-orange-400/15"
          initial={{ width: '290px', height: '290px', opacity: 0.5 }}
          animate={{ width: '460px', height: '460px', opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* Avatar SVG */}
      <motion.svg
        viewBox="0 0 280 390"
        className="relative z-10 w-60 h-auto select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          filter: isSpeaking
            ? 'drop-shadow(0 0 18px rgba(251,146,60,0.45))'
            : 'drop-shadow(0 0 6px rgba(251,146,60,0.12))',
        }}
        transition={{ duration: 0.35 }}
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="skinTone" cx="48%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#e8b48a" />
            <stop offset="100%" stopColor="#b8703e" />
          </radialGradient>
          <radialGradient id="lipGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#c85050" />
            <stop offset="100%" stopColor="#a03838" />
          </radialGradient>
        </defs>

        {/* Background ambient glow */}
        <ellipse cx="140" cy="200" rx="115" ry="155" fill="url(#bgGlow)" />

        {/* ── Body / blazer ── */}
        <path
          d="M 18 390 L 18 302 C 46 272 86 256 112 244 L 128 222 L 140 234 L 152 222 L 168 244 C 194 256 234 272 262 302 L 262 390 Z"
          fill="#18182e"
        />
        {/* Blazer seam lines */}
        <line x1="112" y1="244" x2="72" y2="320" stroke="#22224a" strokeWidth="1.2" />
        <line x1="168" y1="244" x2="208" y2="320" stroke="#22224a" strokeWidth="1.2" />
        {/* Lapels */}
        <path d="M 128 222 L 116 258 L 140 242 L 164 258 L 152 222 L 140 234 Z" fill="#26264a" />
        {/* Blouse inner */}
        <path d="M 134 223 L 140 237 L 146 223 L 143 272 L 140 276 L 137 272 Z" fill="#eeeef5" />

        {/* ── Neck ── */}
        <path
          d="M 124 218 Q 122 230 128 238 Q 134 244 140 245 Q 146 244 152 238 Q 158 230 156 218"
          fill="url(#skinTone)"
        />

        {/* ── Head ── */}
        <ellipse cx="140" cy="152" rx="63" ry="72" fill="url(#skinTone)" />

        {/* ── Hair — neat professional bun ── */}
        {/* Back/top hair mass */}
        <ellipse cx="140" cy="95" rx="66" ry="50" fill="#221408" />
        {/* Side hair — left */}
        <path d="M 78 130 Q 74 158 78 188 Q 86 202 94 196 Q 86 166 87 134 Z" fill="#221408" />
        {/* Side hair — right */}
        <path d="M 202 130 Q 206 158 202 188 Q 194 202 186 196 Q 194 166 193 134 Z" fill="#221408" />
        {/* Bun */}
        <ellipse cx="140" cy="61" rx="19" ry="17" fill="#221408" />
        {/* Bun wrap detail */}
        <path
          d="M 126 62 Q 140 55 154 62 Q 140 68 126 62"
          stroke="#3a2210"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Hair highlight */}
        <path
          d="M 106 80 Q 128 68 156 73"
          stroke="#4a3018"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* ── Ears ── */}
        <ellipse cx="79" cy="158" rx="8" ry="13" fill="#b87048" />
        <ellipse cx="201" cy="158" rx="8" ry="13" fill="#b87048" />

        {/* ── Eyes ── */}
        {/* Whites */}
        <ellipse cx="115" cy="150" rx="14" ry="9" fill="white" />
        <ellipse cx="165" cy="150" rx="14" ry="9" fill="white" />
        {/* Iris dark base */}
        <ellipse cx="115" cy="151" rx="9" ry="8" fill="#180e04" />
        <ellipse cx="165" cy="151" rx="9" ry="8" fill="#180e04" />
        {/* Iris color */}
        <ellipse cx="115" cy="151" rx="6.5" ry="6.5" fill="#3a2008" />
        <ellipse cx="165" cy="151" rx="6.5" ry="6.5" fill="#3a2008" />
        {/* Pupils */}
        <circle cx="115" cy="151" r="3.5" fill="#060402" />
        <circle cx="165" cy="151" r="3.5" fill="#060402" />
        {/* Catchlights */}
        <circle cx="118" cy="148" r="2.5" fill="white" opacity="0.88" />
        <circle cx="168" cy="148" r="2.5" fill="white" opacity="0.88" />
        {/* Upper eyelid shadow */}
        <path
          d="M 101 146 Q 115 138 129 146"
          fill="rgba(180,110,60,0.25)"
        />
        <path
          d="M 151 146 Q 165 138 179 146"
          fill="rgba(180,110,60,0.25)"
        />

        {/* ── Eyebrows ── */}
        <path
          d="M 99 136 Q 115 128 131 135"
          stroke="#221408"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 149 135 Q 165 128 181 136"
          stroke="#221408"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Nose ── */}
        <path
          d="M 136 163 Q 132 175 140 178 Q 148 175 144 163"
          fill="#b07040"
          opacity="0.4"
        />
        <ellipse cx="135" cy="177" rx="3.5" ry="2" fill="#906030" opacity="0.3" />
        <ellipse cx="145" cy="177" rx="3.5" ry="2" fill="#906030" opacity="0.3" />

        {/* ── Lips ── */}
        {/* Upper lip */}
        <path
          d="M 126 190 Q 133 186 140 188 Q 147 186 154 190 Q 147 195 140 196 Q 133 195 126 190 Z"
          fill="url(#lipGrad)"
        />
        {/* Lower lip */}
        <path
          d="M 126 190 Q 133 195 140 196 Q 147 195 154 190 Q 148 206 140 208 Q 132 206 126 190 Z"
          fill="#b04848"
        />
        {/* Lip highlight */}
        <path
          d="M 132 188 Q 140 185 148 188"
          stroke="white"
          strokeWidth="0.9"
          fill="none"
          opacity="0.3"
          strokeLinecap="round"
        />
        {/* Subtle smile crease */}
        <path
          d="M 122 192 Q 126 196 128 194"
          stroke="#906040"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 152 194 Q 154 196 158 192"
          stroke="#906040"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        {/* ── Earrings — orange tech gem ── */}
        <circle cx="79" cy="163" r="3.5" fill="#fb923c" opacity="0.9" />
        <circle cx="201" cy="163" r="3.5" fill="#fb923c" opacity="0.9" />
        <circle cx="79" cy="163" r="1.5" fill="white" opacity="0.5" />
        <circle cx="201" cy="163" r="1.5" fill="white" opacity="0.5" />

        {/* ── Cyberpunk UI overlays ── */}
        {/* Corner brackets */}
        <path
          d="M 12 12 L 12 38 M 12 12 L 38 12"
          stroke="#fb923c"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 268 12 L 268 38 M 268 12 L 242 12"
          stroke="#fb923c"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 12 378 L 12 352 M 12 378 L 38 378"
          stroke="#fb923c"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 268 378 L 268 352 M 268 378 L 242 378"
          stroke="#fb923c"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Horizontal scan lines */}
        <line x1="18" y1="96" x2="262" y2="96" stroke="#fb923c" strokeWidth="0.4" opacity="0.12" />
        <line x1="18" y1="152" x2="262" y2="152" stroke="#fb923c" strokeWidth="0.4" opacity="0.1" />
        <line x1="18" y1="210" x2="262" y2="210" stroke="#fb923c" strokeWidth="0.4" opacity="0.1" />

        {/* Side tick marks */}
        <circle cx="14" cy="152" r="2" fill="#fb923c" opacity="0.5" />
        <circle cx="266" cy="152" r="2" fill="#fb923c" opacity="0.5" />

        {/* Speaking waveform — small bars at the bottom */}
        {isSpeaking && (
          <g opacity="0.55">
            {[232, 242, 252, 262, 272].map((x, i) => (
              <motion.rect
                key={x}
                x={x - 126 + 140 - 22}
                y={340}
                width="3"
                height={8}
                rx="1.5"
                fill="#fb923c"
                animate={{ height: [4, 14, 4, 10, 4] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </g>
        )}

        {/* Name tag */}
        <text
          x="140"
          y="372"
          textAnchor="middle"
          fontSize="7.5"
          fill="#fb923c"
          opacity="0.4"
          fontFamily="monospace"
          letterSpacing="4"
        >
          ANNE.PERERA
        </text>
      </motion.svg>
    </motion.div>
  );
}
