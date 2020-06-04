export interface TableListItem {
  _id: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  metNumber: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: {
    [_id: string]: string;
  };
  filter?: {
    [_id: string]: React.ReactText[];
  };
  status?: string;
  name?: string;
  desc?: string;
  _id?: number;
  status?: number;
  pageSize?: number;
  currentPage?: number;
}
