import axios from "axios";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

let isApiFailed = true; 

export const GET = async (req, res) => {
  if (isApiFailed) {
    return serveLocalData();
  }

  try {
    const response = await axios.get(process.env.BACKEND_API);
    const data = response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Backend API fetch failed, serving local data instead:", error.message);
    isApiFailed = true;
    return serveLocalData();
  }
};

const serveLocalData = async () => {
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
};