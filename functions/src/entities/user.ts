import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "src/interfaces/user.interface";


export class RegisterUserDto implements IUser {
    id?: string;
    @ApiProperty({default: 'Muhammad Ibrahim Lucman'})
    fullName: string;
    refreshToken?: string;
    userType: "administrator" | "vendor" | "user";
    inactive?: boolean;
    @ApiProperty({default: 'admin@itsmarawi.net'})
    email: string;
    @ApiProperty({default: 'oddminyousir'})
    password: string;
    active?: boolean;
}

export class LoginUserDto implements IUser {
    id?: string;
    fullName: string;
    email: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    refreshToken?: string;
    userType: "administrator" | "vendor" | "user";
    inactive?: boolean;
}

export class RefreshDto  {
    @ApiProperty({
        required: true,
        minLength: 5
    })
    refreshToken: string;
}

export class AccessTokenDto  {
    @ApiProperty({
        required: true,
        minLength: 5
    })
    accessToken: string;
}