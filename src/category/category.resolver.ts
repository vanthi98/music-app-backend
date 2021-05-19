import { Resolver, Query } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CategoryType } from "./dto/category.dto";

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  async getAllCountry(): Promise<Array<CategoryType>> {
    return this.categoryService.getAllCategory();
  }
}
