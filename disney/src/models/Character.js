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