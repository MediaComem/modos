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
                6.655311584472656,
                46.76561795060025
              ],
              [
                6.65745735168457,
                46.76761686478674
              ],
              [
                6.655912399291992,
                46.770144797089856
              ],
              [
                6.6542816162109375,
                46.76902781837645
              ],
              [
                6.652908325195312,
                46.76949812802643
              ],
              [
                6.650676727294922,
                46.77143811192456
              ],
              [
                6.647672653198242,
                46.77614081316511
              ],
              [
                6.64372444152832,
                46.77766910264888
              ],
              [
                6.6423726081848145,
                46.778007083889214
              ],
              [
                6.641793251037598,
                46.77853609374561
              ],
              [
                6.64271593093872,
                46.77991737275668
              ],
              [
                6.642458438873291,
                46.780387587314046
              ],
              [
                6.640892028808594,
                46.78106351354584
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
