import React from 'react';
import { Container, Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import { useCharactersViewModel } from '../../viewmodels/useCharactersViewModel';
import CharacterList from '../components/CharacterList/CharacterList.jsx'
import  CharacterCardGrid  from '../components/CharacterCardGrid/CharacterCardGrid.jsx';
import style from './Characters.module.css';
import searchIcon from '../../assets/searchIcon.svg';
import clearSearchIcon from '../../assets/clearSearchIcon.svg';
import mickeySpinnerGrey from '../../assets/mickeySpinnerGrey.svg';

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

    const gridColumns = {
        xs: 1,  // Mobile: 1 per riga
        sm: 2,  // Tablet piccolo: 2 per riga
        md: 3,  // Tablet: 3 per riga
        lg: 3,  // Desktop: 3 per riga
        xl: 3   // Desktop grande: 3 per riga
    };

    return (
        <Container className={style.pageContainer}>
            {/* Header: Titolo della pagina e rendering condizionale di un paragrafo che mostra il numero di personaggi caricati*/}
            <div className={style.header}>
                <div className={style.header}>
                    <div className={style.headerLeft}>
                        <h1 className={style.title}>Disney Characters</h1>
                        <p className={style.count}>
                            {isSearching
                                ? `${filteredCount} results`
                                : `${allCharacters.length} characters loaded${allCharacters.length >= 9820 ? ' (All characters loaded)' : ''}`
                            }
                        </p>
                    </div>

                    {/* Toggle: Pulsante che switcha tra la visualizzazione grid e list (sempre tramite rendering condizionale */}
                    <div className={style.toggleContainer}>
                        <div className={style.toggleBtnGradient}>
                            <button className={`${style.toggleOption} ${viewMode === 'grid' ? style.active : style.inactive}`}
                                onClick={() => viewMode !== 'grid' && toggleViewMode()}
                                aria-label="Grid view">
                                <span>Grid</span>
                            </button>

                            <button className={`${style.toggleOption} ${viewMode === 'list' ? style.active : style.inactive}`}
                                onClick={() => viewMode !== 'list' && toggleViewMode()}
                                aria-label="List view">
                                <span>List</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Barra di ricerca personaggi per name con pulsante di invio ricerca e di cancellazione della ricerca */}
            <div className={style.searchSection}>
                <InputGroup className={style.searchBar}>
                    <InputGroupText className={style.searchIcon}>
                        <img src={searchIcon} alt="Search" />
                    </InputGroupText>

                    <Input
                        type="text"
                        placeholder="Search for your character by name..."
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
                            <img src={clearSearchIcon} alt="Clear" />
                        </Button>
                    )}
                </InputGroup>

                {/* Visualizzazione dei risultati della ricerca con rendering condizionale;
                    Il simbolo $ è utilizzato convenzionalmente per selezionare un elemento jsx specifico (contenuto in una variabile) */}
                {isSearching && (
                    <p className={style.searchResults}>
                        {filteredCount === 0
                            ? `No results for "${searchTerm}"`
                            : `${filteredCount} ${filteredCount === 1 ? 'character found' : 'characters found'}`
                        }
                    </p>
                )}
            </div>

            {/* Visualizzazione dei personaggi con redering condizionale
             (diversa a seconda che sia selezionata la griglia o la lista) */}
            {filteredCount > 0 ? (
                <div className={style.contentContainer}>
                    {viewMode === 'grid' ? (

                        // Visualizzazione grid (characters viene passata come prop dal viewmodel, importata come hook function)
                        <CharacterCardGrid
                            characters={characters}
                            col={gridColumns}
                        />
                    ) : (
                        // Visualizzazione list (anche qui characters viene passata come prop dal viewmodel, importata come hook function)
                        <CharacterList
                            characters={characters}
                        />
                    )}
                </div>

            ) : !loading && (
                <div className={style.noResults}>
                    <p className="mb-0">No characters found. Try again!</p>
                    {isSearching && (
                        //Bottone che, in caso di character not found, cancella la ricerca e riporta alla visualizzazione di tutti i personaggi
                        //mantenendo la visualizzazione (grid/list) che c'era prima
                        <Button
                            color="primary"
                            onClick={clearSearch}
                            className="mt-3"
                        >
                            Show all characters
                        </Button>
                    )}
                </div>
            )}

            {/* Bottone di caricamento di  altri personaggi - nascosto se la ricerca è attiva */}
            {!isSearching && hasMore && (
                <div className={style.searchLoading}>
                    <Button
                        size="lg"
                        className={style.loadMoreBtn}
                        onClick={loadMoreCharacters}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <img className={style.spinner}
                                    src={mickeySpinnerGrey}
                                    alt="Loading" />
                                <span className="ms-2">Loading...</span>
                            </>
                        ) : (
                            <>
                                <span>Load more characters</span>
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* Messaggio limite raggiunto tutti i personaggi caricati. nel condizionale se non sta caricando e non ne ha altri da caricare */}
            {!isSearching && !hasMore && allCharacters.length >= 9820 && (
                <div className={style.maxReached}>
                    <div className={style.maxReachedContent}>
                        <p className="mb-0">You loaded all Disney characters!</p>
                    </div>
                </div>
            )}
        </Container>
);
};

export default Characters;




