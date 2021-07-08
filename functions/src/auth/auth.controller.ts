import { JwtRefreshGuard } from './jwt.refresh.guard';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Post, UseGuards, Request, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOAuth2, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto, RefreshDto, AccessTokenDto } from '../entities/user';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UserService) { }
    @ApiOperation({
        summary: 'Register new user',
        operationId: 'register'
    })
    @ApiBody({
        type: RegisterUserDto
    })
    @Post('register')
    async register(@Body() body: LoginUserDto) {
        return this.authService.register(body);
    }
    @ApiOperation({
        summary: 'Login User',
        operationId: 'login'
    })
    @ApiParam({
        name: 'user',
        type: LoginUserDto
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const { refreshToken, accessToken, userId } = await this.authService.login(req.user);
        await this.userService.setCurrentRefreshToken(refreshToken, userId);
        return { refreshToken, accessToken };
    }

    @ApiOperation({
        summary: 'Refresh Token',
        operationId: 'refreshToken'
    })
    @ApiBody({
        type: RefreshDto
    })
    @ApiResponse({
        status: 200,
        type: AccessTokenDto
    })
    @UseGuards(JwtRefreshGuard)
    @Post('refresh_token')
    async refreshToken(@Request() req) {
        const accessToken = this.authService.getAccessToken(req.user);
        return { accessToken };
    }
    
    @ApiOperation({
        summary: 'logout given user',
        operationId: 'logout'
    })
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logOut(@Request() req) {
        await this.authService.removeRefreshToken(req.user.userId);
    }
    @ApiOperation({
        summary: 'get profile info',
        operationId: 'getProfile'
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }


}