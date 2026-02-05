// src/views/Characters/Characters.jsx
import React from 'react';
import { Container, Button, Spinner, Input, InputGroup, InputGroupText } from 'reactstrap';
import { useCharactersViewModel } from '../../viewmodels/useCharactersViewModel';
import CharacterList from '../components/CharacterList/CharacterList.jsx'
import  CharacterCardGrid  from '../components/CharacterCardGrid/CharacterCardGrid.jsx';
import style from './Characters.module.css';

export const Characters = () => {
    const {
        characters,
        allCharacters,
        loading,
        loadMoreCharacters,
        hasMore,
        searchTerm,
        handleSearchChange,
        clearSearch,
        isSearching,
        filteredCount,
        viewMode,
        toggleViewMode
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
                <div className={style.header}>
                    <div className={style.headerLeft}>
                        <h1 className={style.title}>Personaggi Disney</h1>
                        <p className={style.count}>
                            {isSearching
                                ? `${filteredCount} risultat${filteredCount === 1 ? 'o' : 'i'} della ricerca`
                                : `${allCharacters.length} personaggi caricati${allCharacters.length >= 500 ? ' (massimo raggiunto)' : ''}`
                            }
                        </p>
                    </div>

                    {/* 🆕 Toggle Segmented Control */}
                    <div className={style.toggleContainer}>
                        <div className={style.toggleBtnGradient}>
                            <button
                                className={`${style.toggleOption} ${viewMode === 'grid' ? style.active : style.inactive}`}
                                onClick={() => viewMode !== 'grid' && toggleViewMode()}
                                aria-label="Vista griglia"
                            >
                                <span className={style.toggleIcon}>⊞</span>
                                <span>Griglia</span>
                            </button>
                            <button
                                className={`${style.toggleOption} ${viewMode === 'list' ? style.active : style.inactive}`}
                                onClick={() => viewMode !== 'list' && toggleViewMode()}
                                aria-label="Vista lista"
                            >
                                <span className={style.toggleIcon}>☰</span>
                                <span>Lista</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className={style.searchSection}>
                <InputGroup className={style.searchBar}>
                    <InputGroupText className={style.searchIcon}>
                        🔍
                    </InputGroupText>
                    <Input
                        type="text"
                        placeholder="Cerca un personaggio per nome..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className={style.searchInput}
                    />
                    {isSearching && (
                        <Button
                            color="secondary"
                            outline
                            onClick={clearSearch}
                            className={style.clearBtn}
                        >
                            ✕
                        </Button>
                    )}
                </InputGroup>

                {/* Risultati ricerca */}
                {isSearching && (
                    <p className={style.searchResults}>
                        {filteredCount === 0
                            ? `Nessun personaggio trovato per "${searchTerm}"`
                            : `${filteredCount} ${filteredCount === 1 ? 'personaggio trovato' : 'personaggi trovati'}`
                        }
                    </p>
                )}
            </div>

            {/* Griglia personaggi */}
            {filteredCount > 0 ? (
                <div className={style.contentContainer}>
                    {viewMode === 'grid' ? (
                        // Visualizzazione GRIGLIA
                        <CharacterCardGrid
                            characters={characters}
                            col={gridColumns}
                        />
                    ) : (
                        // Visualizzazione LISTA
                        <CharacterList
                            characters={characters}
                        />
                    )}
                </div>
            ) : !loading && (
                <div className={style.noResults}>
                    <p className="mb-0">😢 Nessun personaggio trovato</p>
                    {isSearching && (
                        <Button
                            color="primary"
                            onClick={clearSearch}
                            className="mt-3"
                        >
                            Mostra tutti i personaggi
                        </Button>
                    )}
                </div>
            )}

            {/* Bottone carica altri - nascondi se c'è ricerca attiva */}
            {!isSearching && hasMore && (
                <div className={style.searchLoading}>
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
            {!isSearching && !hasMore && allCharacters.length >= 500 && (
                <div className={style.maxReached}>
                    <div className={style.maxReachedContent}>
                        <span className={style.star}>✨</span>
                        <p className="mb-0">Hai caricato tutti i 500 personaggi Disney!</p>
                        <span className={style.star}>✨</span>
                    </div>
                </div>
            )}
        </Container>
);
};

export default Characters;




