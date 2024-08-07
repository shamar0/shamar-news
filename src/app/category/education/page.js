import CategoryPage from "@/app/_components/CategoryPage";

export default function EducationPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <CategoryPage category={"Education"} initialPage={initialPage} initialLimit={initialLimit}/>
    </>
  )
}