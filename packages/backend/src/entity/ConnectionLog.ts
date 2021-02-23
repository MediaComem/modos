import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, JoinTable } from "typeorm";
import { IsBoolean, IsEmail, IsDate } from 'class-validator'
import { User } from "./User";

@Entity({
    schema: 'modos'
})
export class ConnectionLog {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @Column()
    @IsDate()
    loggedAt: Date;
}
