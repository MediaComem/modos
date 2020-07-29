import { customFetch } from './fetch';
import proj4 from 'proj4';
import centroid from '@turf/centroid';
import { getCoord } from '@turf/invariant';

const API_URL = 'https://mapnv.ch';

export interface IMapnvAPIResult {
  type: string;
  features: IMapnvFeature[];
}

export interface IMapnvFeature {
  bbox: [];
  geometry: { coordinates: []; type: string };
  properties: { label: string };
}

/**
 *
 * @param searchedLocation
 * @param limit
 * @returns
 */
export const geocode = async (
  searchedLocation,
  limit?
): Promise<IMapnvAPIResult> => {
  try {
    const res = await customFetch(
      `${API_URL}/search?interface=api&limit=${
        limit ? limit : 5
      }&query=${encodeURI(searchedLocation)}`
    );

    return res;
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param coordinate
 */
export const translateSwissGridCoordinateToLatLng = geojson => {
  // Define EPSG:2056 projection
  proj4.defs(
    'EPSG:2056',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
  );

  try {
    const centroidOfInput = centroid(geojson);
    const res = proj4('EPSG:2056', 'WGS84', getCoord(centroidOfInput));
    return { lat: res[1], lng: res[0] };
  } catch (err) {
    console.error(err);
    return null;
  }
};
