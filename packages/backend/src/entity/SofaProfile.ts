import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEnum, IsInt, isBoolean, IsPositive, ValidateIf, IsNotEmpty, isNotEmpty, IsNumber, IsBoolean } from "class-validator";


export enum Helper {
    NO_HELPER = 'no helper',
    WHITE_CANE = 'white cane',
    WALKER = 'walker',
    WHEELCHAIR = 'wheelchair'
}

export enum AgeRange {
    LESS_OR_25 = '- 25',
    BETWEEN_26_45 = '26 - 45',
    BETWEEN_46_65 = '46 - 65',
    MORE_OR_66 = '66 +'
}

@Entity()
export class SofaProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: Helper,
        nullable: true
    })
    @IsEnum(Helper)
    @IsNotEmpty()
    helper: Helper;

    @Column({
        type: "enum",
        enum: AgeRange,
        nullable: true
    })
    @IsEnum(AgeRange)
    @IsNotEmpty()
    ageRange: AgeRange;

    @Column()
    @IsInt()
    disabledProfilesMask: number;

    @Column()
    @IsBoolean()
    hidePassModal: boolean;
}