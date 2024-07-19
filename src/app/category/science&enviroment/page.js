import Science from "@/app/_components/science&enviroment";

export default function SciencePage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Science initialPage={initialPage} initialLimit={initialLimit} initialData={[]} />
    </>
  )
}