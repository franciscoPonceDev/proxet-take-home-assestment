"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchUsers, type User } from "@/lib/usersApi";

export interface UseUsersDataResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const useUsersData = (): UseUsersDataResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedUsers = await fetchUsers();
      setUsers(loadedUsers);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error while fetching users";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  return {
    users,
    isLoading,
    error,
    retry: loadUsers,
  };
};


