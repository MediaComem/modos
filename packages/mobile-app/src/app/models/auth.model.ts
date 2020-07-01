import { Deserializable } from './deserializable.model';

export class Auth implements Deserializable{
    public code: number;
    public token: string;
    //public reresh: string;

    //constructor(public code: number, public token: string) {}

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
