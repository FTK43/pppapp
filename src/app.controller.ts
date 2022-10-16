import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/calculateTargetAmount/:srcAmount/:srcCountry/:targetCountry')
  async calculateAmount(@Param('srcAmount') srcAmount: number, 
           @Param('srcCountry') srcCountry: string,
           @Param('targetCountry') targetCountry: string): Promise<number> {

    return await this.appService.calculateAmount(srcAmount, srcCountry, targetCountry);
  }
}