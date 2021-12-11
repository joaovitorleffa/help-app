export interface Pagination<T> {
  results: T[];
  total: number;
  page_total: number;
  current_page: number;
}
