'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import '../../../public/style.css';
import Home from '../_components/Home';
import Loading from '../loading';

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let p = searchParams.get("search");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(`/api/news`);
        res = res.data;
        setData(res);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!p) {
      router.push(`/news`);
      return;
    }
    if (p) {
      setPage(1);
      setLimit(10);
      filterData();
    }
  }, [p]);

  useEffect(() => {
    filterData();
  }, [page, limit, data]);

  const filterData = () => {
    if (p && data.length > 0) {
      const keywords = p.toLowerCase().split(' ').filter(Boolean);
  
      const results = data.map(i => {
        const title = i.title.toLowerCase();
        const content = i.content.toLowerCase();
        let score = 0;
  
        keywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // Match whole words
          if (regex.test(title)) score += 2;
          if (regex.test(content)) score += 1;
        });
  
        return { ...i, score };
      }).filter(i => i.score >= keywords.length)
        .sort((a, b) => b.score - a.score);
  
      const offset = (page - 1) * limit;
      const paginatedData = results.slice(offset, offset + limit);
      if (page == 1) {
        setFilteredData(paginatedData);
      } else {
        setFilteredData(prevData => [...prevData, ...paginatedData]);
      }
      setNoMoreData(paginatedData.length == 0);  
    } else {
      setFilteredData([]);
    }
  };
  

  if (loading) {
    return <Loading/>;
  }

  const handleNavigation = (newPage) => {
    setPage(newPage);
    // router.push(`/products?search=${p}&page=${newPage}&limit=${limit}`, undefined, { shallow: true });
  };

  return (
    <div>
      { filteredData.length>0 ? (
         <>
      <Home data={filteredData} />
      {!noMoreData ? (
            <div className="btn-container">
              <div className="next-btn nxpv-btn">
                <button
                  className="btn"
                  onClick={() => handleNavigation(page + 1)}
                >
                  Load More
                </button>
              </div>
            </div>
      ) : (
        <h3 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!!!!</h3>
      )}
       </>

    ):(
      <h3 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!</h3>
    )}
    </div>
  );

}




//   return (
//     <div>
//         {filteredProducts.length > 0 ? (
//       <Home data={filteredProducts}/>
//         ) : (
//           <h3 style={{color:"#ff3333", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No relevant data found.</h3>
//         )}
      
//       <div className="btn-container">
//         {page > 1 && (
//           <div className="prev-btn nxpv-btn">
//             <button
//               className="btn"
//               onClick={() => handleNavigation(page - 1)}
//             >
//               <i className="fa-solid fa-arrow-left"></i> Prev
//             </button>
//           </div>
//         )}
        
//         {filteredProducts.length > 0 && (
//         <div className="next-btn nxpv-btn">
//           <button
//             className="btn"
//             onClick={() => handleNavigation(page + 1)}
//           >
//             Next <i className="fa-solid fa-arrow-right"></i>
//           </button>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }