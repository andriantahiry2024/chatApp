import React from 'react';

const EnvTest = () => {
  // Récupération des variables d'environnement
  const apiUrl = import.meta.env.VITE_API_URL;
  const wsUrl = import.meta.env.VITE_WS_URL;
  
  // Récupération du mode (development ou production)
  const mode = import.meta.env.MODE;
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Test des Variables d'Environnement</h2>
      <div className="space-y-2">
        <p><strong>Mode :</strong> {mode}</p>
        <p><strong>API URL :</strong> {apiUrl}</p>
        <p><strong>WebSocket URL :</strong> {wsUrl}</p>
      </div>
    </div>
  );
};

export default EnvTest;