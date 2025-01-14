import { http, HttpResponse } from 'msw';

const mockData = [
  { id: 1, item: 'product-mock-1' },
  { id: 2, item: 'product-mock-2' },
];

export const handlers = [
  http.get('/data/data.json', () => {
    return HttpResponse.json(mockData);
  }),
];
