import { Request, Response } from "express";
import { createAsyncRoute, validate } from "./utils";
import { getRepository, getManager } from "typeorm";
import { Event } from "../entity/Event";
import { sendError } from "./ErrorController";

enum ItineraryError {
  ITINERARY_NO_ORIGIN_OR_DEST = 'No origin or destination provided for the itinerary'
}

export class ItineraryControler {
  /**
   *
   */
  public getItinerary = createAsyncRoute(async (req, res) => {
    const {origin, destination, waypoints} = req.body;

    if(!origin || !destination){
      return sendError(res, 400, ItineraryError.ITINERARY_NO_ORIGIN_OR_DEST)
    }

    return res.json(null);
  });
}
