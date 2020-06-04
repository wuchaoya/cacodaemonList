import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function query(params?: TableListParams) {
  return request('/api/find', {
    params,
  });
}

export async function remove(params: { key: number[] }) {
  return request('/api/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function add(params: TableListItem) {
  return request('/api/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function forgive(params: {ids: [number], status: number}) {
  return request('/api/updateMany', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
