'use client';
import { useEffect, useState } from "react";
import Home from "./home";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading";

export default function PageClient({ initialPage, initialLimit, initialData }) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/news?page=${page}&limit=${limit}`);
        const data = res.data;
        const offset = (page - 1) * limit;
        const paginatedData = data.slice(offset, offset + limit);
        setData(paginatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (page !== initialPage || limit !== initialLimit || !initialData.length) {
      getData();
    }
  }, [page, limit, initialPage, initialLimit, initialData]);

  const handleNavigation = (newPage) => {
    setPage(newPage);
    router.push(`/news?page=${newPage}&limit=${limit}`, undefined, { shallow: true });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Home data={data} />
      <br /> <br />
      {page > 1 && (
        <button
          className="btn position-absolute"
          style={{ left: "3rem", fontSize: "1.5rem", textDecoration: "underline" }}
          onClick={() => handleNavigation(page - 1)}
        >
          <i className="fa-solid fa-arrow-left"></i> Previous
        </button>
      )}
      <button
        className="btn position-absolute"
        style={{ right: "3rem", fontSize: "1.5rem", textDecoration: "underline" }}
        onClick={() => handleNavigation(page + 1)}
      >
        Next <i className="fa-solid fa-arrow-right"></i>
      </button>
      <br />
    </div>
  );
}


// 'use client'; 
// import { useEffect, useState } from "react";
// import Home from "./home";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Loading from "../loading";
// import '../../../public/style.css'

// export default function PageClient({ initialPage, initialLimit, initialData }) {
//   const router = useRouter();
//   const [page, setPage] = useState(initialPage);
//   const [limit, setLimit] = useState(initialLimit);
//   const [data, setData] = useState(initialData);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     async function getData() {
//       setLoading(true);
//       try {
//         const res = await axios.get(`/api/news?page=${page}&limit=${limit}`);
//         const data = res.data;
//         setData(data);
//         filterData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if ( !initialData.length) {
//       getData();
//     }
   
//   }, [initialData])

//   useEffect(() => {
//     filterData(data);
//   }, [page, limit]);


//   const filterData= (dataToFilter) => {
//         const offset = (page - 1) * limit;
//         const paginatedData = dataToFilter.slice(offset, offset + limit);
//         setFilteredData(paginatedData);
//   };

//   const handleNavigation = (newPage) => {
//     setPage(newPage);
//     router.push(`/news?page=${newPage}&limit=${limit}`, undefined, { shallow: true });
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div>
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
//     </div>
//   );
// }