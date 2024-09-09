'use client'; 
import { useEffect, useState } from "react";
import Home from "./home";
import axios from "axios";
import Loading from "../loading";
import '../../../public/style.css'

export default function PageClient({ initialPage, initialLimit }) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/news?page=${page}&limit=${limit}`);
        const data = res.data;
        setData(data);
        filterData(data);
        setNoMoreData(res.length==0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
      getData();
  }, [])

  useEffect(() => {
    filterData(data);
  }, [page, limit]);


  const filterData= (dataToFilter) => {
            const offset = (page - 1) * limit;
            const paginatedData = dataToFilter.slice(offset, offset + limit);
            if (page == 1) {
              setFilteredData(paginatedData);
            } else {
              setFilteredData(prevData => [...prevData, ...paginatedData]);
            }
            setNoMoreData(paginatedData.length == 0);          
  };

  const handleNavigation = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

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
//       { filteredData.length>0 ? (
//         <>
//       <Home data={filteredData} />
//       <div className="btn-container">
//       {page > 1 && (
//           <div className="prev-btn nxpv-btn">
//         <button
//           className="btn"
//           onClick={() => handleNavigation(page - 1)}
//         >
//           <i className="fa-solid fa-arrow-left"></i> Prev
//         </button>
//         </div>
//       )}
//       <div className="next-btn nxpv-btn">
//       <button
//         className="btn"
//         onClick={() => handleNavigation(page + 1)}
//       >
//         Next <i className="fa-solid fa-arrow-right"></i>
//       </button>
//       </div>
//       </div>
//       </>
//        ) : (
//         <>
//         <Category/>
//         <h3 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!</h3>
//         <div className="btn-container">
//         <div className="next-btn nxpv-btn">
//       <button
//         className="btn"
//         onClick={() => handleNavigation(page - 1)}
//       >
//          <i className="fa-solid fa-arrow-left"></i> Pre
//       </button>
//       </div>
//       </div>
//         </>
//       )}
//     </div>
//   );
// }
