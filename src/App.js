import React, { useState, useEffect, useCallback } from 'react';

function App() {
  // Notes range updated to match the image:
  // G clef: from 2 ledger lines below to 2 ledger lines above staff
  const gClefNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'];
  
  // F clef: from 2 ledger lines below to 2 ledger lines above staff
  const fClefNotes = ['E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];

  const [currentClef, setCurrentClef] = useState('G');
  const [notes, setNotes] = useState([]);

  const notePositions = {
    'G': {
      'A5': 2,  // 2nd ledger line above
      'G5': 3,  // 1st ledger line above
      'F5': 4,  // 5th line
      'E5': 5,  // 4th line
      'D5': 6,  // 3rd line
      'C5': 7,  // 2nd line
      'B4': 8,  // 1st line
      'A4': 9,  // 1st space below
      'G4': 10, // 1st ledger line below
      'F4': 11, // 2nd ledger line below
      'E4': 12,
      'D4': 13,
      'C4': 14
    },
    'F': {
      'C4': 2,  // 2nd ledger line above
      'B3': 3,  // 1st ledger line above
      'A3': 4,  // 5th line
      'G3': 5,  // 4th line
      'F3': 6,  // 3rd line
      'E3': 7,  // 2nd line
      'D3': 8,  // 1st line
      'C3': 9,  // 1st space below
      'B2': 10, // 1st ledger line below
      'A2': 11, // 2nd ledger line below
      'G2': 12,
      'F2': 13,
      'E2': 14
    }
  };

  const generateRandomNotes = useCallback(() => {
    const numberOfNotes = Math.floor(Math.random() * 8) + 4; // Generate 4-12 notes
    const availableNotes = currentClef === 'G' ? gClefNotes : fClefNotes;
    return Array.from({ length: numberOfNotes }, () => 
      availableNotes[Math.floor(Math.random() * availableNotes.length)]
    );
  }, [currentClef]);

  const getNotePosition = useCallback((note) => {
    return notePositions[currentClef][note] * 5;
  }, [currentClef]);

  const regenerateMusic = useCallback(() => {
    setCurrentClef(Math.random() < 0.5 ? 'G' : 'F');
    setNotes(generateRandomNotes());
  }, [generateRandomNotes]);

  useEffect(() => {
    regenerateMusic();
  }, [regenerateMusic]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '3rem 1rem'
    }}>
      <div style={{
        maxWidth: '42rem',
        margin: '0 auto',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827',
            }}>
              Random Sheet Music ({currentClef} Clef)
            </h1>
            <button
              onClick={regenerateMusic}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <svg
                style={{
                  width: '1rem',
                  height: '1rem',
                }}
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
          
          <svg viewBox="0 0 400 100" style={{ width: '100%' }}>
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
          
          <div style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}>
            Click "Generate New" or refresh the page to create new random sheet music.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;