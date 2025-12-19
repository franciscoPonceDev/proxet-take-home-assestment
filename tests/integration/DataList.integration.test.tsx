import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataList } from "@/components/data-list/DataList";
import type { User } from "@/lib/usersApi";
import { PAGE_SIZE } from "@/lib/pagination";

const createMockUser = (index: number): User => {
  const id = index + 1;

  return {
    id: `user-${id}`,
    phoneNumber: `+1-555-000-${String(id).padStart(4, "0")}`,
    name: {
      first: `First${id}`,
      middle: "M",
      last: `Last${id}`,
    },
    location: {
      street: `Street ${id}`,
      city: "City",
      state: "State",
      country: "Country",
      zip: "00000",
    },
    job: {
      title: `JobTitle${id}`,
      descriptor: "Descriptor",
      area: "Area",
      type: "Type",
      company: `Company${id}`,
    },
  };
};

const createMockUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, index) => createMockUser(index));

const mockFetchSuccess = (users: User[]) => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ result: users }),
  } as unknown as Response);
};

const mockFetchFailure = () => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
    json: async () => ({}),
  } as unknown as Response);
};

describe("DataList integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders first PAGE_SIZE users and paginates to the next page", async () => {
    const mockUsers = createMockUsers(40);
    mockFetchSuccess(mockUsers);

    render(<DataList />);

    // Loading state appears first
    expect(
      screen.getByText(/Loading users/i)
    ).toBeInTheDocument();

    // Wait for loading to disappear and list to render
    await waitFor(() =>
      expect(
        screen.queryByText(/Loading users/i)
      ).not.toBeInTheDocument()
    );

    const userCardsPage1 = await screen.findAllByTestId(
      "user-card"
    );
    expect(userCardsPage1).toHaveLength(PAGE_SIZE);

    const firstUser = mockUsers[0];
    const firstUserFullName = `First1 M Last1`;
    const firstUserJob = `JobTitle1 at Company1`;
    const firstUserAddress =
      "Street 1, City, State, Country, 00000";

    const firstCard = userCardsPage1[0];
    expect(
      within(firstCard).getByText(firstUserFullName)
    ).toBeInTheDocument();
    expect(
      within(firstCard).getByText(firstUserJob)
    ).toBeInTheDocument();
    expect(
      within(firstCard).getByText(firstUserAddress)
    ).toBeInTheDocument();

    // Go to next page
    const nextButton = screen.getByRole("button", {
      name: /Next page/i,
    });
    await userEvent.click(nextButton);

    const userCardsPage2 = await screen.findAllByTestId(
      "user-card"
    );
    expect(userCardsPage2).toHaveLength(PAGE_SIZE);

    // Ensure first page's first user is no longer present
    expect(
      screen.queryByText(firstUserFullName)
    ).not.toBeInTheDocument();

    // Verify a user unique to page 2 is present
    const page2FirstUserFullName = "First21 M Last21";
    expect(
      screen.getByText(page2FirstUserFullName)
    ).toBeInTheDocument();
  });

  it("renders error state when the fetch fails", async () => {
    mockFetchFailure();

    render(<DataList />);

    expect(
      screen.getByText(/Loading users/i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.queryByText(/Loading users/i)
      ).not.toBeInTheDocument()
    );

    expect(
      screen.getByText(/Failed to load users/i)
    ).toBeInTheDocument();
  });
});


