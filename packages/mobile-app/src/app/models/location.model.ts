import { Deserializable } from './deserializable.model';

export class Location implements Deserializable{
    public lat: number;
    public lng: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
