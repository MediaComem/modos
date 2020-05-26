import { Column } from "typeorm";

export class Location {

    @Column("real",  { nullable: true })
    latitude: number;

    @Column("real",  { nullable: true })
    longitude: number;

    @Column("real", { nullable: true })
    altitude: number;
}