import { formatCharacter } from './Character';


export const disneyService = {
    async getCharacters(page, pageSize = 50) {
        const response = await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`);

        if (!response.ok) throw new Error("Errore API");

        const json = await response.json();

        return json.data
            .map(character => formatCharacter(character))
            .sort((a, b) => a._id - b._id);

    },

    async searchCharacters(searchTerm, page = 1, pageSize = 50) {
        // Costruisci URL con parametro name
        const url = `https://api.disneyapi.dev/character?name=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=${pageSize}`;

        console.log('🔍 API Call:', url);

        const response = await fetch(url);

        if (!response.ok) throw new Error("Errore nella ricerca");

        const json = await response.json();

        return {
            characters: json.data.map(character => formatCharacter(character)),
            totalPages: json.info?.totalPages || 1,
            count: json.info?.count || 0
        };
    }
};

