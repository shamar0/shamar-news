import Trending from "@/app/_components/trending";

export default function TrendingPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Trending initialPage={initialPage} initialLimit={initialLimit} initialData={[]}/>
    </>
  )
}