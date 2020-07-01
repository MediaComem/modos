import { Deserializable } from './deserializable.model'
import { Description } from './description.model';
import { Image } from './image.model';
import { Location } from './location.model';

export class Observation implements Deserializable {
    public _id: string;
    public description: Description;
    public image: Image;
    public location: Location;

    deserialize(input: any): this {
        Object.assign(this, input);

        this.description = new Description().deserialize(input.description);

        this.image = new Image().deserialize(input.image);

        this.location = new Location().deserialize(input.location)

        return this;
    }

    serialize() {
        return {
            "description": {
              "obstacle" : this.description.obstacle,
              "impact": this.description.impact,
              "freeText": this.description.freeText
            },
            "imageData": this.image.imageData,
            "location": {
              "latitude": this.location.lat,
              "longitude": this.location.lng
            }
        }
    }
}
