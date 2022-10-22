import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
const fs = require('fs/promises');

@Injectable()
export class AppService {

  async calculateAmount(srcAmount: number, srcCountry: string, targetCountry: string): Promise<number> {
    const sourcePPP = await this.getPPPValue(srcCountry);
    const targetPPP = await this.getPPPValue(targetCountry);

    return srcAmount / sourcePPP * targetPPP;
  }

  private async getCountryIsoCode(country:string): Promise<string> {
    const countries = await fs.readFile('resources/countries.json');
    const COUNTRY_NAME_TO_ISO_CODE: Map<string, string> = new Map(JSON.parse(countries));

    return COUNTRY_NAME_TO_ISO_CODE.get(country);
  }

  private async getCountryFullName(isocode:string): Promise<string> {
    const countries = await fs.readFile('resouces/countries.json');
    const COUNTRY_ISO_TO_NAME: Map<string, string> = new Map(JSON.parse(countries));

    return COUNTRY_ISO_TO_NAME.get(isocode);
  }

  private async getPPPValue(country:string): Promise<number>{
    const year = new Date().getFullYear();
    const apiResponse = await fetch(`https://api.worldbank.org/v2/en/country/${country}/indicator/PA.NUS.PPP?format=json&per_page=20000&source=2&date=${year-3}:${year}`);
    const data = await apiResponse.json();

    const countryPPP = await data[1]
      .filter((countryObj: { countryiso3code: string; }) => countryObj.countryiso3code.toLowerCase() === country.toLowerCase())[0];
    
    return countryPPP.value;
  }
}
