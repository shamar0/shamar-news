import CategoryPage from "@/app/_components/CategoryPage";

export default function SportsPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <CategoryPage category={"IT"} initialPage={initialPage} initialLimit={initialLimit}/>
    </>
  )
}