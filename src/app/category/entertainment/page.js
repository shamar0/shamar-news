import CategoryPage from "@/app/_components/CategoryPage";

export default function EntertainmentPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <CategoryPage category={"Entertainment"} initialPage={initialPage} initialLimit={initialLimit}/>
    </>
  )
}