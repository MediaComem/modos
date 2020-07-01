import { Deserializable } from './deserializable.model';

export class Description implements Deserializable {
    public _id: string;
    public obstacle: string;
    public freeText: string;
    public impact: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
