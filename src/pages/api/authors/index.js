import connectDB from "@/middlewares/connectDB";
import Author from "@/models/Author";

const handler = async (req, res) => {
  const method = req.method;
  switch (method) {
    case "POST":
      const { name, email } = req.body;
      try {
        const newArticle = new Author({
          name,
          email,
        });
        await newArticle.save();
        return res.json(newArticle);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    case "GET":
    case "PUT":
    case "DELTE":
    default:
      return res.status(404).json({ message: "This route doesn't exist" });
  }
};

export default connectDB(handler);
