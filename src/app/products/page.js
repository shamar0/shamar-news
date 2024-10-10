import Search from "../_components/Search";

export default async function NewsPage({ searchParams }) {
  const search = searchParams.search || '';
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 5;
  
  return (
    <>
    <Search initialPage={initialPage} initialLimit={initialLimit} search={search}/>
    </>
  );
}