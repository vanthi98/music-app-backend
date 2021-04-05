import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { TestService } from "./test.service";
import { TestType } from "./dto/test.dto";

@Resolver()
export class TestResolver {
  constructor(private readonly testService: TestService) {}

  @Query(() => [TestType])
  async getAllTest(): Promise<Array<TestType>> {
    return this.testService.getAll();
  }

  @Query(() => TestType)
  async getOneTest(@Args("title") title: string): Promise<TestType> {
    return this.testService.getOne(title);
  }

  @Mutation(() => String)
  async insertTest(@Args("title") title: string): Promise<string> {
    return this.testService.InsertOne(title);
  }

  @Mutation(() => String)
  async deleteTest(@Args("title") title: string): Promise<string> {
    return this.testService.DeleteOne(title);
  }
}
