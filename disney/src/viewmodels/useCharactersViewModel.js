import { useState, useEffect } from 'react';
import { disneyService } from '../models/disneyService';
import {data} from '../models/characters-data.json';
import { formatCharacter } from '../models/Character';

export const useCharactersViewModel = () => {
    // inizializzazione con i dati locali del JSON
    const [characters, setCharacters] = useState(data.map(formatCharacter));

    //inizializzazione dello stato di caricamento dei personaggi
    const [loading, setLoading] = useState(false);

    //inizializzazione del caricamento dei dati presi con la fetch:
    //lo stato iniziale è 2 perchè al primo caricamento viene caricata la seconda pagina
    const [currentPage, setCurrentPage] = useState(2);

    //inizializzazione della barra di ricerca per nome del personaggio: inizialmente la stringa di ricerca è vuota
    const [searchTerm, setSearchTerm] = useState('');

    //inizializzazione dello stato di ricerca: inizialmente è inattivo (non si sta cercando nulla)
    const [isSearching, setIsSearching] = useState(false);

    //inizializzazione dei risultati della ricerca:
    //inizialmente si passa un array vuoto, dove poi i dati saranno inseriti
    //(in seguito ad una fetch all'endpoint .filter by id dell'API)
    const [searchResults, setSearchResults] = useState([]);

    //inizializzazione del counter dei risultati di ricerca (inizialmente è 0)
    const [searchResultCount, setSearchResultCount] = useState(0);

    //inizializzazione del toggle tra grid view e list view
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        // Se il campo di ricerca è vuoto, torna alla visualizzazione normale
        //Lo useEffect non ha dependencies, quindi la callback viene chiamata ad ogni ciclo
        if (!searchTerm.trim()) {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        //Gestione della ricerca
        //Debounce: aspetta 500ms dopo che l'utente smette di digitare
        //Altrimenti, la ricerca avverrebbe ogni volta che l'utente scrive una lettera.
        //Viene implementata una fetch implementata basandosi su una promise:
        //Inizialmente, facciamo una chiamata all'API con async e settiamo gli stati di caricamento e ricerca a true
        const timeoutId = setTimeout(async () => {
            setLoading(true);
            setIsSearching(true);

            //Si prova a caricare i dati: se funziona, si inseriscono i risultati nelle variabili che abbiamo inizializzato in precedenza
            try {
                const result = await disneyService.searchCharacters(searchTerm);
                setSearchResults(result.characters);
                setSearchResultCount(result.count);

                //Altrimenti, si gestisce l'errore ritornando un array vuoto (no personaggi trovati) ed il contatore dei personaggi trovati a 0
            } catch (error) {
                setSearchResults([]);
                setSearchResultCount(0);

                //In entrambi i casi, in seguito si imposta setLoading a false (disattivando la fase di ricerca) dopo 500ms
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms di debounce

        //Cleanup function: nel momento in cui l'utente smette di scrivere (in realtà dopo 500ms), il codice viene "pulito"
        //permettendo alla funzione di debounce di fare una sola chiamata all'API (debounce è una hook function che causa un side effect,
        // quindi viene poi "pulito" dalla cleanup, che viene chiamata al cambio del searchTerm)
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);



    //Logica di caricamento di nuovi personaggi:
    //Anche qui viene fatta una fetch nel momento in cui il momento clicca sul bottone (questa è la logica del bottone "Load More Characters"
    //Viene chiamata genericamente l'API (getCharacters) chiedendo 50 personaggi alla volta (logica nel disneyService.js)
    const loadMoreCharacters = async () => {
        if (loading || characters.length >= 500 || isSearching) return;

        //Inizialmente si attiva lo stato di caricamento, poi si chiama l'API chiedendo una pagina (con getCharacters)
        setLoading(true);
        try {
            const newData = await disneyService.getCharacters(currentPage);

            //Si combinano i dati precedentemente caricati con quelli nuovi (ampliando quello già esistente chiamandolo combined)
            // i "..." segnalano un'espansione di combined (come se fosse una concatenazione degli array già esistenti) (prendono il nome di spread operator)
            setCharacters(prevCharacters => {
                const combined = [...prevCharacters, ...newData];
                return combined.slice(0, 500);
            });

            //Incrementa il numero della pagina
            setCurrentPage(prevPage => prevPage + 1);

            //Gestione dell'errore segnalandolo nella console
        } catch (error) {
            console.error("Something went wrong while loading more characters:", error);

            //Infine, in qualsiasi caso, disattiva loo stato di caricamento
        } finally {
            setLoading(false);
        }
    };

    //Gestione dello stato di ricerca con la barra di ricerca; ogni volta che term cambia, setta searchTerm a quello nuovo
    //(term è un parametro passato dall'utente)
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    //Cancellazione della ricerca: resetta tutti i campi della ricerca allo stato iniziale
    const clearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        setSearchResults([]);
        setSearchResultCount(0);
    };

    //Rendering condizionale della visualizzazione dei personaggi:
    //se isSearching è attiva, displayedCharacters saranno i risultati della ricerca
    //se non lo è, displayedCharacters mostra tutti i personaggi caricati
    const displayedCharacters = isSearching ? searchResults : characters;

    //Rendering condizionale del contatore dei personaggi visualizzati:
    //se isSearching è attiva, mostra il numero dei risultati trovati
    //altrimenti, mostra i personaggi caricati
    const displayedCount = isSearching ? searchResultCount : characters.length;

    //Logica del toggle button: se precedentemente la visualizzazione era grid, allora si setta a list (e viceversa)
    const toggleViewMode = () => {
        setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'));
    }

    // Elementi passati alla view
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


