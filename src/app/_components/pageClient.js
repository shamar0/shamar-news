'use client'; 
import Home from "./home";
import Loading from "../loading";
import '../../../public/style.css'
import useNewsData from "../hooks/useNewsData";

export default function PageClient({ initialPage, initialLimit }) {
  const { page, filteredData, loading, noMoreData, handleNavigation } = useNewsData(initialPage, initialLimit);

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