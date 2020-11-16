import { Request, Response } from 'express';
import { createAsyncRoute, validate } from './utils';
import { getRepository, getManager, getConnection } from 'typeorm';
import { Event } from '../entity/Event';
import { sendError } from './ErrorController';

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
    if (query.split(',').length < 2 || query.split(',').length > 2) {
        throw new Error(ItineraryError.BAD_COORDINATE);
    }

    return query.split(',').map(val => Number.parseFloat(val)) as [
        number,
        number
    ];
};

/*
 * Existing SQL function to calc route
 * mds_shortest_routing(text,text)
 * --> select ST_AsGeoJSON(mds_simple_routing('POINT(45 64.7)','POINT(45 64.7)'))
 *
 * mds_simple_routing(text,text)
 * mds_weighted_routing(text,text,real[])
 */

export class ItineraryControler {
    public getSimpleItinerary = createAsyncRoute(async (req, res) => {
        const { origin, destination, waypoints } = req.query as {
            origin: string;
            destination: string;
            waypoints?: string[];
        };

        if (!origin || !destination) {
            return sendError(
                res,
                400,
                ItineraryError.ITINERARY_NO_ORIGIN_OR_DEST
            );
        }

        try {
            const [originLat, originLong] = extractLatLongFromQuery(origin);
            const [destinationLat, destinationLong] = extractLatLongFromQuery(
                destination
            );

            const queryResult = await getConnection().query(
                `SELECT 
                    json_build_object(
                    'type',
                    'FeatureCollection',
                    'features',
                    json_agg(
                        ST_AsGeoJSON(s_r.*)::json
                    )
                    ) as simpleroute
                FROM (
                        SELECT simple_routes.route_geom 
                        FROM mds_simple_routing(
                            'POINT(' || $1 || ' ' || $2 || ')',
                            'POINT(' || $3 || ' ' || $4 || ')'
                        ) AS simple_routes(geom)
                    ) AS s_r
            `,
                [originLong, originLat, destinationLong, destinationLat]
            );

            if (!queryResult[0])
                return res.send({ type: 'Feature', geometry: [] });
            if (!queryResult[0].simpleroute.features)
                return res.send({ type: 'Feature', geometry: [] });

            return res.send(queryResult[0].simpleroute);
        } catch (err) {
            console.error(err);
            return sendError(res, 400, ItineraryError.BAD_COORDINATE);
        }
    });
}
