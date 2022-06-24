import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decoration';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,) { }

    @Post('/signup')
    signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signup(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Get('/users')
    @UseGuards(AuthGuard())
    getUsers():Promise<User[]>{

        return this.authService.getUser();

    }

    @Delete('/users/:id')
    deleteUser(@Param('id') id:string):Promise<void>{
        return this.authService.deleteUser(id);
    }

    
}
