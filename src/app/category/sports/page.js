import Sports from "@/app/_components/sports";

export default function SportsPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Sports initialPage={initialPage} initialLimit={initialLimit}/>
    </>
  )
}