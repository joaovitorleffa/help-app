import axios from 'axios';

const brasilApi = axios.create({ baseURL: 'https://brasilapi.com.br/api' });
const api = axios.create({ baseURL: 'http://localhost:3000' });

export { api, brasilApi };
