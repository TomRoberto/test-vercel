import connectDB from "@/middlewares/connectDB";
import Article from "@/models/Article";

const handler = async (req, res) => {
  // console.log("back", req);
  // Pas de clef params, tout dans query
  const { query, method } = req;
  console.log("back : on reçoit comme query => ", query);
  if (method !== "GET") {
    return res.status(404).json({ message: "This route doesn't exist" });
  }
  try {
    const articleId = query.articleId;
    const article = await Article.findById(articleId);
    console.log(article);
    res.json(article);
  } catch (error) {
    console.log("back : catch error => ");
    res.status(400).json({ message: error.message });
  }
};

export default connectDB(handler);
