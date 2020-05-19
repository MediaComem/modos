import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Obstacle {
    COATING  = 'coating',
    OBSTACLE = 'obstacle',
    SECURITY = 'security',
    PASSABILITY = 'passability',
    SLOPE = 'slope',
    WIDTH = 'width',
    OTHER = 'other',
    NOPROBLEM = 'noproblem',
    UNLABELLED = 'unlabelled'
}


@Entity()
export class Description {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: Obstacle,
        default: Obstacle.UNLABELLED
    })
    obstacle: Obstacle;

    @Column()
    freeText: string;

    @Column("int")
    impact: number;
}