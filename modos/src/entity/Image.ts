import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class BoundingBox {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    x: number;

    @Column("int")
    y: number;

    @Column("int")
    width: number

    @Column("int")
    height: number;
}

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    basename: string

    @Column("int")
    width: number;

    @Column("int")
    height: number;

    @OneToOne(type => BoundingBox)
    @JoinColumn()
    boundingBox: BoundingBox
}