import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum UserGender {
    MALE = 'm',
    FEMALE = 'f',
    OTHER = ''
}

export enum Helper {
    WHITE_CANE = 'white cane',
    WALKER = 'walker',
    WHEELCHAIR = 'wheelchair'
}

export enum HelperFrequency {
    RARELY = 'rarely',
    SOMETIMES = 'sometimes',
    ALWAYS = 'always'
}

export enum Mobility {
    PERFECT = 'perfect',
    GOOD = 'good',
    REDUCED = 'reduced',
    MINIMAL = 'minimal'
}


@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    age: number

    @Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.OTHER
    })
    gender: UserGender

    @Column({
        type: "enum",
        enum: Helper
    })
    helper: Helper

    @Column({
        type: "enum",
        enum: HelperFrequency
    })
    helperFrequency: HelperFrequency

    @Column({
        type: "enum",
        enum: Mobility
    })
    mobility: Mobility
}