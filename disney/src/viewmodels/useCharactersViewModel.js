//Qui va messo il comportamento dell'applicazione quando viene fatta la chiamata all'API e come gestire i dati
//È una custom hook

//// src/viewmodels/useCharactersViewModel.js
// import { useState, useEffect } from 'react';
// import { disneyService } from '../models/disneyService';
// import initialData from '../models/initialData.json'; // Se vuoi caricare dati locali
//
// export const useCharactersViewModel = () => {
//   // Inizializza lo stato con i dati del file JSON se vuoi, oppure con array vuoto
//   const [characters, setCharacters] = useState(initialData || []);
//
//   const loadCharacters = async () => {
//     const data = await disneyService.getCharacters();
//     setCharacters(data);
//   };
//
//   return { characters, loadCharacters };
// };

// src/viewmodels/useCharactersViewModel.js
import { useState } from 'react';
import { disneyService } from '../models/disneyService';
import initialData from '../models/characters-data.json';
import { formatCharacter } from '../models/Character'; // Importante per uniformare il JSON

export const useCharactersViewModel = () => {
    // 1. STATO: Inizializziamo con i dati locali del JSON
    // Usiamo map anche sul JSON se vogliamo essere sicuri che il formato sia identico
    const [characters, setCharacters] = useState(initialData.map(formatCharacter));

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2); // Pagina 1 è il nostro JSON locale
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    // 2. LOGICA DI CARICAMENTO (Fetch progressiva)
    const loadMoreCharacters = async () => {
        // Controllo limite: se abbiamo già 500 o più personaggi, fermati
        if (loading || characters.length >= 500) return;

        setLoading(true);
        try {
            // Chiamiamo il service (che usa già il map al suo interno)
            const newData = await disneyService.getCharacters(currentPage);

            setCharacters(prevCharacters => {
                const combined = [...prevCharacters, ...newData];

                // Se superiamo i 500 totali, tagliamo l'array esattamente a 500
                return combined.slice(0, 500);
            });

            // Incrementiamo la pagina per la prossima chiamata
            setCurrentPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error("Errore nel caricamento dei personaggi extra:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. LOGICA DI UI
    const toggleViewMode = () => {
        setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'));
    };

    // 4. ESPOSIZIONE: Cosa vede la View
    return {
        characters,
        loading,
        viewMode,
        toggleViewMode,
        loadMoreCharacters,
        hasMore: characters.length < 500 // Indica alla View se mostrare ancora il tasto "Carica"
    };
};