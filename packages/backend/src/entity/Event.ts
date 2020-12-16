import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany
} from 'typeorm';
import { User } from "./User";
import { Observation } from "./Observation";
import {
    IsDate,
    IsString,
    MinLength,
    IsInt,
    IsPositive,
    IsOptional,
    Min
} from 'class-validator';

@Entity({
    schema: 'modos'
})
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @IsOptional()
    owner: User;

    @Column()
    @IsString()
    title: string;

    @Column({ nullable: true })
    @IsString()
    @MinLength(8)
    @IsOptional()
    password: string;

    @Column()
    @IsDate()
    beginning: Date;

    @Column()
    @IsDate()
    ending: Date;

    @Column()
    @IsString()
    @IsOptional()
    objective: string;

    @Column()
    @IsInt()
    @Min(0)
    numberOfImages: number;

    @OneToMany(type => Observation, observation => observation.event, {
        nullable: true
    })
    observations: Array<Observation>;

    @ManyToMany(type => User, user => user.events, { nullable: true })
    participants: Array<User>;
}
