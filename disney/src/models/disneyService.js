import { formatCharacter } from './Character';

//Chiamata all'API che ritorna tutti i characters sotto forma di pagine da 50.
//I personaggi non sono ordinati per id. La gestione dei pulsanti prev e next nella pagina CharacterDetail è gestita
//direttamente dalla sua viewmodel
export const disneyService = {
    async getCharacters(page, pageSize = 50) {
        const response = await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`);

        if (!response.ok) throw new Error("API Error");

        const json = await response.json();

        //Usiamo il metodo .map per applicare ad ognuno degli elementi che ci sono arrivati la funzione formatCharacter (definita
        //in Character.js)
        return json.data
            .map(character => formatCharacter(character))
    },

    //Chiamata all'API per gestire la ricerca dei personaggi:
    //la chiamata funziona anche nel momento in cui ho solo i primi 50 personaggi caricati, anche se in questi 50 non c'è
    //quello che cerco
    async searchCharacters(searchTerm, page = 1, pageSize = 50) {
        // Costruisce un URL con parametro name
        const url = `https://api.disneyapi.dev/character?name=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=${pageSize}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("Research error");

        const json = await response.json();

        //Chiamata all'API per la ricerca dei personaggi tramite il name
        return {
            //Innanzitutto si formattano i dati che arrivano dall'API (come prima)
            characters: json.data.map(character => formatCharacter(character)),

            //Successivemente si controlla che esista il valore che cerchiamo nella risposta dell'API (formattata con map prima)
            //se c'è allora viene mostrato il risultato della ricerca all'interno della pagina. altrimenti si ha il valore di default
            //il quale è fissato ad 1 perchè mostrerà la pagina di default (seppur vuota)
            totalPages: json.info?.totalPages || 1,

            //Infine si definisce il numero di corrispondenze alla ricerca (e se non ce ne sono si ha il valore di default, cioè 0
            count: json.info?.count || 0
        };
    },

    //Chiamata all'API per la richiesta di un personaggio tramite il suo id (per la renderizzazione della pagina di dettaglio
    //di ogni personaggio (guardare useCharacterDetailViewModel.js)
    async getCharacterById(id) {
        const response = await fetch(`https://api.disneyapi.dev/character/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Character with ID ${id} not found`);
            }
            throw new Error("Something went wrong while loading the character");
        }
        const json = await response.json();

        return formatCharacter(json.data);
    }
};

