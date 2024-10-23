import React, { useEffect, useState } from 'react';

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({}); // Estado para armazenar os detalhes

  // Função para buscar os dados da API principal
  const getPokemons = async () => {     
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPokemons(data.results); // Usar data.results para obter a lista de pokémons
      data.results.forEach((pokemon) => {
        // Chama a função para buscar os detalhes de cada Pokémon
        getPokemonsInfo(pokemon.url);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Função para buscar os detalhes de cada Pokémon
  const getPokemonsInfo = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Atualiza o estado com os detalhes usando o nome do Pokémon como chave
      setPokemonDetails((prevDetails) => ({
        ...prevDetails,
        [data.name]: data,
      }));
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  useEffect(() => {
    getPokemons(); // Chama a função para buscar os dados
  }, []);

  return (
    <div className='meow__launchpad'>
      <h1>Pokemons</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            {pokemon.name}
            {/* Exibe detalhes se eles estiverem disponíveis */}
            {pokemonDetails[pokemon.name] && (
              <div>
                <p><strong>Experiência base:</strong> {pokemonDetails[pokemon.name].base_experience}</p>
                <p><strong>Altura:</strong> {pokemonDetails[pokemon.name].height}</p>
                <p><strong>Peso:</strong> {pokemonDetails[pokemon.name].weight}</p>
                <img 
                  src={pokemonDetails[pokemon.name].sprites.front_default} 
                  alt={pokemon.name} 
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
