import { UserData } from './SpecificUserData';

export interface User {
    Username: string;
    Email: string;
    Password: string;
    Gender: string;
    ProfileImage: string;
    BirthDate: string;
    Favorites: [string];
}