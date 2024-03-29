export interface IResponseWithPagination<T> {
  page: number;
  limit: number;
  totalCount: number;
  data: T[];
}
