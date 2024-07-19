import Entertainment from "@/app/_components/entertainment";

export default function EntertainmentPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Entertainment initialPage={initialPage} initialLimit={initialLimit} initialData={[]} />
    </>
  )
}