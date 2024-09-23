import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setPokemon(data));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <Container>
      <Card className="pokemon-details">
        <Box className="pokemon-image-container">
          <CardMedia
            component="img"
            image={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="pokemon-details-image"
          />
        </Box>
        <CardContent className="pokemon-details-content">
          <Typography variant="h4" component="div" className="pokemon-details-name">
            {pokemon.name.toUpperCase()}
          </Typography>
          <Typography variant="body1" className="pokemon-details-info">Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</Typography>
          <Typography variant="body1" className="pokemon-details-info">Tamanho: {pokemon.height / 10}m</Typography>
          <Typography variant="body1" className="pokemon-details-info">Peso: {pokemon.weight / 10}kg</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')} 
            style={{ marginTop: '20px' }}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PokemonDetails;