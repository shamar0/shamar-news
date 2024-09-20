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