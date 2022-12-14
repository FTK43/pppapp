import { Controller, Get, Param, ParseIntPipe, Header, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/calculateTargetAmount/:srcAmount/:srcCountry/:targetCountry')
  @Header('Access-Control-Allow-Origin', '*')
  async calculateAmount(@Param('srcAmount', ParseIntPipe) srcAmount: number, 
           @Param('srcCountry') srcCountry: string,
           @Param('targetCountry') targetCountry: string): Promise<number> {

    return await this.appService.calculateAmount(srcAmount, srcCountry.toLowerCase(), targetCountry.toLowerCase());
  }
}
