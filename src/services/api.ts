// import { API, BRASIL_API } from '@env';
import axios from 'axios';

const brasilApi = axios.create({ baseURL: 'https://brasilapi.com.br/api' });
const api = axios.create({ baseURL: 'http://137.184.159.242/' });

export { api, brasilApi };
