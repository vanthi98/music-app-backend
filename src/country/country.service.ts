import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Country } from "./interface/country.interface";
import { CountryType } from "./dto/country.dto";

@Injectable()
export class CountryService {
  constructor(@InjectModel("Country") private countryModel: Model<Country>) {}

  async getAllCountry(): Promise<Array<CountryType>> {
    try {
      return await this.countryModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCountryById(country_id: number): Promise<CountryType> {
    try {
      return await this.countryModel.findOne({ country_id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
