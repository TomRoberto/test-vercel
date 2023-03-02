import { models, model, Schema } from "mongoose";

const AuthorSchema = Schema({
  name: String,
  email: String,
});

const Author = models.Author || model("Author", AuthorSchema);

export default Author;
