import React from 'react';

const TVInterface: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8">
      {/* Cabecera */}
      <header className="flex justify-between items-center text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">Smart TV 3D Viewer</h1>
        <span className="text-2xl opacity-80">WebGL Ultra-Light Mode</span>
      </header>

      {/* Controles para D-Pad */}
      <div className="pointer-events-auto flex flex-col gap-6 max-w-sm">
        <button
          tabIndex={0}
          className="bg-black/60 text-white text-2xl font-semibold py-4 px-8 rounded-xl border border-white/20 transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-500 focus:bg-white/20 focus:scale-105"
          onClick={() => console.log('Acción 1')}
        >
          Reproducir / Pausa
        </button>
        <button
          tabIndex={0}
          className="bg-black/60 text-white text-2xl font-semibold py-4 px-8 rounded-xl border border-white/20 transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-500 focus:bg-white/20 focus:scale-105"
          onClick={() => console.log('Acción 2')}
        >
          Cambiar Modelo
        </button>
        <button
          tabIndex={0}
          className="bg-black/60 text-white text-2xl font-semibold py-4 px-8 rounded-xl border border-white/20 transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-500 focus:bg-white/20 focus:scale-105"
          onClick={() => console.log('Acción 3')}
        >
          Ajustes
        </button>
      </div>
    </div>
  );
};

export default TVInterface;
