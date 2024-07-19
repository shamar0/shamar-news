import Politics from "@/app/_components/politics";

export default function SportsPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Politics initialPage={initialPage} initialLimit={initialLimit} initialData={[]} />
    </>
  )
}