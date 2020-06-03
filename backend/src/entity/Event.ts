import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { User } from "./User";
import { Observation } from "./Observation";
import { IsDate, IsString, MinLength, IsInt, IsPositive } from 'class-validator'

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    owner: User;

    @Column()
    @IsString()
    title: string;

    @Column({ nullable: true })
    @IsString()
    @MinLength(8)
    password: string;

    @Column()
    @IsDate()
    beginning: Date;

    @Column()
    @IsDate()
    ending: Date;

    @Column()
    @IsString()
    objective: string;

    @Column()
    @IsInt()
    @IsPositive()
    numberOfImages: number;

    @OneToMany(type => Observation, observation => observation.event, {
        nullable: true
    })
    observations: Array<Observation>;

    @ManyToMany(type => User, user => user.events, { nullable: true })
    participants: Array<User>;
}