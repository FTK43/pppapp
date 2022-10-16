import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  async calculateAmount(srcAmount: number, srcCountry: string, targetCountry: string): Promise<number> {
    const sourcePPP = await this.getPPPdata(srcCountry);
    const targetPPP = await this.getPPPdata(targetCountry);

    return srcAmount / (sourcePPP * targetPPP);
  }

  private async  getPPPdata(country:string): Promise<number>{
    const year = new Date().getFullYear();
    const apiResponse = await fetch(`https://api.worldbank.org/v2/en/country/${country}/indicator/PA.NUS.PPP?format=json&per_page=20000&source=2&date=${year-3}:${year}`);
    const data = await apiResponse.json();

    const countryPPP = await data[1]
      .filter(countryObj => countryObj.countryiso3code === country)[0];

    console.log(countryPPP);
    const value = countryPPP.value;

    return value;
  }
}
