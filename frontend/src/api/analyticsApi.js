import http from './http';

export const fetchIndustrySummary = async () => {
  const { data } = await http.get('/analytics/industry-summary');
  return data.data;
};

export const fetchTopCompanies = async () => {
  const { data } = await http.get('/analytics/top-companies');
  return data.data;
};
