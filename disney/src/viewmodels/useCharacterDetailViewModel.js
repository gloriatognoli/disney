import { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { disneyService } from '../models/disneyService.js';

const MAX_CHARACTER_ID = 9820;
const MIN_CHARACTER_ID = 1;

export const useCharacterDetailViewModel = () => {

    //Leggi l'URL e deduci ìl'id del personaggio da renderizzare (utilizzandolo come parametro)
    const { id } = useParams();

    //Gestione della navigazione tra le pagine singole
    const navigate = useNavigate();

    //Inizializzazione degli stati con useState:
    //Inizializzazione del personaggio caricato (inizialmente nessuno)
    const [character, setCharacter] = useState(null);

    //Inizializzazione dello stato di caricamento della pagina (inizialmente attivo)
    const [loading, setLoading] = useState(true);

    //Inizializzazione della gestione dello stato d'errore (inizialmente nullo)
    const [error, setError] = useState(null);

    //Caricamento di un personaggio a seconda del suo id utilizzando una fetch (l'id è il parametro di riferimento per
    //l'attivazione dell'effetto collaterale che attiva la fetch
    useEffect(() => {
        const loadCharacter = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await disneyService.getCharacterById(id);
                setCharacter(data);

            } catch (err) {
                console.error('Error: something went wrong.', err.message);
                setError(err.message);
                setCharacter(null);

            } finally {
                setLoading(false);
            }
        };

        //Se l'id corrisponde ad un personaggio, fai partire loadCharacter().
        //Utilizziamo void perchè non vogliamo che la promise venga gestita qui (è già stata gestita sopra)
        //Stiamo utilizzando loadCharacter come variabile che contiene una funzione
        if (id) {
            void loadCharacter();
        }
    }, [id]); // L'id è il parametro per effettuare la callback. Quando l'id cambia, si effettua la callback.
    //La cleanup è implicita, viene fatta ogni volta che viene renderizzato un nuovo personaggio, ma questo non vale per le chiamate all'API

    //Gestione della navigazione tra le pagine singole (prev/next)
    //Qui si converte l'id corrente a numero intero (garantendo che si possa fare -1 e +1)
    const currentId = parseInt(id);
    if (isNaN(currentId) || currentId < MIN_CHARACTER_ID || currentId > MAX_CHARACTER_ID) {
        console.log('❌ ID fuori range:', currentId);
        navigate('/404', { replace: true });
        return;
    }

    //Vai al personaggio precedente: decremento di 1 dell'id (controllando che sia >0) utilizzando navigate
    const goToPrev = () => {
        const prevId = currentId - 1;
        if (prevId > 0) {
            navigate(`/characters/${prevId}`);
        }
    };

    //Vai al personaggio successivo: incremento di 1 dell'id utilizzando navigate
    const goToNext = () => {
        const nextId = currentId + 1;
        navigate(`/characters/${nextId}`);
    };

    //Gestione del pulsante "Torna alla lista", che riporta alla pagina Characters.jsx
    const goBack = () => {
        navigate('/characters');
    };

    //Controllo dei limiti degli id:
    //Disabilita il pulsante prev se siamo all'id 1
    const hasPrev = currentId > 1;

    // Disabilita il pulsante next se siamo all'id 9820
    const hasNext = currentId < 9820;

    // Parametri passati alla view
    return {
        character,
        loading,
        error,
        goToPrev,
        goToNext,
        goBack,
        hasPrev,
        hasNext,
        currentId
    };
};