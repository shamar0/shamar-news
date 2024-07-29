import PageClient from "../_components/pageClient";

export default async function NewsPage({ searchParams }) {
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
    <PageClient initialPage={initialPage} initialLimit={initialLimit} initialData={[]} />
    </>
  );
}