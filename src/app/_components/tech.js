'use client';
import { useEffect, useState } from "react";
import Home from "./home";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../loading";
import '../../../public/style.css'

export default function Tech({ initialPage, initialLimit, initialData }) {
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
        const filteredData = data.filter(item => item.category == "Tech");
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
    router.push(`/category/tech?page=${newPage}&limit=${limit}`, undefined, { shallow: true });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Home data={data} />
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