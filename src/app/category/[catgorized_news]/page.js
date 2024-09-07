import CategoryPage from "@app/_components/CategoryPage";

export default function Category({ params, searchParams }) {
  const { categorized_news } = params;
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
      <CategoryPage category={categorized_news} initialPage={initialPage} initialLimit={initialLimit} />
    </>
  );
}
