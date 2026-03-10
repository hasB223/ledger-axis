import http from './http';

export const fetchCompanies = async (params) => {
  const { data } = await http.get('/companies', { params });
  return data.data;
};

export const searchCompanies = async (params) => {
  const { data } = await http.get('/companies/search', { params });
  return data.data;
};

export const fetchCompany = async (id) => {
  const { data } = await http.get(`/companies/${id}`);
  return data.data;
};

export const fetchCompanyDirectors = async (id) => {
  const { data } = await http.get(`/companies/${id}/directors`);
  return data.data;
};
