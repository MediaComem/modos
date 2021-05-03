import { Request, Response } from 'express';
import { createAsyncRoute } from './utils';
import { getConnection } from 'typeorm';
import { sendError } from './ErrorController';

enum ItineraryError {
    ITINERARY_NO_ORIGIN_OR_DEST = 'No origin or destination provided for the itinerary',
    BAD_COORDINATE = 'Bad coordinate given',
    MISSING_WEIGHTS = 'Missing weights'
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

export class ItineraryControler {
    public getSimpleItinerary = createAsyncRoute(
        async (req: Request, res: Response) => {
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
                const [
                    destinationLat,
                    destinationLong
                ] = extractLatLongFromQuery(destination);

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
        }
    );

    public getItineraryForProfile = createAsyncRoute(
        async (req: Request, res: Response) => {
            const { origin, destination, waypoints, profile, weightsStr } = req.query as {
                origin: string;
                destination: string;
                waypoints?: string[];
                profile: string;
                weightsStr: string;
            };

            if (!origin || !destination) {
                return sendError(
                    res,
                    400,
                    ItineraryError.ITINERARY_NO_ORIGIN_OR_DEST
                );
            }

            var weights = [0,0,0,0,0];
            if (weightsStr.split(',').length != 5) {
                throw new Error(ItineraryError.MISSING_WEIGHTS);
            }
            for(var i=0; i<5; i++){
                weights[i] = Number.parseFloat(weightsStr.split(',')[i]);
            }
            

            try {
                const [originLat, originLong] = extractLatLongFromQuery(origin);
                const [
                    destinationLat,
                    destinationLong
                ] = extractLatLongFromQuery(destination);

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
                        FROM mds_simple_mobility_routing(
                            'POINT(' || $1 || ' ' || $2 || ')',
                            'POINT(' || $3 || ' ' || $4 || ')',
                            ARRAY [$5, $6, $7, $8, $9, $10, $11, $12, $13]::FLOAT4[]
                        ) AS simple_routes(geom)
                    ) AS s_r
            `,
                    [originLong, originLat, destinationLong, destinationLat, profile=="nohelper"?1:0, profile=="cane"?1:0,profile=="walker"?1:0, profile=="wheelchair"?1:0, weights[0], weights[1], weights[2], weights[3], weights[4]]
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
        }
    );
}

