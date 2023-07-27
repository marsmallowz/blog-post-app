import { useRouter, useSearchParams } from "next/navigation";

const useCustomeRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: { [key: string]: string | any } = {};
  let page = searchParams.get("page");

  if (page) query.page = parseInt(page);

  const pushQuery = ({ page }: { page?: number }) => {
    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }
    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useCustomeRouter;
