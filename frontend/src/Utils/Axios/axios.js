import axios from 'axios'
import {base_url} from '../Constants/Constants'
export const axiosTMDB = axios.create({
    baseURL: base_url,
  });