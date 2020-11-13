import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEnum, IsInt, IsPositive, ValidateIf, IsNotEmpty, isNotEmpty } from "class-validator";

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

@Entity({
    schema: 'modos'
})
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsInt()
    @IsPositive()
    age: number;

    @Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.OTHER
    })
    @IsEnum(UserGender)
    gender: UserGender;

    @Column({
        type: "enum",
        enum: Helper,
        nullable: true
    })
    @IsEnum(Helper)
    @ValidateIf((p: Profile) => isNotEmpty(p.helperFrequency))
    @IsNotEmpty()
    helper: Helper;

    @Column({
        type: "enum",
        enum: HelperFrequency,
        nullable: true
    })
    @IsEnum(HelperFrequency)
    @ValidateIf((p: Profile) => isNotEmpty(p.helper))
    @IsNotEmpty()
    helperFrequency: HelperFrequency;

    @Column({
        type: "enum",
        enum: Mobility
    })
    @IsEnum(Mobility)
    mobility: Mobility;
}
