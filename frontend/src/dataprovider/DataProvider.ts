import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = 'http://localhost:8000/api';

const httpClient = (url: string, options = {}) => {
  // Split URL from query parameters
  const [baseUrl, queryParams] = url.split('?');
  
  // Add trailing slash to base URL if needed
  const formattedUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  // Recombine with query parameters if they exist
  const finalUrl = queryParams ? `${formattedUrl}?${queryParams}` : formattedUrl;
  
  return fetchUtils.fetchJson(finalUrl, options);
};

const dataProvider = simpleRestProvider(apiUrl, httpClient);
export default dataProvider;