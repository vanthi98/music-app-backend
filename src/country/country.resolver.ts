import { Resolver, Query, Args } from "@nestjs/graphql";
import { CountryService } from "./country.service";
import { CountryType } from "./dto/country.dto";

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [CountryType])
  async getAllCountry(): Promise<Array<CountryType>> {
    return this.countryService.getAllCountry();
  }

  @Query(() => CountryType)
  async getCountryByCountryId(
    @Args("country_id", { nullable: true, type: () => Number })
    country_id: number
  ): Promise<CountryType> {
    return this.countryService.getCountryById(country_id);
  }
}
