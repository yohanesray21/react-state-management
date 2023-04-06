import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void;
} {
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  // const [search, setSearch] = useState("");

  type pokemonState = {
    pokemon: Pokemon[];
    search: string;
  };

  type pokemonAction =
    | { type: "setPokemon"; payload: Pokemon[] }
    | { type: "setSearch"; payload: string };

  const [{ pokemon, search }, dispatch] = useReducer(
    (state: pokemonState, action: pokemonAction) => {
      switch (action.type) {
        case "setPokemon":
          return { ...state, pokemon: action.payload };
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      pokemon: [],
      search: "",
    }
  );

  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "setPokemon", payload: data }));
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "setSearch", payload: search });
  }, []);

  const filteredPokemon = useMemo(
    () =>
      pokemon
        .filter((p) => p.name.toLocaleLowerCase().includes(search))
        .slice(0, 20),
    [pokemon, search]
  );

  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );
  return { pokemon: filteredPokemon, search, setSearch };
}

const PokemonContext = createContext<
  ReturnType<typeof usePokemonSource> | undefined
>({} as unknown as ReturnType<typeof usePokemonSource>);

export const usePokemon = () => {
  return useContext(PokemonContext)!;
};

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PokemonContext.Provider value={usePokemonSource()}>
        {children}
      </PokemonContext.Provider>
    </div>
  );
}
