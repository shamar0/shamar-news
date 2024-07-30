import Business from "@/app/_components/business";

export default function StartupPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Business initialPage={initialPage} initialLimit={initialLimit}/>
    </>
  )
}