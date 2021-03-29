import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TestType } from "./dto/test.dto";
import { Test } from "./interfaces/test.interface";
import Model from "mongoose";
import { timeLog } from "console";

@Injectable()
export class TestService {
  constructor(@InjectModel("Test") private testModel: Model<Test>) {}

  async getAll(): Promise<Array<TestType>> {
    const result = await this.testModel.find({});
    return result;
  }

  async getOne(title: string): Promise<TestType> {
    const result = await this.testModel.findOne({ title }); // { title } equal to { title: title }
    if (!result) {
      throw new BadRequestException("Can not find test");
    }
    return result;
  }

  async InsertOne(title: string): Promise<string> {
    const newTest = new this.testModel({ title }); // { title } equal to { title: title } => acronym ^^
    const result = await newTest.save();
    if (result) {
      return newTest.title;
    } else {
      throw new BadRequestException("Can not insert test");
    }
  }
  async DeleteOne(title: string): Promise<string> {
    const delTest = await this.testModel.deleteOne({ title });
    console.log(delTest);
    if (delTest.deletedCount === 1) {
      return "Delete test successfully";
    } else {
      throw new BadRequestException("Can not find test to delete");
    }
  }
  myfunction() {
    return "a";
  }
}
