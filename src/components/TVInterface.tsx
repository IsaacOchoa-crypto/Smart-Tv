import React from 'react';

const TVInterface: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col p-8">
      {/* Cabecera */}
      <header className="flex justify-between items-center text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">Smart TV 3D Viewer</h1>
        <span className="text-2xl opacity-80">WebGL Ultra-Light Mode</span>
      </header>
    </div>
  );
};

export default TVInterface;
