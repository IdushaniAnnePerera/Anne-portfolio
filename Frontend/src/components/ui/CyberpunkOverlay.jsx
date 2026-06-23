import React from 'react';

const CyberpunkOverlay = () => {
  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-40 select-none overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Corner Accents */}
      <div className="absolute top-2 left-2 md:top-3 md:left-3 w-16 h-16 md:w-32 md:h-32 border-l-2 border-t-2 border-orange-400/30 rounded-tl-lg md:rounded-tl-3xl" />
      <div className="absolute top-2 right-2 md:top-3 md:right-3 w-16 h-16 md:w-32 md:h-32 border-r-2 border-t-2 border-gray-400/30 rounded-tr-lg md:rounded-tr-3xl" />
      <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-16 h-16 md:w-32 md:h-32 border-l-2 border-bottom-2 border-gray-300/30 rounded-bl-lg md:rounded-bl-3xl border-b-2" />
      <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-16 h-16 md:w-32 md:h-32 border-r-2 border-bottom-2 border-orange-400/30 rounded-br-lg md:rounded-br-3xl border-b-2" />

      {/* Decorative Lines - Hidden on mobile */}
      <div className="hidden md:block absolute top-1/2 left-8 w-1 h-24 bg-gradient-to-b from-transparent via-orange-400/50 to-transparent" />
      <div className="hidden md:block absolute top-1/2 right-8 w-1 h-24 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent" />
    </div>
  );
};

export default CyberpunkOverlay;
