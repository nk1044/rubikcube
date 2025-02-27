import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyC2fxUDLVhB8_ToUxk-Pum04QiDrgR9OOQ');
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const BestNextMove = async (cube) => {
    const formattedCube = JSON.stringify(cube);  // Ensure correct JSON format
    // console.log('Cube:', formattedCube);
    const prompt = `You are an AI model that helps solve a 3x3 Rubik's Cube.
    
    **Cube Representation:**
    - The cube consists of six 3x3 faces represented as 6 matrices.
    - The colors are encoded as:
      'R' - Red (Front)
      'B' - Blue (Left)
      'G' - Green (Right)
      'O' - Orange (Back)
      'W' - White (Top)
      'Y' - Yellow (Bottom)
    
      ** Solved State:**
        - Each face should have a single color.
        - The colors should match on each face.
        [[["R","R","R"],["R","R","R"],["R","R","R"]],[["B","B","B"],["B","B","B"],["B","B","B"]],[["G","G","G"],["G","G","G"],["G","G","G"]],[["O","O","O"],["O","O","O"],["O","O","O"]],[["W","W","W"],["W","W","W"],["W","W","W"]],[["Y","Y","Y"],["Y","Y","Y"],["Y","Y","Y"]]]

    **Current Cube State:**  
    ${formattedCube}  

    **Allowed Moves:**
    ['U', 'U-Prime', 'D', 'D-Prime', 'L', 'L-Prime', 'R', 'R-Prime', 'F', 'F-Prime', 'B', 'B-Prime', None]
    U = clockwise turn of the upper face of the cube,
    U-Prime = counter-clockwise turn of the upper face of the cube,
    D = clockwise turn of the bottom face of the cube,
    D-Prime = counter-clockwise turn of the bottom face of the cube,
    L = clockwise turn of the left face of the cube,
    L-Prime = counter-clockwise turn of the left face of the cube,
    R = clockwise turn of the right face of the cube,
    R-Prime = counter-clockwise turn of the right face of the cube,
    F = clockwise turn of the front face of the cube,
    F-Prime = counter-clockwise turn of the front face of the cube,
    B = clockwise turn of the back face of the cube,
    B-Prime = counter-clockwise turn of the back face of the cube.
    None = no move, cube is solved.
    
    **Task:**  
    - Suggest the best next move to solve the cube.
    - Respond with only one move in the format:  
      "move: <MoveName>"`;

    try {
        const result = await model.generateContent(prompt);
        // console.log('Best Move:', result.response.text());
        return result.response.text();
    } catch (error) {
        console.log('Error:', error);
    }
};
