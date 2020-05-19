import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Observation } from "./Observation";
import { IsDate } from 'class-validator'

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    owner: User;

    @Column()
    title: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    @IsDate()
    beginning: Date;

    @Column()
    @IsDate()
    ending: Date;

    @Column()
    objective: string;

    @Column()
    numberOfImages: number;

    @OneToMany(type => Observation, observation => observation.id)
    observations: Observation[];
}