import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./interface/category.interface";
import { CategoryType } from "./dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel("Category") private categoryModel: Model<Category>
  ) {}

  async getAllCategory(): Promise<Array<CategoryType>> {
    try {
      return await this.categoryModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }
}
