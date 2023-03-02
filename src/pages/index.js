import axios from "axios";

const Home = ({ data }) => {
  console.log(data);
  return (
    <>
      <h1>Voici un site sur Pokemon</h1>
      {data.results.map((pokemon, index) => {
        return <p key={index}>{pokemon.name}</p>;
      })}
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  console.log(context);
  let data;
  try {
    const pokemonResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon"
    );
    data = pokemonResponse.data;
  } catch (error) {
    console.log("error while fetching data home page", error.message);
  }

  return {
    props: {
      data,
    },
  };
};
