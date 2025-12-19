"use client";

import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE, getTotalPages, paginateItems } from "@/lib/pagination";
import { useUsersData } from "./useUsersData";
import { UserCard } from "./UserCard";
import { PaginationControls } from "./PaginationControls";

export const DataList = () => {
  const { users, isLoading, error, retry } = useUsersData();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => getTotalPages(users.length, PAGE_SIZE),
    [users.length]
  );

  const paginatedUsers = useMemo(
    () => paginateItems(users, currentPage, PAGE_SIZE),
    [users, currentPage]
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <section
        aria-busy="true"
        aria-live="polite"
        className="py-8 text-center"
      >
        <p className="text-slate-600">Loading users...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        aria-live="polite"
        className="space-y-4 py-8 text-center"
      >
        <p className="text-red-600">Failed to load users: {error}</p>
        <button
          type="button"
          onClick={retry}
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Retry
        </button>
      </section>
    );
  }

  if (!users.length) {
    return (
      <section aria-live="polite" className="py-8 text-center">
        <p className="text-slate-600">No users found.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <ul
        className="space-y-2"
        aria-label="User list"
      >
        {paginatedUsers.map((user) => (
          <li
            key={user.id}
            data-testid="user-card"
          >
            <UserCard user={user} />
          </li>
        ))}
      </ul>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

