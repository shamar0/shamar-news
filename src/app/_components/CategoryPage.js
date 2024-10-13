'use client';
import Home from "./home";
import Loading from "../loading";
import '../../../public/style.css'
import useNewsData from "../hooks/useNewsData";
import { useEffect, useState } from "react";
import SecondLoading from "../second_loading";

export default function CategoryPage({category, initialPage, initialLimit}) {
  const { page, filteredData, loading, noMoreData, handleNavigation } = useNewsData(initialPage, initialLimit, category);
  // State to track initial loading status
  const [initialLoading, setInitialLoading] = useState(true);

  // Track initial loading and set it to false once initial data is fetched
  useEffect(() => {
    if (filteredData.length > 0 || !loading) {
      setInitialLoading(false);
    }
  }, [filteredData, loading]);

  return (
    <div>
      {/* Show initial skeleton loading if the component is first loaded and no data is available yet */}
      {initialLoading ? (
        <Loading />
      ) : (
        <>
          {/* Render the already loaded data */}
          <Home data={filteredData} />

          {/* Show skeletons only for new data loading */}
          {loading && filteredData.length > 0 && (
            <SecondLoading/>
          )}

          {/* Show Load More button only if there is more data to load */}
          {!noMoreData && !loading ? (
            <div className="btn-container">
              <div className="next-btn nxpv-btn">
                <button
                  className="btn load-more"
                  onClick={() => handleNavigation(page + 1)}
                >
                  Load More
                </button>
              </div>
            </div>
          ) : (
            <h3 style={{ color: "#F7941F", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
              No more data found!
            </h3>
          )}
        </>
      )}
    </div>
  );

}