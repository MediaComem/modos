import { Deserializable } from './deserializable.model';

export class StatusCode implements Deserializable {
    public code: number;
    public message: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
