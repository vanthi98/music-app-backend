import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { CommentType, CreateCommentType } from "./dto/comment.dto";
import { CommentInput } from "./inputs/comment.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";
@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CreateCommentType)
  @UseGuards(GqlAuthGuard)
  async createComment(
    @CtxUser() currentUser,
    @Args("song_id") song_id: string,
    @Args("parent_id", { nullable: true, type: () => String })
    parent_id: string,
    @Args("input") input: CommentInput
  ): Promise<CreateCommentType> {
    const email = currentUser.payload.accountId;
    return this.commentService.createComment(email, song_id, parent_id, input);
  }

  @Query(() => [CommentType])
  async getCommentBySong(
    @Args("song_id") song_id: string
  ): Promise<Array<CommentType>> {
    return this.commentService.getCommentsBySong(song_id);
  }
}
