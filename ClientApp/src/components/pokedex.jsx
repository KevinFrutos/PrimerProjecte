import { useState, useEffect } from 'react';

const Pokedex = () => {

    const [pokemonId, setPokemonId] = useState(1);
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        (async () => { 
            try{
                const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, {
                    method: "GET"
                })
                const data = await respuesta.json();
                setPokemonData(data);
            }catch(error){
                console.log(error);
            }
        })();
    }, [pokemonId]);

    const nextPokemon = () => setPokemonId(pokemonId >= 151 ? 1 : pokemonId + 1);

    const backPokemon = () => setPokemonId(pokemonId <= 1 ? 151 : pokemonId - 1);

    const { name, base_experience: exp, sprites: {front_default: image} = {} } = pokemonData || {}

    return (
		<div style={{display: "flex", flexDirection: "column"}}>
        <div>
            <img src={image} alt={name} />
        </div>
        <div>
            <button onClick={backPokemon}>Back</button>
            <span>{name}</span>
            <button onClick={nextPokemon}>Next</button>
        </div>
        <div>
            <p>Experiencia base: {exp}</p>
        </div>
		</div>
	);
};

export default Pokedex;
