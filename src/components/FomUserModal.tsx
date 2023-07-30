"use client";

import { createUser, deleteUser, updateUser } from "@/actions/users";
import { useUserModalContext } from "@/context/UserModalProvider";
import { useRef, useTransition } from "react";

export default function FormUserModal() {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();
  const { user, setMode, mode } = useUserModalContext();

  const genders = [
    {
      id: "male",
      name: "Male",
    },
    {
      id: "female",
      name: "Female",
    },
  ];

  const status = [
    {
      id: "active",
      name: "Active",
    },
    {
      id: "inactive",
      name: "Inactive",
    },
  ];
  async function handleCreateUser(formData: any) {
    const name: string = formData.get("name");
    const email: string = formData.get("email");
    const gender: string = formData.get("gender");
    const status: string = formData.get("status");

    startTransition(async () => {
      await createUser({ name, email, gender, status });
      await formRef.current.reset();
      setMode(null);
    });
  }

  async function handleUpdateUser(formData: any) {
    const name: string = formData.get("name");
    const email: string = formData.get("email");
    const gender: string = formData.get("gender");
    const status: string = formData.get("status");

    startTransition(async () => {
      if (user !== null) {
        await updateUser({ id: user.id, name, email, gender, status });
      }
      await formRef.current.reset();
      setMode(null);
    });
  }

  async function handleDeleteUser() {
    startTransition(async () => {
      if (user !== null) {
        await deleteUser(user.id);
      }
      await formRef.current.reset();
      setMode(null);
    });
  }

  return (
    <div className={`${mode ? "relative" : "hidden"} z-10`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <form
            action={
              mode === "CREATE"
                ? handleCreateUser
                : mode === "UPDATE"
                ? handleUpdateUser
                : mode === "DELETE"
                ? handleDeleteUser
                : undefined
            }
            ref={formRef}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg"
          >
            <div className="bg-white p-6 pb-4">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900 ">
                {mode === "CREATE"
                  ? "Create User"
                  : mode === "UPDATE"
                  ? "Update User"
                  : mode === "DELETE"
                  ? "Delete User"
                  : null}
              </h3>
              {mode === "CREATE" || mode === "UPDATE" ? (
                <div className="flex flex-col mx-auto gap-5 mt-3">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-1 ">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={user?.name}
                        required
                        className="border-2 p-2 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={user?.email}
                        required
                        className="border-2 p-2 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Gender
                    </label>
                    <div className="mt-1 bg-slate-100">
                      <select
                        id="gender"
                        name="gender"
                        defaultValue={user?.gender}
                        required
                        className="block w-full px-2 py-3 border-2 text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-100 "
                      >
                        <option key={""} value={""} className="text-lg">
                          Choose an option
                        </option>
                        {genders.map((gender: { id: string; name: string }) => {
                          return (
                            <option
                              key={gender.id}
                              value={gender.id}
                              className="text-lg"
                            >
                              {gender.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Status
                    </label>
                    <div className="mt-1 bg-slate-100">
                      <select
                        id="status"
                        name="status"
                        defaultValue={user?.status}
                        required
                        className="block w-full px-2 py-3 border-2 text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-100 "
                      >
                        <option key={""} value={""} className="text-lg">
                          Choose an option
                        </option>
                        {status.map((status: { id: string; name: string }) => {
                          return (
                            <option
                              key={status.id}
                              value={status.id}
                              className="text-lg"
                            >
                              {status.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}

              {mode === "DELETE" ? (
                <div className="mt-3">
                  Are you sure want to delete user {user?.name} ?
                </div>
              ) : null}
            </div>
            <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
              <button
                disabled={isPending}
                type="submit"
                className="mt-3 ml-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 sm:mt-0 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-400 "
              >
                {isPending
                  ? "Loading..."
                  : mode === "CREATE"
                  ? "Create"
                  : mode === "UPDATE"
                  ? "Update"
                  : mode === "DELETE"
                  ? "Delete"
                  : null}
              </button>
              <button
                onClick={async () => {
                  setMode(null);
                  await formRef.current.reset();
                }}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
