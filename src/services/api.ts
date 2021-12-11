import { API, BRASIL_API } from '@env';
import axios from 'axios';

const brasilApi = axios.create({ baseURL: BRASIL_API });
const api = axios.create({ baseURL: API });

export { api, brasilApi };
