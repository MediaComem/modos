import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { IsInt, IsDate, Min, Max } from "class-validator";
import { User } from "./User";
import { IsEnum } from "class-validator";

export enum ChallengeType {
    LABELISATION = 'labelisation',
    EVALUATION = 'evaluation',
    VALIDATION = 'validation'
}

@Entity()
export class DailyChallenge {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn()
    owner: User;

    @Column()
    @IsInt()
    @Min(1)
    points: number;

    @Column()
    @Column({
        type: "enum",
        enum: ChallengeType,
        default: ChallengeType.LABELISATION
    })
    @IsEnum(ChallengeType)
    type: ChallengeType;

    @Column()
    @IsInt()
    @Min(1)
    nbGoal: number;

    @Column()
    @IsInt()
    @Min(0)
    nbCrt: number;

    @Column()
    @IsDate()
    date: Date;
}
