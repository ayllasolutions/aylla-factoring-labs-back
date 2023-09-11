import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('equifax')
  getEquifax(): string {
    return this.appService.getEquifax();
  }

  @Get('malla')
  getMalla(): string {
    return this.appService.getMalla();
  }
  
  @Get('achef')
  getAchef(): string {
    return this.appService.getAchef();
  }

  @Post('asincequifax')
  async postHookEquifax(@Body() requestBody: any) {
    const result = await this.appService.asincEquifax(requestBody);
    return { message: 'Datos procesados exitosamente', result };
  }  

}
