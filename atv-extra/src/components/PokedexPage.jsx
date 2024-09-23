import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, CardActions, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function PokedexPage() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const pokemonWithDetails = data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
        }));
        setAllPokemon(pokemonWithDetails);
        setDisplayedPokemon(pokemonWithDetails);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = allPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(term) || pokemon.id.toString().includes(term)
    );
    setDisplayedPokemon(filtered);
  };

  return (
    <>
      <header className="pokedex-header">
        <Typography variant="h1" component="h1" className="pokedex-title">
          Dicionário Pokemon
        </Typography>
      </header>
      <Container>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escolha seu pokemon"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '20px' }}
        />
        <Grid container spacing={3} className="pokemon-grid">
          {displayedPokemon.map((poke) => (
            <Grid item xs={12} sm={6} md={4} key={poke.id}>
              <Card className="pokemon-card">
                <Box className="pokemon-image-container" style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                    alt={poke.name}
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} // Ajuste a altura máxima conforme necessário
                  />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" className="pokemon-name">
                    {poke.name.toUpperCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    component={Link} 
                    to={`/pokemon/${poke.id}`} 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                  >
                    Ver detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default PokedexPage;
