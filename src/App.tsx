import React, { Suspense } from 'react';
import TVInterface from './components/TVInterface';
import TVCanvas from './components/TVCanvas';

const App: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#000' }}>
      {/* Contenedor adaptado a la pantalla completa sin usar aspect-ratio moderno */}
      <div className="relative w-full h-full bg-black overflow-hidden" style={{ backgroundColor: '#000' }}>
        
        {/* UI principal para navegar con D-Pad */}
        <TVInterface />
        
        {/* Canvas de renderizado 3D optimizado */}
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white text-3xl">Cargando Modelo 3D...</div>}>
          <TVCanvas />
        </Suspense>

      </div>
    </div>
  );
};

export default App;
