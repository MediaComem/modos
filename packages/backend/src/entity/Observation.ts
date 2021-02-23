import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Column,
    AfterLoad
} from 'typeorm';
import { User } from './User';
import { Description } from './Description';
import { Image } from './Image';
import { Location } from './Location';
import { Event } from './Event';
import { ObservationValidation } from "./ObservationValidation";
import { ObservationEvaluation } from "./ObservationEvaluation";
import { ObservationLabelisation } from "./ObservationLabelisation";
import * as config from '../config/config';
import * as fs from 'fs';
import * as path from 'path';
import { validate } from 'class-validator';

@Entity({
    schema: 'modos'
})
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

    @OneToMany(type => ObservationValidation, validation => validation.observation, {
        nullable: true
    })
    validations: Array<ObservationValidation>;

    @OneToMany(type => ObservationEvaluation, evaluation => evaluation.observation, {
        nullable: true
    })
    evaluations: Array<ObservationEvaluation>;

    @OneToMany(type => ObservationLabelisation, labelisation => labelisation.observation, {
        nullable: true
    })
    labelisations: Array<ObservationLabelisation>;

    @AfterLoad()
    setAPIImageLink() {
        this.image.apiLink = `/observations/images/${this.image.basename}`;
    }

    async saveImage(imageData: string) {
        // create the image model for database
        this.image = new Image();
        this.image.basename = String(Date.now()) + config.imageFormat;
        const imagePath = path.join(
            config.storageDirectory,
            this.image.basename
        );

        const errors = await validate(this.image);
        if (errors.length > 0) throw errors;

        // write the image data to disk
        const imageWithoutMetadata = imageData.split(',')[1];
        const decodedData = Buffer.from(imageWithoutMetadata, 'base64');
        fs.writeFile(imagePath, decodedData, err => {
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

    async deleteImage() {
        const imagePath = path.join(
            config.storageDirectory,
            this.image.basename
        );

        return new Promise((resolve, reject) =>
            fs.unlink(imagePath, errorDeleteFile => {
                if (errorDeleteFile) {
                    reject(errorDeleteFile);
                }

                resolve();
            })
        );
    }
}
