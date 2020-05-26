import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { Profile } from './Profile';
import { Event } from "./Event";
import { IsEmail } from 'class-validator'
import * as bcrypt from "bcrypt";
import { costFactor } from "../config/config";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    pseudonym: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    passwordHash: string;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

    @ManyToMany(type => Event)
    @JoinColumn()
    events: Array<Event>;

    async hashPassword(password: string) {
        this.passwordHash = await bcrypt.hash(password, costFactor);
    }
}
