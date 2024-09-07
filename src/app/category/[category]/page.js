import CategoryPage from "@app/_components/CategoryPage";

export default function Category({ params, searchParams }) {
  const { category } = params;
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
      <CategoryPage category={category} initialPage={initialPage} initialLimit={initialLimit} />
    </>
  );
}
