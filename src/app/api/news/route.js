require('dotenv').config()
import axios from "axios";

export const GET = async (req, res) => {
  try {
    const response = await axios.get("http://newsinsummary-env.eba-t6yjac2w.ap-south-1.elasticbeanstalk.com/news");
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
