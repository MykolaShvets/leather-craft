export interface IPaginationResponse<T> {
  page: number;
  limit: number;
  totalCount: number;
  data: T[] | null;
}
