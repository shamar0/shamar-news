import "./globals.css";

export default function SecondLoading() {
  const renderSkeletons = () =>{
    const skeletons = [];
    for(let i=0; i<2; i++){
      skeletons.push(
        <div key={i} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text mt-2">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short mt-2"></div>
          <div className="skeleton-line skeleton-line-content mt-2"></div>
        </div>
      </div>
      )
    }
    return skeletons;
  }
  return (
    <>
     {renderSkeletons()}
    </>
  );
} 