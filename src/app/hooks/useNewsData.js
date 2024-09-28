import  { useEffect, useState } from 'react';
import axios from "axios";


export default function useNewsData(initialPage, initialLimit, category = null) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let res = await axios.get(`/api/news`);
        res = res.data;
        setData(res);
        filterData(res);
        setNoMoreData(res.length==0);
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

  const filterData = (filtered) => {
    if (category) {
      let formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      console.log(category);
      if (category === 'science%26enviroment') formattedCategory = 'Science&Enviroment';
      if (category === 'science&enviroment') formattedCategory = 'Science&Enviroment';
      if (category === 'it') formattedCategory = 'IT';
      if (category === 'business') formattedCategory = 'Startup';
      console.log("Format",formattedCategory);
      filtered = filtered.filter((item) => item.category == formattedCategory);
    }

    const offset = (page - 1) * limit;
    const paginatedData = filtered.slice(offset, offset + limit);
    setFilteredData(page === 1 ? paginatedData : (prevData) => [...prevData, ...paginatedData]);
    setNoMoreData(paginatedData.length < limit);
  };

  const handleNavigation = (newPage) => {
    setPage(newPage);
  };

  return { page, filteredData, loading, noMoreData, handleNavigation };

}
