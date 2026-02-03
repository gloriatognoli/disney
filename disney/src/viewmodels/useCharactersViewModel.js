import { useState } from 'react';
import { disneyService } from '../models/disneyService';
import initialData from '../models/characters-data.json';
import { formatCharacter } from '../models/Character';

export const useCharactersViewModel = () => {
    // 1. STATO: Inizializziamo con i dati locali del JSON
    const [characters, setCharacters] = useState(initialData.map(formatCharacter));

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);
    const [viewMode, setViewMode] = useState('grid');

    // 2. LOGICA DI CARICAMENTO (Fetch progressiva)
    const loadMoreCharacters = async () => {
        if (loading || characters.length >= 500) return;

        setLoading(true);
        try {
            const newData = await disneyService.getCharacters(currentPage);

            setCharacters(prevCharacters => {
                const combined = [...prevCharacters, ...newData];

                return combined.slice(0, 500);
            });

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
        hasMore: characters.length < 500
    };
};