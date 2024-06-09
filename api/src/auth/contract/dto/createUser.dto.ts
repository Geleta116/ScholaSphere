import { Expose } from "class-transformer";


export class CreateUserDto {
    @Expose()
    email! : string

    @Expose()
    password!: string

    @Expose()
    phonenumber?: string

    @Expose()
    profilepicture? : string

    @Expose()
    description?: string

    @Expose()
    name!: string
}