import axios from "axios";
import Link from "next/link";
import mongoose from "mongoose";
import Article from "@/models/Article";

const Articles = ({ articlesData }) => {
  return (
    <div>
      <h1>Voici les magnifiques articles présents sur le site :</h1>
      <section>
        {articlesData.map((article, index) => {
          return (
            <Link key={article._id} href={`/articles/${article._id}`}>
              <article>
                <h2>{article.title}</h2>
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Articles;

export const getStaticProps = async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      mongoose.set("strictQuery", false);
      await mongoose.connect(process.env.DATABASE_URI);
    }
  } catch (error) {
    console.log(
      "error connecting to mongoDB in static Props Articles => ",
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

  return {
    props: {
      articlesData: JSON.parse(JSON.stringify(articlesData)),
    },
  };
};
