import connectDB from "@/middlewares/connectDB";
import Article from "@/models/Article";

const handler = async (req, res) => {
  const method = req.method;
  switch (method) {
    case "POST":
      const { title, text, authorId } = req.body;
      try {
        const newArticle = new Article({
          title,
          text,
          author: authorId,
        });
        await newArticle.save();
        return res.json(newArticle);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    case "GET":
      try {
        const articles = await Article.find();
        return res.json(articles);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }

    case "PUT":

    case "DELETE":

    default:
      return res.status();
  }
};

export default connectDB(handler);
