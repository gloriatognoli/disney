import { formatCharacter } from './Character';

export const disneyService = {
    async getCharacters(page, pageSize = 50) {
        const response = await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`);

        if (!response.ok) throw new Error("Errore API");

        const json = await response.json();

        return json.data.map(character => formatCharacter(character));
    }
};