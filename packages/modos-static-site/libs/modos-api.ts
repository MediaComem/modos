import { customFetch } from './fetch';

// MODOS API CONFIG
const API_URL =
  process.env.NODE_ENV === 'production' ?
    'https://modos.heig-vd.ch/api/v1' :
    'http://localhost:3000/api/v1';

// const API_TOKEN =
//   process.env.NODE_ENV === 'production' ?
//     '' :
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU5NzE1NDQyMSwiZXhwIjoxNTk3MTU4MDIxfQ.qsZgo5od7vZAEHIFnbyCn3Crem2_eqbt_XkX2DVkUpI';

/**
 *
 * @returns All the observations of the modos api
 */
export const getObservations = async () => {
  try {
    // uncomment the code below to test with the example asset
    // return await customFetch(`/example-observations.json`);

    return await customFetch(
      new Request(`${API_URL}/observations`, {
        method: 'GET'
        // headers: new Headers({ Authorization: `Bearer ${API_TOKEN}` })
      })
    );
  } catch (err) {
    console.error(err);
    throw new Error('can not load observations');
  }
};

export const getSimpleItinerary = async (origin: [number, number], destination: [number, number], waypoints?: [[number, number]]) => {
  try {
    let buildRequest = `${API_URL}/itinerary/simple`;
    buildRequest += `?origin=${origin[0]},${origin[1]}`;
    buildRequest += `&destination=${destination[0]},${destination[1]}`;

    if (waypoints) {
      // TODO: Maybe in the future we want to implements the possibility to have waypoints
    }

    return await customFetch(
      new Request(buildRequest, { method: 'GET' })
    );

  } catch (err) {
    console.error(err);
    throw new Error('can not load itinerary');
  }
};
