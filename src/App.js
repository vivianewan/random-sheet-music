import React, { useState, useEffect } from 'react';

const RandomSheetMusic = () => {
  // Define available notes for each clef
  const gClefNotes = ['B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6'];
  const fClefNotes = ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];

  const [currentClef, setCurrentClef] = useState('G');
  const [notes, setNotes] = useState([]);

  const notePositions = {
    'G': {
      'C6': 0, 'B5': 1, 'A5': 2, 'G5': 3, 'F5': 4, 'E5': 5, 'D5': 6, 'C5': 7,
      'B4': 8, 'A4': 9, 'G4': 10, 'F4': 11, 'E4': 12, 'D4': 13, 'C4': 14, 'B3': 15
    },
    'F': {
      'C4': 0, 'B3': 1, 'A3': 2, 'G3': 3, 'F3': 4, 'E3': 5, 'D3': 6, 'C3': 7,
      'B2': 8, 'A2': 9, 'G2': 10, 'F2': 11, 'E2': 12, 'D2': 13, 'C2': 14
    }
  };

  const generateRandomNotes = () => {
    const numberOfNotes = Math.floor(Math.random() * 8) + 4; // Generate 4-12 notes
    const availableNotes = currentClef === 'G' ? gClefNotes : fClefNotes;
    return Array.from({ length: numberOfNotes }, () => 
      availableNotes[Math.floor(Math.random() * availableNotes.length)]
    );
  };

  const getNotePosition = (note) => {
    return notePositions[currentClef][note] * 5;
  };

  const regenerateMusic = () => {
    setCurrentClef(Math.random() < 0.5 ? 'G' : 'F');
    setNotes(generateRandomNotes());
  };

  useEffect(() => {
    regenerateMusic();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Random Sheet Music ({currentClef} Clef)
            </h1>
            <button
              onClick={regenerateMusic}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generate New
            </button>
          </div>
          
          <svg viewBox="0 0 400 100" className="w-full">
            {/* Staff lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`staff-${i}`}
                x1="10"
                y1={20 + i * 10}
                x2="390"
                y2={20 + i * 10}
                stroke="black"
                strokeWidth="1"
              />
            ))}
            
            {/* Clef symbol */}
            <text x="15" y="45" fontSize="40" fontFamily="serif">
              {currentClef === 'G' ? '\u{1D11E}' : '\u{1D122}'}
            </text>

            {/* Notes */}
            {notes.map((note, index) => (
              <g key={`note-${index}`}>
                <ellipse
                  cx={80 + index * 40}
                  cy={20 + getNotePosition(note)}
                  rx="6"
                  ry="4"
                  transform={`rotate(-20, ${80 + index * 40}, ${20 + getNotePosition(note)})`}
                  fill="black"
                />
                <line
                  x1={86 + index * 40}
                  y1={20 + getNotePosition(note)}
                  x2={86 + index * 40}
                  y2={20 + getNotePosition(note) - 30}
                  stroke="black"
                  strokeWidth="1"
                />
              </g>
            ))}
          </svg>
          
          <div className="mt-6 text-sm text-gray-500">
            Click "Generate New" or refresh the page to create new random sheet music.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomSheetMusic;