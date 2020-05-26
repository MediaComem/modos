import { Column } from "typeorm";

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
    obstacle: Obstacle;

    @Column({ nullable: true })
    freeText: string;

    @Column("int")
    impact: number;
}
