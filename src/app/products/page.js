'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import '../../../public/style.css';
import Home from '../_components/home';
import Loading from '../loading';

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let p = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/news`);
        const data = res.data;
        setProducts(data);
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
      filterProducts();
    }
  }, [p]);

  useEffect(() => {
    filterProducts();
  }, [page, limit, products]);

  const filterProducts = () => {
    if (p && products.length > 0) {
      const keywords = p.toLowerCase().split(' ').filter(Boolean);
  
      const results = products.map(product => {
        const title = product.title.toLowerCase();
        const content = product.content.toLowerCase();
        let score = 0;
  
        keywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'gi'); // Match whole words
          if (regex.test(title)) score += 2;
          if (regex.test(content)) score += 1;
        });
  
        return { ...product, score };
      }).filter(product => product.score >= keywords.length)
        .sort((a, b) => b.score - a.score);
  
      const offset = (page - 1) * limit;
      const paginatedData = results.slice(offset, offset + limit);
      setFilteredProducts(paginatedData);
    } else {
      setFilteredProducts([]);
    }
  };
  

  if (loading) {
    return <Loading/>;
  }

  const handleNavigation = (newPage) => {
    setPage(newPage);
    router.push(`/products?search=${p}&page=${newPage}&limit=${limit}`, undefined, { shallow: true });
  };

  return (
    <div>
        {filteredProducts.length > 0 ? (
      <Home data={filteredProducts}/>
        ) : (
          <h3 style={{color:"#ff3333", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px" }}>No relevant data found.</h3>
        )}
      
      
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
        
        {filteredProducts.length > 0 && (
        <div className="next-btn nxpv-btn">
          <button
            className="btn"
            onClick={() => handleNavigation(page + 1)}
          >
            Next <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
      </div>
    </div>
  );
}















// 'use client';
// import { useState, useEffect } from 'react';
// import { fetchInitialProducts } from '@/lib/fetchSearchData';
// import { useRouter, useSearchParams } from 'next/navigation';
// import axios from "axios";
// import '../../../public/style.css'



// export default function Products() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   let p = searchParams.get("search");

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(`/api/news`);
//         const data = res.data;
//         setProducts(data);
//         // const initialProducts = await fetchInitialProducts();
//         // setProducts(initialProducts);
//         // setFilteredProducts(); // Initialize with all products
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }finally {
//         setLoading(false);
//       }
//     }

//     fetchData();

//     if (p) {
//       if (p && products.length > 0) {
//         const keywords = p.toLowerCase().split(' ').filter(Boolean);

//         const results = products.map(product => {
//           const title = product.title.toLowerCase();
//           const content = product.content.toLowerCase();
//           let score = 0;
//           keywords.forEach(keyword => {
//             if (title.includes(keyword)) score += 2;
//             if (content.includes(keyword)) score += 1;
//           });

//           return { ...product, score };
//         }).filter(product => product.score >= keywords.length) // Filter products with score >= number of keywords
//           .sort((a, b) => b.score - a.score);
        
//         const offset = (page - 1) * limit;
//         const paginatedData = results.slice(offset, offset + limit);
//         setFilteredProducts(paginatedData);
//         // setFilteredProducts(results);
//       } else {
//         setFilteredProducts([]);
//       }
//     }
//   }, [products,p, page, limit]);
  
//   useEffect(() => {
//     if (p) {
//       setPage(1);
//       setLimit(10);
//     }
//   }, [p]);

  
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const handleNavigation = (newPage) => {
//     setPage(newPage);
//     router.push(`/products?search=${p}&page=${newPage}&limit=${limit}`, undefined, { shallow: true });
//   };


//   return (
//     <div>
//       <ul>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <li key={product._id}>
//               <h3>{product.title}</h3>
//               <p>Source: {product.source}</p>
//               <p>Content: {product.content}</p>
//               <p>Date: {product.date}</p>
//             </li>
//           ))
//         ) : (
//           <li>No relevant products found.</li>
//         )}
//       </ul>

//       <div className="btn-container">
//       {page > 1 && (
//         <div className="prev-btn nxpv-btn">
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
//         >
//         Next <i className="fa-solid fa-arrow-right"></i>
//       </button>
//       </div>
//       </div>
//     </div>
//   );
// }


// // useEffect(() => {
// //   if (p) {
// //     if (p && products.length > 0) {
// //       const keywords = p.toLowerCase().split(' ').filter(Boolean);

// //       const results = products.map(product => {
// //         const title = product.title.toLowerCase();
// //         const content = product.content.toLowerCase();
// //         let score = 0;
// //         keywords.forEach(keyword => {
// //           if (title.includes(keyword)) score += 2;
// //           if (content.includes(keyword)) score += 1;
// //         });

// //         return { ...product, score };
// //       }).filter(product => product.score >= keywords.length) // Filter products with score >= number of keywords
// //         .sort((a, b) => b.score - a.score);
      
// //       const offset = (page - 1) * limit;
// //       const paginatedData = results.slice(offset, offset + limit);
// //       setFilteredProducts(paginatedData);
// //       // setFilteredProducts(results);
// //     } else {
// //       setFilteredProducts([]);
// //     }
// //   }
// // }, [ products, p, page, limit]);

