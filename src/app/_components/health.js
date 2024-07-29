'use client';
import { useEffect, useState } from "react";
import Home from "./home";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading";
import Link from "next/link";

export default function Health({ initialPage, initialLimit, initialData }) {
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
        const filteredData = data.filter(item => item.category == "Health");
        const offset = (page - 1) * limit;
        const paginatedData = filteredData.slice(offset, offset + limit);
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
  }, [page, limit]);

  const handleNavigation = (newPage) => {
    setPage(newPage);
    router.push(`/category/health?page=${newPage}&limit=${limit}`, undefined, { shallow: true });
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
          <i className="fa-solid fa-arrow-left"></i> Prev
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
      <Link href="/category/education">CLICK HERE</Link>
    </div>
  );
}

// 'use client';
// import { useEffect, useState } from "react";
// import Home from "./home";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Loading from "../loading";
// import Link from "next/link";
// import '../../../public/style.css'

// export default function Health({ initialPage, initialLimit }) {
//   const router = useRouter();
//   const [page, setPage] = useState(initialPage);
//   const [limit, setLimit] = useState(initialLimit);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredData, setFilteredData] = useState([]);


//   useEffect(() => {
//     async function getData() {
//       setLoading(true);
//       try {
//         let res = await axios.get(`/api/news?page=${page}&limit=${limit}`);
//         res = res.data;
//         setData(res);
//         filterData(res);
//       } catch (error) {
//         console.error("Error fetching data:", error);
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
//     const categorisedData = dataToFilter.filter(item => item.category == "Health");
//     const offset = (page - 1) * limit;
//     const paginatedData = categorisedData.slice(offset, offset + limit);
//         setFilteredData(paginatedData);
//   };

//   const handleNavigation = (newPage) => {
//     setPage(newPage);
//     router.push(`/category/health?page=${newPage}&limit=${limit}`, undefined, { shallow: true });
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <Home data={filteredData} />
//       <br /> <br />
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