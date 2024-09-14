import axios from "axios";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {
  try {
    const response = await axios.get(process.env.BACKEND_API);
    const data = response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Backend API fetch failed, serving local data instead:", error.message);

    // If the backend API fails, read the local newsData.json file
    try {
      const filePath = path.join(process.cwd(), 'public', 'newsData.json');
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const localData = JSON.parse(jsonData);

      return new Response(JSON.stringify(localData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (fileError) {
      console.error("Failed to read local JSON file:", fileError.message);
      
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
};




// import axios from "axios";
// export const dynamic = 'force-dynamic';
// export const GET = async (req, res) => {
//   try {
//     const response = await axios.get(process.env.BACKEND_API);
//     const data = response.data;

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// };
