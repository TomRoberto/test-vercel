import axios from "axios";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Article from "@/models/Article";

const ArticleId = ({ articleData }) => {
  const router = useRouter();
  if (router.isFallback) return <div>Loading ...</div>;

  return (
    <div>
      <h1>{articleData.title}</h1>
      <p>{articleData.text}</p>
    </div>
  );
};

export default ArticleId;

export const getStaticPaths = async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DATABASE_URI);
    }
  } catch (error) {
    console.log(
      "error connecting to mongoDB in static Paths ArticleId => ",
      error.message
    );
  }

  let articlesData;
  try {
    // const { data } = await axios.get("http://127.0.0.1:3000/api/articles");
    // articlesData = data;
    articlesData = await Article.find();
  } catch (error) {
    console.log(error.message);
  }
  const paths = articlesData.map((article, index) => {
    return {
      params: {
        articleId: String(article._id),
      },
    };
  });
  console.log("paths", paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  try {
    if (!mongoose.connections[0].readyState) {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DATABASE_URI);
    }
  } catch (error) {
    console.log(
      "error connecting to mongoDB in static Props ArticleId => ",
      error.message
    );
  }

  console.log("staticPros : on reçoit le params => ", context.params);
  let articleData;

  try {
    // const { data } = await axios.get(
    //   `http://127.0.0.1:3000/api/articles/${context.params.articleId}`
    // );
    // console.log("staticPros : résultat de la requête au abck => ", data);
    // articleData = data;

    articleData = await Article.findById(context.params.articleId);
    console.log(
      "static props articleId : on reçoit cela comme article depuis mongoose => ",
      articleData
    );
  } catch (error) {
    console.log("staticProps : message d'erreur du catch => ", error.message);
    console.log(error.response?.data?.message);
  }

  return {
    props: {
      articleData: JSON.parse(JSON.stringify(articleData)),
    },
  };
};
