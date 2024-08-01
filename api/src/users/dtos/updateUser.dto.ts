    import { Expose } from "class-transformer";

    export class UpdateUserDto {
        @Expose()
        firstName?: string;
    
        @Expose()
        lastName?: string;
    
        @Expose()
        email?: string;
    
        @Expose()
        userName?: string;
    
        @Expose()
        phoneNumber?: string;
    
        @Expose()
        description?: string;

        
    }