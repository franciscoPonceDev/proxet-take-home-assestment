export const PAGE_SIZE = 20

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  if (page < 1) return []
  if (pageSize <= 0) return []

  const startIndex = (page - 1) * pageSize
  if (startIndex >= items.length) return []

  const endIndex = startIndex + pageSize
  return items.slice(startIndex, endIndex)
}

export function getTotalPages(
  totalItems: number,
  pageSize: number
): number {
  if (totalItems <= 0) return 0
  if (pageSize <= 0) return 0

  return Math.ceil(totalItems / pageSize)
}


