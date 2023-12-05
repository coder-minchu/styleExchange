import axios from 'axios';
import {BASE_URL} from './BaseUrl';

export const get = async (endpoint, queryParams = {}, headers = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: queryParams,
      headers: {'Content-Type': 'application/json'},
    });
    return response.data;
  } catch (error) {
    console.log('error.. ', error)
  }
};

export const post = async (endpoint, data = {}, headers = {}) => {
  try {
    const authHeaders = setBasicAuthHeaders();
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {...headers, ...authHeaders},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (endpoint, data = {}, headers = {}) => {
  try {
    const authHeaders = setBasicAuthHeaders();
    const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
      headers: {...headers, ...authHeaders},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const remove = async (endpoint, headers = {}) => {
  try {
    const authHeaders = setBasicAuthHeaders();
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      headers: {...headers, ...authHeaders},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
