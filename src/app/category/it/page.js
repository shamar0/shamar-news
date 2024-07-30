import IT from "@/app/_components/it";

export default function SportsPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <IT initialPage={initialPage} initialLimit={initialLimit}/>
    </>
  )
}