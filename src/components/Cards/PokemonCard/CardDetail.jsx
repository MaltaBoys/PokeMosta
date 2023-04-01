import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CardDetail() {
  const id = useParams();
  const [pokemonCard, setPokemonCard] = useState(null);

  // Nos conectamos a la api para recoger los datos en JSON
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonCard(data);
      });
  }, [id]);

  // Si no tenemos los datos, mostramos un mensaje de carga
  if (!pokemonCard) {
    return <p>No pokemon detail</p>;
  }

  return <div>CardDetail {pokemonCard.id}</div>;
}

export default CardDetail;
