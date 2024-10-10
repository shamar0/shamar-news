import  { useEffect, useState } from 'react';
import axios from "axios";


export default function useNewsData(initialPage, initialLimit, category = null,search=null) {
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
        let url = '';
        
        if (search) {
          // If search is provided, use the search-specific URL
          url = `/api/search/${search}?page=${page}&limit=${limit}`;
        } else if (category) {
          // Otherwise, format the category and use the category-specific URL
          let formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
          
          if (category === 'science%26enviroment' || category === 'science&enviroment') {
            formattedCategory = 'Science&Enviroment';
          }
          if (category === 'it') formattedCategory = 'IT';
          if (category === 'business') formattedCategory = 'Startup';
          
          url = `/api/news/${formattedCategory}?page=${page}&limit=${limit}`;
        } else {
          // If no category or search is provided, use the default news URL
          url = `/api/news?page=${page}&limit=${limit}`;
        }

        let res = await axios.get(url); 
        res = res.data;
        setData(res);
        filterData(res);
        setNoMoreData(res.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [page, limit, category,search]);

  const filterData = (filtered) => {
    const paginatedData = filtered.slice(0, limit); 
    setFilteredData(page === 1 ? paginatedData : (prevData) => [...prevData, ...paginatedData]);
    setNoMoreData(paginatedData.length < limit);
  };

  const handleNavigation = (newPage) => {
    setPage(newPage);
  };

  return { page, filteredData, loading, noMoreData, handleNavigation };

}

