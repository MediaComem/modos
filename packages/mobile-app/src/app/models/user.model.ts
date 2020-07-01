import { Deserializable } from './deserializable.model';
import { Profile } from './profile.model';

export class User implements Deserializable {
    public _id: string;
    public pseudonym: string;
    public email: string;
    public password: string;
    public events: string[];
    public profile: Profile;

    deserialize(input: any): this {
        Object.assign(this, input);

        this.profile = new Profile().deserialize(input.profile);
        
        return this;
    }
}
