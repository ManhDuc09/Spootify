import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { toast } from 'react-toastify';
const apiUrl = 'http://localhost:8000/api';

const httpClient = async (url: string, options = {}) => {
  const [baseUrl, queryParams] = url.split('?');
  const formattedUrl = baseUrl//baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const finalUrl = queryParams ? `${formattedUrl}?${queryParams}` : formattedUrl;

  try {
    const response = await fetchUtils.fetchJson(finalUrl, options);
    return response;
  } catch (error: any) {
    const body = error?.body;


    let message = 'Something went wrong';
    if (typeof body === 'object' && body !== null) {
      const firstKey = Object.keys(body)[0];
      const firstValue = body[firstKey];

      if (Array.isArray(firstValue)) {
        message = `${firstKey}: ${firstValue[0]}`;
      } else if (typeof firstValue === 'string') {
        message = `${firstKey}: ${firstValue}`;
      } else if (typeof body.detail === 'string') {
        message = body.detail;
      }
    }

    toast.error(`API Error: ${message}`);
    throw error;
  }
};

const dataProvider = simpleRestProvider(apiUrl, httpClient);
export default dataProvider;