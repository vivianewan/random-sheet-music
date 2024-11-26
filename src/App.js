import React, { useState, useEffect, useCallback } from 'react';

function App() {
  // Move these outside of the component to avoid recreating them on every render
  const GCLEF_NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'];
  const FCLEF_NOTES = ['E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
  
  const NOTE_POSITIONS = {
    'G': {
      'A5': 2, 'G5': 3, 'F5': 4, 'E5': 5, 'D5': 6, 'C5': 7, 'B4': 8,
      'A4': 9, 'G4': 10, 'F4': 11, 'E4': 12, 'D4': 13, 'C4': 14
    },
    'F': {
      'C4': 2, 'B3': 3, 'A3': 4, 'G3': 5, 'F3': 6, 'E3': 7, 'D3': 8,
      'C3': 9, 'B2': 10, 'A2': 11, 'G2': 12, 'F2': 13, 'E2': 14
    }
  };

  const LEDGER_LINES = {
    'G': {
      'A5': 2,    // 2 ledger lines above
      'G5': 1,    // 1 ledger line above
      'G4': -1,   // 1 ledger line below
      'F4': -2,   // 2 ledger lines below
      'E4': -2,
      'D4': -2,
      'C4': -2,
    },
    'F': {
      'C4': 2,    // 2 ledger lines above
      'B3': 1,    // 1 ledger line above
      'B2': -1,   // 1 ledger line below
      'A2': -2,   // 2 ledger lines below
      'G2': -2,
      'F2': -2,
      'E2': -2,
    }
  };

  const [currentClef, setCurrentClef] = useState('G');
  const [notes, setNotes] = useState([]);

  const generateRandomNotes = useCallback(() => {
    const numberOfNotes = Math.floor(Math.random() * 8) + 4;
    const availableNotes = currentClef === 'G' ? GCLEF_NOTES : FCLEF_NOTES;
    return Array.from({ length: numberOfNotes }, () => 
      availableNotes[Math.floor(Math.random() * availableNotes.length)]
    );
  }, [currentClef]);

  const getNotePosition = useCallback((note) => {
    return NOTE_POSITIONS[currentClef][note] * 5;
  }, [currentClef]);

  const needsLedgerLines = useCallback((note) => {
    return LEDGER_LINES[currentClef][note] || 0;
  }, [currentClef]);

  const regenerateMusic = useCallback(() => {
    const newClef = Math.random() < 0.5 ? 'G' : 'F';
    setCurrentClef(newClef);
    setNotes(Array.from({ length: Math.floor(Math.random() * 8) + 4 }, () => {
      const availableNotes = newClef === 'G' ? GCLEF_NOTES : FCLEF_NOTES;
      return availableNotes[Math.floor(Math.random() * availableNotes.length)];
    }));
  }, []);

  // Only run once on mount
  useEffect(() => {
    regenerateMusic();
  }, []); // Empty dependency array

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

            {/* Notes with ledger lines */}
            {notes.map((note, index) => {
              const ledgerLineCount = needsLedgerLines(note);
              const noteY = 20 + getNotePosition(note);
              
              return (
                <g key={`note-${index}`}>
                  {/* Ledger lines */}
                  {ledgerLineCount !== 0 && Array.from(
                    { length: Math.abs(ledgerLineCount) },
                    (_, i) => (
                      <line
                        key={`ledger-${i}`}
                        x1={73 + index * 40}
                        y1={noteY + (ledgerLineCount > 0 ? -i * 10 : i * 10)}
                        x2={87 + index * 40}
                        y2={noteY + (ledgerLineCount > 0 ? -i * 10 : i * 10)}
                        stroke="black"
                        strokeWidth="1"
                      />
                    )
                  )}
                  
                  {/* Note head */}
                  <ellipse
                    cx={80 + index * 40}
                    cy={noteY}
                    rx="6"
                    ry="4"
                    transform={`rotate(-20, ${80 + index * 40}, ${noteY})`}
                    fill="black"
                  />
                  
                  {/* Note stem */}
                  <line
                    x1={86 + index * 40}
                    y1={noteY}
                    x2={86 + index * 40}
                    y2={noteY - 30}
                    stroke="black"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
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