import axios from "axios";

export const dynamic = 'force-dynamic';

export const GET = async (req,{params}) => {
  const { searchParams } = new URL(req.url);
  const {p} = params;  
  const page = parseInt(searchParams.get("page")) || 1;  
  const limit = parseInt(searchParams.get("limit")) || 5;  

  const apiUrl = `${process.env.BACKEND_API}/search?query=${p}&page=${page}&limit=${limit}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("API fetch failed:", error.message);
    return new Response(JSON.stringify({ error: "API fetch failed" }), {
      status: 500,
    });
  }
};
