'use client';
import { useEffect, useState } from "react";
import Home from "./home";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading";
import '../../../public/style.css'

export default function CategoryPage({category, initialPage, initialLimit}) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let res = await axios.get(`/api/news?page=${page}&limit=${limit}`);
        res = res.data;
        setData(res);
        filterData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
      getData();
  }, []);

  useEffect(() => {
    filterData(data);
  }, [page, limit]);


  const filterData= (dataToFilter) => {
    const categorisedData = dataToFilter.filter(item => item.category == category);
    const offset = (page - 1) * limit;
    const paginatedData = categorisedData.slice(offset, offset + limit);
        setFilteredData(paginatedData);
  };

  const handleNavigation = (newPage) => {
    setPage(newPage);
    router.push(`/category/${category.toLowerCase()}?page=${newPage}&limit=${limit}`, undefined, { shallow: true });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Home data={filteredData} />
      <br /> <br />
      <div className="btn-container">
      {page > 1 && (
          <div className="prev-btn nxpv-btn">
        <button
          className="btn"
          onClick={() => handleNavigation(page - 1)}
        >
          <i className="fa-solid fa-arrow-left"></i> Prev
        </button>
        </div>
      )}
      <div className="next-btn nxpv-btn">
      <button
        className="btn"
        onClick={() => handleNavigation(page + 1)}
      >
        Next <i className="fa-solid fa-arrow-right"></i>
      </button>
      </div>
      </div>
    </div>
  );
}