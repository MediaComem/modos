import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from './Profile';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pseudonym: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

}
