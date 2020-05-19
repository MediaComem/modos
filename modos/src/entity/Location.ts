import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("real")
    latitude: number;

    @Column("real")
    longitude: number;

    @Column("real")
    altitude: number;
}