import { customFetch } from './fetch';

import { Cookies } from 'react-cookie'
// MODOS API CONFIG
export const API_URL =
    process.env.NODE_ENV === 'production' ?
        'https://modos.isc.heia-fr.ch/api/v1':
        'https://modos.isc.heia-fr.ch/api/v1';

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
      apiLink: string;
    };
}

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

export const login = async (email, password): Promise<Response> => {
    return fetch(API_URL + "/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email": email, "password": password })
    });
}

export const loginAnonym = async (anonym_id): Promise<Response> => {
    return fetch(API_URL + "/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email": "anonym"+anonym_id+"@mail.com", "password": "" })
    });
}

export const getUser = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
    });
}

export const addAnonymUser = async (anonym_id): Promise<Response> => {
    return fetch(API_URL + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "pseudonym": "anonym"+anonym_id,
            "email": "anonym"+anonym_id+"@mail.com",
            "password": ""
          })
    });
}

export const addUser = async (pseudo,email,pass): Promise<Response> => {
    return fetch(API_URL + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "pseudonym": pseudo,
            "email": email,
            "password": pass
          })
    });
}

export const updateUser = async (username, email, password): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "pseudonym": username,
            "email": email,
            "password": password
          })
    });
}

export const getProfile = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/users/sofaProfile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
    });
}

export const setProfile = async (helper, ageRange): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/users/sofaProfile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "ageRange": ageRange,
            "helper": helper
          })
    });
}

export const setDisabledProfilesMask = async (disabledProfilesMask): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/users/sofaProfile/disabledProfilesMask", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "disabledProfilesMask": disabledProfilesMask
          })
    });
}

export const setHidePassModal = async (hidePassModal): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/users/sofaProfile/hidePassModal", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "hidePassModal": hidePassModal
          })
    });
}

export const getObservationsToLabelise = async (nb): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/observations/to_labelise/"+nb, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
    });
}

export const getObservationsToEvaluate = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + "/observations/to_evaluate", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
    });
}

export const getObservationsToValidate = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/observations/to_validate', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
    })
}

export const addLabelisationForObservation = async (observationId, obstacle, freeText): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/observationsLabelisations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
        body: JSON.stringify({
          "observation": observationId,
          "obstacle": obstacle,
          "freeText": freeText
        })
      })
}

export const addLabelisationsForObservation = async (observationId1, observationId2, observationId3, obstacle, freeText): Promise<Response> => {
  const token = new Cookies().get('token')
  return fetch(API_URL + '/observationsLabelisations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "observation1": observationId1,
        "observation2": observationId2,
        "observation3": observationId3,
        "obstacle": obstacle,
        "freeText": freeText
      })
    })
}


export const addEvaluationForObservation = async (observationId, noHelperVal, caneVal, walkerVal, wheelchairVal): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/observationsEvaluations', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "weightNoHelper": noHelperVal,
            "weightWhiteCane": caneVal,
            "weightWalker": walkerVal,
            "weightWheelchair": wheelchairVal,
            "observation": observationId
        })
    });
}

export const getEvaluationsForObservation = async (observationId): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/observations/'+observationId+'/evaluations', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
      })
}

export const addValidationForObservation = async (observationId, newWeight, oldWeight, weightOk): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/observationsValidations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
        body: JSON.stringify({
          "newWeight": newWeight>0?newWeight:oldWeight,
          "observation": observationId,
          "oldWeight": oldWeight,
          "weightOk": weightOk
        })
      })
}

export const getMenu = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/menu', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
    })
}


export const getApiBase = (): string => {
    return API_URL
}

export const getEvaluationsForUser = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/users/evaluations', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
      })
}

export const getValidationsForUser = async (): Promise<Response> => {
    const token = new Cookies().get('token')
    return fetch(API_URL + '/users/validations', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + token
        },
      })
}

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

  export const getItineraryForProfile = async (
    origin: [number, number],
    destination: [number, number],
    profile: string,
    weights: [number,number,number,number,number],
    waypoints?: [[number, number]],

  ) => {
    try {
      let buildRequest = `${API_URL}/itinerary/simpleProfile`;
      buildRequest += `?origin=${origin[0]},${origin[1]}`;
      buildRequest += `&destination=${destination[0]},${destination[1]}`;
      buildRequest += `&profile=${profile}`;
      buildRequest += `&weightsStr=${weights[0]},${weights[1]},${weights[2]},${weights[3]},${weights[4]}`;
  
      if (waypoints) {
        // TODO: Maybe in the future we want to implements the possibility to have waypoints
      }
  
      return await customFetch(new Request(buildRequest, { method: 'GET' }));
    } catch (err) {
      console.error(err);
      throw new Error('can not load itinerary');
    }
  };

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
  export const getObservationByOwnerEvent = async (
    eventID: number
  ): Promise<IObservation[]> => {
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