import { Request, Response } from "express";
import { createAsyncRoute, validate } from "./utils";
import { getRepository, getManager } from "typeorm";
import { Event } from "../entity/Event";
import { sendError } from "./ErrorController";

enum ItineraryError {
  ITINERARY_NO_ORIGIN_OR_DEST = 'No origin or destination provided for the itinerary',
  BAD_COORDINATE = 'Bad coordinate given'
}

/**
 * extract a latitude and longitude given in a string of this format:
 * example: "41.43206,-81.38992" will return [ 41.43206, -81.38992 ]
 * @param query a string of the format given above
 * @returns an array of two number corresponding to [lat, long]
 */
const extractLatLongFromQuery = (query: string): [number, number] => {
  
  if(query.split(',').length < 2 || query.split(',').length > 2){
    throw new Error(ItineraryError.BAD_COORDINATE);
  }

  return query.split(',').map(val=>Number.parseFloat(val)) as [number, number]
}

export class ItineraryControler {

  public getSimpleItinerary = createAsyncRoute(async (req, res) => {
    const {origin, destination, waypoints} = req.query as {
      origin:string, destination:string, waypoints?: string[]};

    if(!origin || !destination){
      return sendError(res, 400, ItineraryError.ITINERARY_NO_ORIGIN_OR_DEST)
    }

    try{
      const [originLat, originLont] = extractLatLongFromQuery(origin);
      const [destinationLat, destinationLont] = extractLatLongFromQuery(destination);

      return res.json(JSON.parse(`
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                ${originLont},
                ${originLat}
              ],              
              [
                ${destinationLont},
                ${destinationLat}
              ]
            ]
          }
        }
      ]
    }    
    `));
    }catch(err){
      console.error(err);
      return sendError(res, 400, ItineraryError.BAD_COORDINATE)
    }
    
  });
}
