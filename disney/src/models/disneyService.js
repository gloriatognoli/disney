//Qui va fatta la fecth dei dati, es.

// src/models/disneyService.js
// import { formatCharacter } from './Character';
//
// export const disneyService = {
//   async getCharacters() {
//     const response = await fetch('https://api.disneyapi.dev/character?pageSize=50');
//     const json = await response.json();
//     // Trasforma i dati grezzi usando il formatore sopra
//     return json.data.map(formatCharacter);
//   }
// };

// src/models/disneyService.js
// src/models/disneyService.js
import { formatCharacter } from './Character'; // Importiamo il "trasformatore"

export const disneyService = {
    async getCharacters(page, pageSize = 50) {
        const response = await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`);

        if (!response.ok) throw new Error("Errore API");

        const json = await response.json();

        // ECCO IL MAP: Trasformiamo ogni personaggio dell'API nel nostro modello pulito
        return json.data.map(character => formatCharacter(character));
    }
};