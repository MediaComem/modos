import { Deserializable } from './deserializable.model';
import { Observation } from './observation.model';

export class Event implements Deserializable {
    public _id: string;
    public owner: string;
    public title: string;
    public password: string;
    public beginning: Date;
    public ending: Date;
    public objective: string;
    public numberOfImages: number;
    public observations: Array<Observation>
   
    deserialize(input: any): this {
        Object.assign(this, input);

        this.beginning = new Date(input.beginning);
        this.ending = new Date(input.ending);
        
        this.observations.map(
            (observation: Observation) => new Observation().deserialize(observation)
        );

        return this;
    }
}
