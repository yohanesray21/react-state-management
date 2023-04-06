import { PokemonProvider, usePokemon } from "./store";

const SearchInput = () => {
  const { search, setSearch } = usePokemon();
  return (
    <input
      placeholder="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

const PokemonList = () => {
  const { pokemon } = usePokemon();

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm-grid-cols-2 lg:grid-cols-3 mt-3">
        {pokemon.map((poke) => {
          return <div key={poke.id}>{poke.name}</div>;
        })}
      </ul>
    </>
  );
};

const App = () => {
  return (
    <PokemonProvider>
      <div className="mx-auto max-w-3xl">
        <SearchInput />
        <PokemonList />
      </div>
    </PokemonProvider>
  );
};

export default App;
