import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { disneyService } from '../models/disneyService.js';

export const useCharacterDetailViewModel = () => {
    // 1. LEGGI l'ID dalla URL (es: /Characters/123)
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. STATI
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. CARICA il personaggio quando l'ID cambia
    useEffect(() => {
        const loadCharacter = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log('📥 Caricamento personaggio ID:', id);
                const data = await disneyService.getCharacterById(id);
                setCharacter(data);
                console.log('✅ Personaggio caricato:', data.name);
            } catch (err) {
                console.error('❌ Errore:', err.message);
                setError(err.message);
                setCharacter(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCharacter();
        }
    }, [id]); // Si ricarica quando l'ID cambia

    // 4. LOGICA PREV/NEXT
    const currentId = parseInt(id);

    const goToPrev = () => {
        const prevId = currentId - 1;
        if (prevId > 0) {
            console.log('⬅️ Vai al personaggio', prevId);
            navigate(`/Characters/${prevId}`);
        }
    };

    const goToNext = () => {
        const nextId = currentId + 1;
        console.log('➡️ Vai al personaggio', nextId);
        navigate(`/Characters/${nextId}`);
    };

    const goBack = () => {
        navigate('/Characters');
    };

    // 5. CONTROLLI LIMITI
    // Disabilita "Prev" se siamo all'ID 1
    const hasPrev = currentId > 1;

    // Non possiamo sapere l'ultimo ID, quindi next è sempre abilitato
    // (se non esiste, la pagina mostrerà un errore)
    const hasNext = true;

    // 6. ESPOSIZIONE alla View
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