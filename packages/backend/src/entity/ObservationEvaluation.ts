import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Observation } from './Observation';
import { IsInt, Min, Max, IsDate } from "class-validator";
import { User } from "./User";


@Entity()
export class ObservationEvaluation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    owner: User;

    @ManyToOne(type => Observation, observation => observation.evaluations, { cascade: true })
    observation: Observation;

    @Column()
    @IsInt()
    @Min(-1)
    @Max(5)
    weightNoHelper: number;

    @Column()
    @IsInt()
    @Min(-1)
    @Max(5)
    weightWhiteCane: number;

    @Column()
    @IsInt()
    @Min(-1)
    @Max(5)
    weightWalker: number;

    @Column()
    @IsInt()
    @Min(-1)
    @Max(5)
    weightWheelchair: number;

    @Column()
    @IsDate()
    createdAt: Date;
}
