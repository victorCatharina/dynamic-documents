export declare class UserProfileDto {
    id: string;
    name: string;
    email: string;
    role: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    user: UserProfileDto;
}
