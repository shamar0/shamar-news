'use client';
import Home from "./home";
import Loading from "../loading";
import '../../../public/style.css'
import useNewsData from "../hooks/useNewsData";

export default function CategoryPage({category, initialPage, initialLimit}) {
  const { page, filteredData, loading, noMoreData, handleNavigation } = useNewsData(initialPage, initialLimit, category);

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
        <h4 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!!!!</h4>
      )}
       </>

    ):(
      <h4 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!</h4>
    )}
    </div>
  );

}







// 'use client';
// import { useContext, useEffect, useState } from "react";
// import Home from "./home";
// import axios from "axios";
// import Loading from "../loading";
// import '../../../public/style.css'
// import ApiStatusContext from "../context/ApiStatusContext";


// export default function CategoryPage({category, initialPage, initialLimit}) {
//   const [page, setPage] = useState(initialPage);
//   const [limit, setLimit] = useState(initialLimit);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredData, setFilteredData] = useState([]);
//   const [noMoreData, setNoMoreData] = useState(false);
//   const {isApiFailed, setIsApiFailed} = useContext(ApiStatusContext);
  
//   useEffect(() => {
//     async function getData() {
//       setLoading(true);

//       if (isApiFailed) {
//         try {
//           // const res = await axios.get('/newsData.json');
//           // const localData = res.data;
//           // setData(localData);
//           // filterData(localData);
//         } catch (localError) {
//           console.error("Error fetching local data:", localError);
//         } finally {
//           setLoading(false);
//         }
//         return; // Skip API call if API has already failed
//       }

//       try {
//         let res = await axios.get(`/api/news`);
//         res = res.data;
//         console.log("RESPONSE",res.length);
//         setData(res);
//         console.log("data1",res.length);
//         filterData(res);
//         setNoMoreData(res.length==0);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsApiFailed(true);
//         try {
//           const res = await axios.get('/newsData.json');
//           const localData = res.data;
//           setData(localData);
//           filterData(localData);
//         } catch (localError) {
//           console.error("Error fetching local data:", localError);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//       getData();
//   }, []);

//   useEffect(() => {
//     filterData(data);
//   }, [page, limit]);


//   const filterData= (dataToFilter) => {
//     let formattedCategory='';
//     if(category=='science%26enviroment') formattedCategory = category.replace('science%26enviroment', 'Science&Environment');
//     else if(category=='it') formattedCategory = category.replace('it', 'IT');
//     else if(category=='business') formattedCategory = category.replace('business', 'Startup');
//      else formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
//     const categorisedData = dataToFilter.filter(item => item.category == formattedCategory);    
//     const offset = (page - 1) * limit;
//     const paginatedData = categorisedData.slice(offset, offset + limit);
//     if (page == 1) {
//       setFilteredData(paginatedData);
//     } else {
//       setFilteredData(prevData => [...prevData, ...paginatedData]);
//     }
//         setNoMoreData(paginatedData.length < 10);
//   };

//   const handleNavigation = (newPage) => {
//     setPage(newPage);
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       { filteredData.length>0 ? (
//          <>
//       <Home data={filteredData} />
//       {!noMoreData ? (
//             <div className="btn-container">
//               <div className="next-btn nxpv-btn">
//                 <button
//                   className="btn"
//                   onClick={() => handleNavigation(page + 1)}
//                 >
//                   Load More
//                 </button>
//               </div>
//             </div>
//       ) : (
//         <h4 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!!!!</h4>
//       )}
//        </>

//     ):(
//       <h4 style={{color:"#F7941F", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No more data found!!!</h4>
//     )}
//     </div>
//   );

// }