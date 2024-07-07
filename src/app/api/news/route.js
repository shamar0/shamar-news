import axios from "axios";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 3;

  try {
    const response = await axios.get(`http://newsinsummary-env.eba-t6yjac2w.ap-south-1.elasticbeanstalk.com/news?page=${page}&limit=${limit}`);
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
