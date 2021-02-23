import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Observation } from './Observation';
import { IsEnum, IsDate, IsString, MaxLength} from "class-validator";
import { User } from "./User";
import {Obstacle} from "./Description";
import { isString } from "class-validator";


@Entity()
export class ObservationLabelisation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    owner: User;

    @ManyToOne(type => Observation, observation => observation.evaluations, { cascade: true })
    observation: Observation;

    @Column({
        type: "enum",
        enum: Obstacle,
        default: Obstacle.UNLABELLED
    })
    @IsEnum(Obstacle)
    obstacle: Obstacle;

    @Column({ nullable: true })
    @IsString()
    @MaxLength(255)
    freeText: string;

    @Column()
    @IsDate()
    createdAt: Date;
}
