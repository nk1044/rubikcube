// move.js
export const MakeMove = (cube, move) => {
    // Make a deep copy of the cube
    const newCube = cube.map(face => face.map(row => [...row]));
    
    // Face indices mapping:
    // 0: Front (Red)
    // 1: Left (Blue)
    // 2: Right (Green)
    // 3: Back (Orange)
    // 4: Top (White)
    // 5: Bottom (Yellow)
    
    switch (move) {
        case 'R': // Right face clockwise
            // Rotate the right face (Green)
            rotateClockwise(newCube, 2);
            
            // Update the affected rows/columns on adjacent faces
            // Save the front face column
            const frontCol = [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]];
            
            // Front -> Bottom
            [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]] = 
                [newCube[5][0][2], newCube[5][1][2], newCube[5][2][2]];
            
            // Bottom -> Back (reversed)
            [newCube[5][0][2], newCube[5][1][2], newCube[5][2][2]] = 
                [newCube[3][2][0], newCube[3][1][0], newCube[3][0][0]];
            
            // Back -> Top (reversed)
            [newCube[3][2][0], newCube[3][1][0], newCube[3][0][0]] = 
                [newCube[4][0][2], newCube[4][1][2], newCube[4][2][2]];
            
            // Top -> Front
            [newCube[4][0][2], newCube[4][1][2], newCube[4][2][2]] = frontCol;
            
            break;
            
        case 'R-Prime': // Right face counter-clockwise
            rotateCounterClockwise(newCube, 2);
            
            // Save the front face column
            const frontColPrime = [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]];
            
            // Front -> Top
            [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]] = 
                [newCube[4][0][2], newCube[4][1][2], newCube[4][2][2]];
            
            // Top -> Back (reversed)
            [newCube[4][0][2], newCube[4][1][2], newCube[4][2][2]] = 
                [newCube[3][2][0], newCube[3][1][0], newCube[3][0][0]];
            
            // Back -> Bottom (reversed)
            [newCube[3][2][0], newCube[3][1][0], newCube[3][0][0]] = 
                [newCube[5][0][2], newCube[5][1][2], newCube[5][2][2]];
            
            // Bottom -> Front
            [newCube[5][0][2], newCube[5][1][2], newCube[5][2][2]] = frontColPrime;
            
            break;
            
        case 'L': // Left face clockwise
            rotateClockwise(newCube, 1);
            
            // Save the front face column
            const frontColL = [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]];
            
            // Front -> Top
            [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]] = 
                [newCube[4][0][0], newCube[4][1][0], newCube[4][2][0]];
            
            // Top -> Back (reversed)
            [newCube[4][0][0], newCube[4][1][0], newCube[4][2][0]] = 
                [newCube[3][2][2], newCube[3][1][2], newCube[3][0][2]];
            
            // Back -> Bottom (reversed)
            [newCube[3][2][2], newCube[3][1][2], newCube[3][0][2]] = 
                [newCube[5][0][0], newCube[5][1][0], newCube[5][2][0]];
            
            // Bottom -> Front
            [newCube[5][0][0], newCube[5][1][0], newCube[5][2][0]] = frontColL;
            
            break;
            
        case 'L-Prime': // Left face counter-clockwise
            rotateCounterClockwise(newCube, 1);
            
            // Save the front face column
            const frontColLPrime = [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]];
            
            // Front -> Bottom
            [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]] = 
                [newCube[5][0][0], newCube[5][1][0], newCube[5][2][0]];
            
            // Bottom -> Back (reversed)
            [newCube[5][0][0], newCube[5][1][0], newCube[5][2][0]] = 
                [newCube[3][2][2], newCube[3][1][2], newCube[3][0][2]];
            
            // Back -> Top (reversed)
            [newCube[3][2][2], newCube[3][1][2], newCube[3][0][2]] = 
                [newCube[4][0][0], newCube[4][1][0], newCube[4][2][0]];
            
            // Top -> Front
            [newCube[4][0][0], newCube[4][1][0], newCube[4][2][0]] = frontColLPrime;
            
            break;
            
        case 'U': // Top face clockwise
            rotateClockwise(newCube, 4);
            
            // Save the front face row
            const frontRowU = [...newCube[0][0]];
            
            // Front -> Right
            newCube[0][0] = [...newCube[1][0]];
            
            // Right -> Back
            newCube[1][0] = [...newCube[3][0]];
            
            // Back -> Left
            newCube[3][0] = [...newCube[2][0]];
            
            // Left -> Front
            newCube[2][0] = frontRowU;
            
            break;
            
        case 'U-Prime': // Top face counter-clockwise
            rotateCounterClockwise(newCube, 4);
            
            // Save the front face row
            const frontRowUPrime = [...newCube[0][0]];
            
            // Front -> Left
            newCube[0][0] = [...newCube[2][0]];
            
            // Left -> Back
            newCube[2][0] = [...newCube[3][0]];
            
            // Back -> Right
            newCube[3][0] = [...newCube[1][0]];
            
            // Right -> Front
            newCube[1][0] = frontRowUPrime;
            
            break;
            
        case 'D': // Bottom face clockwise
            rotateClockwise(newCube, 5);
            
            // Save the front face row
            const frontRowD = [...newCube[0][2]];
            
            // Front -> Left
            newCube[0][2] = [...newCube[2][2]];
            
            // Left -> Back
            newCube[2][2] = [...newCube[3][2]];
            
            // Back -> Right
            newCube[3][2] = [...newCube[1][2]];
            
            // Right -> Front
            newCube[1][2] = frontRowD;
            
            break;
            
        case 'D-Prime': // Bottom face counter-clockwise
            rotateCounterClockwise(newCube, 5);
            
            // Save the front face row
            const frontRowDPrime = [...newCube[0][2]];
            
            // Front -> Right
            newCube[0][2] = [...newCube[1][2]];
            
            // Right -> Back
            newCube[1][2] = [...newCube[3][2]];
            
            // Back -> Left
            newCube[3][2] = [...newCube[2][2]];
            
            // Left -> Front
            newCube[2][2] = frontRowDPrime;
            
            break;
            
        case 'F': // Front face clockwise
            rotateClockwise(newCube, 0);
            
            // Save the top face row
            const topRowF = [...newCube[4][2]];
            
            // Top -> Left (rotated)
            [newCube[4][2][0], newCube[4][2][1], newCube[4][2][2]] = 
                [newCube[2][2][2], newCube[2][1][2], newCube[2][0][2]];
            
            // Left -> Bottom (rotated)
            [newCube[2][0][2], newCube[2][1][2], newCube[2][2][2]] = 
                [newCube[5][0][0], newCube[5][0][1], newCube[5][0][2]];
            
            // Bottom -> Right (rotated)
            [newCube[5][0][0], newCube[5][0][1], newCube[5][0][2]] = 
                [newCube[1][2][0], newCube[1][1][0], newCube[1][0][0]];
            
            // Right -> Top
            [newCube[1][0][0], newCube[1][1][0], newCube[1][2][0]] = 
                [topRowF[2], topRowF[1], topRowF[0]];
            
            break;
            
        case 'F-Prime': // Front face counter-clockwise
            rotateCounterClockwise(newCube, 0);
            
            // Save the top face row
            const topRowFPrime = [...newCube[4][2]];
            
            // Top -> Right (rotated)
            [newCube[4][2][0], newCube[4][2][1], newCube[4][2][2]] = 
                [newCube[1][0][0], newCube[1][1][0], newCube[1][2][0]];
            
            // Right -> Bottom (rotated)
            [newCube[1][0][0], newCube[1][1][0], newCube[1][2][0]] = 
                [newCube[5][0][2], newCube[5][0][1], newCube[5][0][0]];
            
            // Bottom -> Left (rotated)
            [newCube[5][0][0], newCube[5][0][1], newCube[5][0][2]] = 
                [newCube[2][0][2], newCube[2][1][2], newCube[2][2][2]];
            
            // Left -> Top
            [newCube[2][0][2], newCube[2][1][2], newCube[2][2][2]] = 
                [topRowFPrime[2], topRowFPrime[1], topRowFPrime[0]];
            
            break;
            
        case 'B': // Back face clockwise
            rotateClockwise(newCube, 3);
            
            // Save the top face row
            const topRowB = [...newCube[4][0]];
            
            // Top -> Right (rotated)
            [newCube[4][0][0], newCube[4][0][1], newCube[4][0][2]] = 
                [newCube[1][0][2], newCube[1][1][2], newCube[1][2][2]];
            
            // Right -> Bottom (rotated)
            [newCube[1][0][2], newCube[1][1][2], newCube[1][2][2]] = 
                [newCube[5][2][2], newCube[5][2][1], newCube[5][2][0]];
            
            // Bottom -> Left (rotated)
            [newCube[5][2][0], newCube[5][2][1], newCube[5][2][2]] = 
                [newCube[2][0][0], newCube[2][1][0], newCube[2][2][0]];
            
            // Left -> Top
            [newCube[2][0][0], newCube[2][1][0], newCube[2][2][0]] = 
                [topRowB[2], topRowB[1], topRowB[0]];
            
            break;
            
        case 'B-Prime': // Back face counter-clockwise
            rotateCounterClockwise(newCube, 3);
            
            // Save the top face row
            const topRowBPrime = [...newCube[4][0]];
            
            // Top -> Left (rotated)
            [newCube[4][0][0], newCube[4][0][1], newCube[4][0][2]] = 
                [newCube[2][2][0], newCube[2][1][0], newCube[2][0][0]];
            
            // Left -> Bottom (rotated)
            [newCube[2][0][0], newCube[2][1][0], newCube[2][2][0]] = 
                [newCube[5][2][0], newCube[5][2][1], newCube[5][2][2]];
            
            // Bottom -> Right (rotated)
            [newCube[5][2][0], newCube[5][2][1], newCube[5][2][2]] = 
                [newCube[1][2][2], newCube[1][1][2], newCube[1][0][2]];
            
            // Right -> Top
            [newCube[1][0][2], newCube[1][1][2], newCube[1][2][2]] = 
                [topRowBPrime[2], topRowBPrime[1], topRowBPrime[0]];
            
            break;
    }
    
    return newCube;
};

// Helper functions to rotate a face
const rotateClockwise = (cube, faceIndex) => {
    const face = cube[faceIndex];
    const rotated = [
        [face[2][0], face[1][0], face[0][0]],
        [face[2][1], face[1][1], face[0][1]],
        [face[2][2], face[1][2], face[0][2]]
    ];
    cube[faceIndex] = rotated;
};

const rotateCounterClockwise = (cube, faceIndex) => {
    const face = cube[faceIndex];
    const rotated = [
        [face[0][2], face[1][2], face[2][2]],
        [face[0][1], face[1][1], face[2][1]],
        [face[0][0], face[1][0], face[2][0]]
    ];
    cube[faceIndex] = rotated;
};