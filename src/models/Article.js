import { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema({
  title: String,
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Article = models.Article || model("Article", ArticleSchema);

export default Article;
