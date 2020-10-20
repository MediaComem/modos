import { customFetch } from './fetch';

// MODOS API CONFIG
const API_URL =
  process.env.NODE_ENV === 'production' ?
    'https://modos.heig-vd.ch/api/v1' :
    'http://localhost:3000/api/v1';

export enum OBSTACLES_TYPE {
  COATING = 'coating',
  OBSTACLE = 'obstacle',
  SECURITY = 'security',
  PASSABILITY = 'passability',
  SLOPE = 'slope',
  WIDTH = 'width',
  OTHER = 'other',
  NOPROBLEM = 'noproblem',
  UNLABELLED = 'unlabelled'
}

export enum IMPACT {
  UNKNOWN,
  WEAK,
  MODERATE,
  MARKED,
  SEVERE,
  BLOCKING
}

export interface IObservation {
  id: number;
  description: {
    obstacle: OBSTACLES_TYPE;
    freeText: string;
    impact: IMPACT;
  };
  owner?: {
    id: number;
    email?: string;
    pseudonym?: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  image: {
    basename: string;
    height: number | null;
    width: number | null;
  };
}

/**
 *
 * @returns All the observations of the modos api
 */
export const getObservations = async (): Promise<IObservation[]> => {
  try {
    // uncomment the code below to test with the example asset
    // return await customFetch('/example-observations.json');

    return await customFetch(
      new Request(`${API_URL}/observations`, {
        method: 'GET'
      })
    );
  } catch (err) {
    console.error(err);
    throw new Error('can not load observations');
  }
};

/**
 * Get all the observation from an event trough participant
 * @param eventID a number which is the eventID
 */
export const getObservationByOwnerEvent = async (eventID: number): Promise<IObservation[]> => {
  try {
    return await customFetch(
      new Request(`${API_URL}/observations/event-participants/${eventID}`, {
        method: 'GET'
      })
    );
  } catch (err) {
    console.error(err);
    throw new Error('can not load observations');
  }
};

/**
 *
 * @returns All the observations of the modos api
 */
export const getEvents = async (): Promise<any[]> => {
  try {
    return await customFetch(
      new Request(`${API_URL}/events`, {
        method: 'GET'
      })
    );
  } catch (err) {
    console.error(err);
    throw new Error('can not load events');
  }
};

export const getSimpleItinerary = async (
  origin: [number, number],
  destination: [number, number],
  waypoints?: [[number, number]]
) => {
  try {
    let buildRequest = `${API_URL}/itinerary/simple`;
    buildRequest += `?origin=${origin[0]},${origin[1]}`;
    buildRequest += `&destination=${destination[0]},${destination[1]}`;

    if (waypoints) {
      // TODO: Maybe in the future we want to implements the possibility to have waypoints
    }

    return await customFetch(new Request(buildRequest, { method: 'GET' }));
  } catch (err) {
    console.error(err);
    throw new Error('can not load itinerary');
  }
};
