// src/views/Characters/Characters.jsx
import React from 'react';
import { Container, Button, Spinner } from 'reactstrap';
import { useCharactersViewModel } from '../../viewmodels/useCharactersViewModel';
import  CharacterCardGrid  from '../components/CharacterCardGrid/CharacterCardGrid.jsx';
import style from './Characters.module.css';

export const Characters = () => {
    const {
        characters,
        loading,
        loadMoreCharacters,
        hasMore
    } = useCharactersViewModel();

    // Configurazione colonne per la griglia responsive
    // 3 personaggi per riga su desktop, 2 su tablet, 1 su mobile
    const gridColumns = {
        xs: 1,  // Mobile: 1 per riga
        sm: 2,  // Tablet piccolo: 2 per riga
        md: 3,  // Tablet: 3 per riga
        lg: 3,  // Desktop: 3 per riga
        xl: 3   // Desktop grande: 3 per riga
    };

    return (
        <Container className={style.pageContainer}>
            {/* Header */}
            <div className={style.header}>
                <h1 className={style.title}>Personaggi Disney</h1>
                <p className={style.count}>
                    {characters.length} personaggi caricati
                    {characters.length >= 500 && ' (massimo raggiunto)'}
                </p>
            </div>

            {/* Griglia personaggi */}
            <div className={style.gridContainer}>
                <CharacterCardGrid
                    characters={characters}
                    col={gridColumns}
                />
            </div>

            {/* Bottone carica altri */}
            {hasMore && (
                <div className={style.loadMoreSection}>
                    <Button
                        color="primary"
                        size="lg"
                        className={style.loadMoreBtn}
                        onClick={loadMoreCharacters}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" className={style.spinner} />
                                <span className="ms-2">Caricamento in corso...</span>
                            </>
                        ) : (
                            <>
                                <span>Carica altri personaggi</span>
                                <span className={`ms-2 ${style.arrow}`}>↓</span>
                            </>
                        )}
                    </Button>

                    {loading && (
                        <p className={style.loadingText}>
                            Sto caricando nuovi personaggi Disney...
                        </p>
                    )}
                </div>
            )}

            {/* Messaggio limite raggiunto */}
            {!hasMore && characters.length >= 500 && (
                <div className={style.maxReached}>
                    <div className={style.maxReachedContent}>
                        <span className={style.star}>✨</span>
                        <p className="mb-0">Hai caricato tutti i 500 personaggi Disney!</p>
                        <span className={style.star}>✨</span>
                    </div>
                </div>
            )}

            {/* Messaggio se non ci sono personaggi */}
            {characters.length === 0 && !loading && (
                <div className={style.noCharacters}>
                    <p className="mb-0">Nessun personaggio disponibile</p>
                </div>
            )}
        </Container>
    );
};

export default Characters;