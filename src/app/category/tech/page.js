import Tech from "@/app/_components/tech";

export default function TechPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Tech initialPage={initialPage} initialLimit={initialLimit} initialData={[]} />
    </>
  )
}