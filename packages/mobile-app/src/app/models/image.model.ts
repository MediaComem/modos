import { Deserializable } from './deserializable.model';

export class Image implements Deserializable {
    public _id: string;
    public imageData: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
