import { useState, useEffect } from 'react';
import { disneyService } from '../models/disneyService';
import {data} from '../models/characters-data.json';
import { formatCharacter } from '../models/Character';

export const useCharactersViewModel = () => {
    // 1. STATO: Inizializziamo con i dati locali del JSON
    const [characters, setCharacters] = useState(data.map(formatCharacter));
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultCount, setSearchResultCount] = useState(0);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        // Se il campo è vuoto, torna alla visualizzazione normale
        if (!searchTerm.trim()) {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        // Debounce: aspetta 500ms dopo che l'utente smette di digitare
        const timeoutId = setTimeout(async () => {
            console.log('🔍 Ricerca per:', searchTerm);
            setLoading(true);
            setIsSearching(true);

            try {
                const result = await disneyService.searchCharacters(searchTerm);
                setSearchResults(result.characters);
                setSearchResultCount(result.count);
                console.log('✅ Trovati:', result.count, 'personaggi');
            } catch (error) {
                console.error('❌ Errore ricerca:', error);
                setSearchResults([]);
                setSearchResultCount(0);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms di debounce

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);



    // 2. LOGICA DI CARICAMENTO (Fetch progressiva)
    const loadMoreCharacters = async () => {
        if (loading || characters.length >= 500 || isSearching) return;

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

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        setSearchResults([]);
        setSearchResultCount(0);
    };

    const displayedCharacters = isSearching ? searchResults : characters;
    const displayedCount = isSearching ? searchResultCount : characters.length;

    const toggleViewMode = () => {
        setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'));
    }

    // 4. ESPOSIZIONE: Cosa vede la View
    return {
        characters: displayedCharacters,
        allCharacters: characters,
        loading,
        loadMoreCharacters,
        hasMore: characters.length < 500 && !isSearching,
        viewMode,
        toggleViewMode,
        searchTerm,
        handleSearchChange,
        clearSearch,
        isSearching,
        filteredCount: displayedCount
    };
};


//const [viewMode, setViewMode] = useState('grid');
// 3. LOGICA DI UI
//const toggleViewMode = () => {
//    setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'));

//toggleViewMode,
//viewMode,
//};

// useEffect(() => {
//         console.log('useEffect: filtro personaggi');
//
//         if (!searchTerm.trim()) {
//             // Nessuna ricerca: mostra tutti
//             setFilteredCharacters(characters);
//         } else {
//             // Filtra per nome
//             const filtered = characters.filter(character =>
//                 character.name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//             setFilteredCharacters(filtered);
//         }
//     }, [characters, searchTerm]);