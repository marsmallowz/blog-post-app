import { useRouter, useSearchParams } from "next/navigation";

const useUserRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: { [key: string]: string | any } = {};
  let page = searchParams.get("page");
  let search = searchParams.get("search");

  if (page) query.page = parseInt(page);
  if (search) query.search = search;

  const pushQuery = ({ search, page }: { search?: string; page?: number }) => {
    if (search !== undefined) {
      search === "" ? delete query.search : (query.search = search);
    }
    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }
    const newQuery = new URLSearchParams(query).toString();
    router.push(`?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useUserRouter;
