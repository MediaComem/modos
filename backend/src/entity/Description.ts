import { Column } from "typeorm";
import { IsEnum, IsString, MaxLength, IsInt, Min, Max } from "class-validator";

export enum Obstacle {
    COATING = 'coating',
    OBSTACLE = 'obstacle',
    SECURITY = 'security',
    PASSABILITY = 'passability',
    SLOPE = 'slope',
    WIDTH = 'width',
    OTHER = 'other',
    NOPROBLEM = 'noproblem',
    UNLABELLED = 'unlabelled'
}

export enum FrontendObstacle {
    COATING = 'coating',
    OBSTACLE = 'obstacle',
    SECURITY = 'security',
    PASSABILITY = 'passability',
    SLOPE = 'slope',
    WIDTH = 'width',
    OTHER = 'other'
}

export class Description {

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

    @Column("int")
    @IsInt()
    @Min(1)
    @Max(5)
    impact: number;
}
