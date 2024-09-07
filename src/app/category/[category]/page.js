import {CategoryPage} from "@/app/_components/categoryPage";

export default function DynamicCategoryPage({ params, searchParams }) {
  const { category } = params;
  const initialPage = parseInt(searchParams.page) || 1;
  const initialLimit = parseInt(searchParams.limit) || 10;
  
  return (
    <>
      <CategoryPage category={category} initialPage={initialPage} initialLimit={initialLimit} />
    </>
  );
}
