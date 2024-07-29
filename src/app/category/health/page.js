import Health from "@/app/_components/health";

export default function HealthPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Health initialPage={initialPage} initialLimit={initialLimit} initialData={[]}/>
    </>
  )
}