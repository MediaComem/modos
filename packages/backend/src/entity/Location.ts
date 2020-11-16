import { Column } from "typeorm";
import { IsLatitude, IsLongitude } from "class-validator";

export class Location {

    @Column("real", { nullable: true })
    @IsLatitude()
    latitude: number;

    @Column("real", { nullable: true })
    @IsLongitude()
    longitude: number;

    @Column("real", { nullable: true })
    altitude: number;
}
