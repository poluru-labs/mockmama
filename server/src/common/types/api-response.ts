export type ApiListMeta = {
  dataset: string;
  resource: string;
  total: number;
  collectionKey?: string;
};

export type ApiListResponse<T> = {
  data: T;
  meta: ApiListMeta;
};

export type ApiItemResponse<T> = {
  data: T;
  meta: Pick<ApiListMeta, "dataset" | "resource">;
};