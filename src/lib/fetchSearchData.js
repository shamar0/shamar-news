// lib/fetchData.js
// export async function fetchInitialProducts() {
//     const res = await fetch('/api/news');
//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const data = await res.json();
//     return data;
//   }
  
import axios from 'axios';

export async function fetchInitialProducts() {
    try {
        const res = await axios.get('/api/news');
        const data = res.data;
        return data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}