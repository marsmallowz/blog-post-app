import PaginationUsers from "@/components/PaginationUsers";
import SearchForm from "@/components/SearchForm";
import UserCreateBtn from "@/components/UserCreateBtn";
import UserDeleteBtn from "@/components/UserDeleteBtn";
import UserUpdateBtn from "@/components/UserUpdateBtn";
import { User } from "@/model/user";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

async function getUsers(page: number, search: string) {
  if (search === undefined) {
    search = "";
  }
  if (page === undefined) {
    page = 1;
  }
  const res = await fetch(
    `https://gorest.co.in/public/v2/users?name=${search}&page=${page}&per_page=10&access-token=` +
      process.env.NEXT_PUBLIC_DATA_TOKEN,
    {
      // next: { revalidate: 10 },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();

  return {
    users: result,
    totalPages: parseInt(res.headers.get("x-pagination-pages") || "5"),
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number; search: string };
}) {
  const { users, totalPages } = await getUsers(
    searchParams.page,
    searchParams.search
  );

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold pb-2">List User</div>
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <SearchForm />
        <UserCreateBtn />
      </div>
      {users.length ? (
        <div className="flex flex-col divide-y-2 mt-3">
          {users.map((user: User) => {
            return (
              <div
                key={user.id}
                className="flex py-2 items-center justify-between text-sm sm:text-base"
              >
                <div className="flex flex-col gap-1 w-10/12 sm:w-auto">
                  <div className="flex gap-2">
                    <div className="font-medium">{user.name}</div>
                    <div className="flex justify-center items-center">
                      {user.gender === "male" ? (
                        <BsGenderMale />
                      ) : (
                        <BsGenderFemale />
                      )}
                    </div>
                  </div>
                  <div className="truncate">{user.email}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-center items-center w-2/12 sm:w-auto">
                  <UserUpdateBtn user={user} />
                  <UserDeleteBtn user={user} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Users not found</div>
      )}
      <PaginationUsers totalPages={totalPages} />
    </div>
  );
}
