import { Resolver, Query } from "@nestjs/graphql";
import { CountryService } from "./country.service";
import { CountryType } from "./dto/country.dto";

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [CountryType])
  async getAllCountry(): Promise<Array<CountryType>> {
    return this.countryService.getAllCountry();
  }
}
