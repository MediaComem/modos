import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Description } from "./Description";
import { Image } from "./Image";
import { Location } from "./Location";
import { Event } from "./Event";
import * as config from '../config/config';
import * as fs from 'fs';
import * as path from 'path';



@Entity()
export class Observation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    owner: User;

    @Column(type => Description)
    description: Description;

    @Column(type => Image)
    image: Image;

    @Column(type => Location)
    location: Location;

    @ManyToOne(type => Event, event => event.observations, { cascade: true })
    event: Event;

    async saveImage(imageData: string) {
        this.image = new Image();
        this.image.basename = String(Date.now()) + config.imageFormat;
        const imagePath = path.join(config.storageDirectory, this.image.basename);

        const imageWithoutMetadata = imageData.split(',')[1];
        const decodedData = Buffer.from(imageWithoutMetadata, 'base64');
        fs.writeFile(imagePath, decodedData, (err) => {
            if (err) throw err;
        });
    }

    async loadImage(imageURL: string) {
        fs.readFile(imageURL, (err, data) => {
            if (err) throw err;
            const decodedData = data;
            const imageData = new Buffer(decodedData).toString('base64');
            return imageData;
        });
    }
}