import { Column } from "typeorm";

export class Image {

    @Column()
    basename: string

    @Column("int", { nullable: true })
    width: number;

    @Column("int", { nullable: true })
    height: number;

}