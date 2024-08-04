import axios from "axios";

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
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
