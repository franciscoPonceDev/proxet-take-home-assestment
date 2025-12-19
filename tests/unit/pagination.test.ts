import { describe, expect, it } from "vitest";
import {
  PAGE_SIZE,
  getTotalPages,
  paginateItems,
} from "@/lib/pagination";

describe("paginateItems", () => {
  const items = Array.from({ length: 100 }, (_, index) => index + 1);

  it("returns first PAGE_SIZE items for page 1", () => {
    const pageItems = paginateItems(items, 1, PAGE_SIZE);
    expect(pageItems).toHaveLength(PAGE_SIZE);
    expect(pageItems[0]).toBe(1);
    expect(pageItems[PAGE_SIZE - 1]).toBe(PAGE_SIZE);
  });

  it("returns next PAGE_SIZE items for page 2", () => {
    const pageItems = paginateItems(items, 2, PAGE_SIZE);
    expect(pageItems).toHaveLength(PAGE_SIZE);
    expect(pageItems[0]).toBe(PAGE_SIZE + 1);
    expect(pageItems[PAGE_SIZE - 1]).toBe(PAGE_SIZE * 2);
  });

  it("returns empty array when page is less than 1", () => {
    const pageItems = paginateItems(items, 0, PAGE_SIZE);
    expect(pageItems).toEqual([]);
  });

  it("returns empty array when pageSize is not positive", () => {
    const zeroSizeItems = paginateItems(items, 1, 0);
    const negativeSizeItems = paginateItems(items, 1, -5);
    expect(zeroSizeItems).toEqual([]);
    expect(negativeSizeItems).toEqual([]);
  });

  it("returns empty array when page exceeds available pages", () => {
    const pageItems = paginateItems(items, 999, PAGE_SIZE);
    expect(pageItems).toEqual([]);
  });

  it("handles empty items array", () => {
    const pageItems = paginateItems([], 1, PAGE_SIZE);
    expect(pageItems).toEqual([]);
  });
});

describe("getTotalPages", () => {
  it("returns 0 for non-positive totalItems", () => {
    expect(getTotalPages(0, PAGE_SIZE)).toBe(0);
    expect(getTotalPages(-10, PAGE_SIZE)).toBe(0);
  });

  it("returns 0 for non-positive pageSize", () => {
    expect(getTotalPages(100, 0)).toBe(0);
    expect(getTotalPages(100, -5)).toBe(0);
  });

  it("calculates total pages correctly with remainder", () => {
    expect(getTotalPages(40, PAGE_SIZE)).toBe(2);
    expect(getTotalPages(41, PAGE_SIZE)).toBe(3);
  });
});


