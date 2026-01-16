//Qui va impostata la struttura base del personaggio, es.

//export const formatCharacter = (apiData) => ({
//   id: apiData._id,
//   name: apiData.name,
//   image: apiData.imageUrl || 'placeholder.png',
//   films: apiData.films || []
// });

// src/models/Character.js
export const formatCharacter = (apiData) => ({
    _id: apiData._id,
    name: apiData.name,
    imageUrl: apiData.imageUrl || 'logo_disney.png',
    films: apiData.films || [],
    shortFilms: apiData.shortFilms || [],
    tvShows: apiData.tvShows || [],
    videoGames: apiData.videoGames || [],
    allies: apiData.allies || [],
    enemies: apiData.enemies || [],
});