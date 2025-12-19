"use client";

import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE, getTotalPages, paginateItems } from "@/lib/pagination";
import { useUsersData } from "./useUsersData";

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
            className="rounded border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
          >
            <div className="font-medium text-slate-900">
              {user.name.first}{" "}
              {user.name.middle ? `${user.name.middle} ` : ""}
              {user.name.last}
            </div>
            <div className="text-sm text-slate-700">
              {user.job.title} at {user.job.company}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {user.location.street}, {user.location.city},{" "}
              {user.location.state}, {user.location.country},{" "}
              {user.location.zip}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          aria-disabled={currentPage <= 1}
          className="rounded border border-slate-300 px-3 py-1 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-slate-700">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          type="button"
          onClick={() =>
            setCurrentPage((page) =>
              page < totalPages ? page + 1 : page
            )
          }
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          aria-disabled={currentPage >= totalPages}
          className="rounded border border-slate-300 px-3 py-1 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};


