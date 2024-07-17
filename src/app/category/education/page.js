import Education from "../../_components/education";

export default function EducationPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <Education initialPage={initialPage} initialLimit={initialLimit} initialData={[]} />
    </>
  )
}