import React, { useState } from 'react';
import { MakeMove } from './move.js';
import { BestNextMove } from '../AI_Model/gemini.js';

function Cube() {
    const Red = [['R', 'R', 'R'], ['R', 'R', 'R'], ['R', 'R', 'R']];
    const Blue = [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']];
    const Green = [['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'G', 'G']];
    const Orange = [['O', 'O', 'O'], ['O', 'O', 'O'], ['O', 'O', 'O']];
    const White = [['W', 'W', 'W'], ['W', 'W', 'W'], ['W', 'W', 'W']];
    const Yellow = [['Y', 'Y', 'Y'], ['Y', 'Y', 'Y'], ['Y', 'Y', 'Y']];

    const [cube, setCube] = useState([Red, Blue, Green, Orange, White, Yellow]);
    const [expanded, setExpanded] = useState(false);
    const [XPos, setXPos] = useState(-40);
    const [YPos, setYPos] = useState(-30);
    const [rotateX, setRotateX] = useState(XPos);
    const [rotateY, setRotateY] = useState(YPos);

    const handleMove = (move) => {
        setCube(MakeMove(cube, move));
    }
    

    // Fixed function - corrected variable assignments and movement directions
    const handleMovement = (move) => {
      if(move === 'D'){
        // Up movement should change X rotation (pitch)
        setRotateY(rotateY - 10); // Negative to tilt up
      }
      else if(move === 'U'){
        // Down movement should change X rotation (pitch)
        setRotateY(rotateY + 10); // Positive to tilt down
      }
      else if(move === 'L'){
        // Left movement should change Y rotation (yaw)
        setRotateX(rotateX - 10); // Negative to turn left
      }
      else if(move === 'R'){
        // Right movement should change Y rotation (yaw)
        setRotateX(rotateX + 10); // Positive to turn right
      }
    }

    const toggleExpand = () => {
        setExpanded(!expanded);
    }
    const handleClick = async() => {
      for(let i = 0; i < 10; i++){
        const move = await BestNextMove(cube);
        const formattedmove = move?.split(":")[1].trim();
        console.log(formattedmove);
        setCube(MakeMove(cube, formattedmove));
      }
  }

    const colorMap = {
        'R': '#e53935',
        'B': '#1e88e5',
        'G': '#43a047',
        'O': '#ff9800',
        'W': '#f5f5f5',
        'Y': '#fdd835'
    };

    // Mapping for face positions in 3D space
    const facePositions = [
        { transform: 'translateZ(120px) rotateY(0deg)', face: 0 },      // Red - Front
        { transform: 'translateX(-120px) rotateY(-90deg)', face: 1 },   // Blue - Left
        { transform: 'translateX(120px) rotateY(90deg)', face: 2 },     // Green - Right
        { transform: 'translateZ(-120px) rotateY(180deg)', face: 3 },   // Orange - Back
        { transform: 'translateY(-120px) rotateX(90deg)', face: 4 },    // White - Top
        { transform: 'translateY(120px) rotateX(-90deg)', face: 5 }     // Yellow - Bottom
    ];

    return (
        <div className='w-full h-screen bg-neutral-950 grid grid-cols-1 place-items-center'>
            <div className='flex flex-col items-center gap-y-3'>
                <h1 className='text-5xl text-neutral-600 font-bold'>Rubik's Cube</h1>
                <button 
                    className='mb-2 bg-purple-600 rounded text-white px-3 py-1 cursor-pointer'
                    onClick={handleClick}
                >
                    {expanded ? 'Collapse Cube' : 'Expand Cube'}
                </button>
            </div>

            <div className='flex flex-col items-center justify-center mt-10 mb-10 text-white'>
                <div className='relative w-64 h-64 perspective-800'>
                    {expanded ? (
                      <h1>hello</h1>
                    ) : (
                      <div 
                        className='w-full h-full preserve-3d'
                        style={{ 
                            // In CSS 3D transforms, rotateX is vertical (pitch) and rotateY is horizontal (yaw)
                            transform: `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`,
                            transition: 'transform 0.5s ease'
                        }}
                      >
                        {facePositions.map((position, faceIndex) => (
                            <div 
                                key={faceIndex} 
                                className='absolute w-full h-full preserve-3d'
                                style={{ transform: position.transform }}
                            >
                                <div className='relative w-full h-full grid grid-cols-3 gap-1 p-1 bg-black rounded'>
                                    {cube[position.face].map((row, rowIndex) => (
                                        row.map((cell, colIndex) => (
                                            <div 
                                                key={`${rowIndex}-${colIndex}`}
                                                className='rounded'
                                                style={{ 
                                                    backgroundColor: colorMap[cell],
                                                    border: '1px solid rgba(0,0,0,0.3)'
                                                }}
                                            ></div>
                                        ))
                                    ))}
                                </div>
                            </div>
                        ))}
                      </div>
                    )}
                </div>
            </div>

            <div className='w-24 h-24 text-white mt-10'>
                <div className='w-full h-full grid grid-cols-3 grid-rows-3'>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer' 
                       onClick={() => {handleMovement('U'); handleMovement('L')}}>
                    ↖️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer' 
                       onClick={() => handleMovement('U')}>
                    ⬆️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer'
                       onClick={() => {handleMovement('U'); handleMovement('R')}}>
                    ↗️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer'
                       onClick={() => handleMovement('L')}>
                    ⬅️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center'>
                    ⏺️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer'
                       onClick={() => handleMovement('R')}>
                    ➡️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer'
                       onClick={() => {handleMovement('D'); handleMovement('L')}}>
                    ↙️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer'
                       onClick={() => handleMovement('D')}>
                    ⬇️
                  </div>
                  <div className=' w-full h-full flex justify-center items-center cursor-pointer'
                       onClick={() => {handleMovement('D'); handleMovement('R')}}>
                    ↘️
                  </div>
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-3'>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('R')}>R</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('R-Prime')}>R'</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('L')}>L</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('L-Prime')}>L'</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('U')}>U</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('U-Prime')}>U'</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('D')}>D</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('D-Prime')}>D'</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('F')}>F</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('F-Prime')}>F'</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('B')}>B</button>
                <button className='bg-blue-500 rounded text-white px-3 py-1 cursor-pointer' onClick={() => handleMove('B-Prime')}>B'</button>
            </div>
            
            <style jsx>{`
                .perspective-800 {
                    perspective: 800px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
}

export default Cube;