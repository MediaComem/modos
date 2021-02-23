import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Observation } from './Observation';
import { IsDate, IsInt, IsPositive, Min, Max } from "class-validator";
import { User } from "./User";


@Entity()
export class ObservationValidation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    owner: User;

    @ManyToOne(type => Observation, observation => observation.validations, { cascade: true })
    observation: Observation;

    @Column()
    @IsInt()
    @Min(-1)
    @Max(5)
    oldWeight: number;

    @Column()
    @Min(-1)
    @Max(5)
    @IsPositive()
    newWeight: number;

    @Column("bool")
    weightOk: boolean;

    @Column()
    @IsDate()
    createdAt: Date;
}
