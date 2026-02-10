//Formattazione del singolo personaggio: gestione di ogni categoria di dato
//Definiamo una variabile formatCharacter a cui passiamo i dati che arrivano dell'API (apiData) e formattiamo ogni parametro

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