import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Description } from "./Description";
import { Image } from "./Image";
import { Location } from "./Location";
import { Event } from "./Event";


@Entity()
export class Observation {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    owner: User;

    @OneToOne(type => Description)
    @JoinColumn()
    description: Description;

    @OneToOne(type => Image)
    @JoinColumn()
    image: Image;

    @OneToOne(type => Location)
    location: Location;

    @ManyToOne(type => Event, event => event.observations)
    event: Event;
}