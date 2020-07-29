import { customFetch } from './fetch';

const API_URL = process.env.API_URL && '';
const API_TOKEN = process.env.API_TOKEN && '';


export const getObservations = async () => {

  try {
    return await customFetch('/example-observations.json');
  } catch (err) {
    console.error(err);
    throw new Error('can not load observations');
  }

};
