import { Deserializable } from './deserializable.model';

export class Profile implements Deserializable {
    public _id: string;
    public age: number;
    public gender: 'm' | 'f' | undefined;
    public helper: 'white cane' | 'walker' | 'wheelchair' | undefined;
    public helperFrequency: 'rarely' | 'sometimes' | 'always' | undefined;
    public mobility: 'perfect' | 'good' | 'reduced' | 'minimal';

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
