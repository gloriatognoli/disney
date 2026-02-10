import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import { useCharacterDetailViewModel } from '../../viewmodels/useCharacterDetailViewModel';
import style from './CharacterDetail.module.css';
import mickeySpinnerGrey from "../../assets/mickeySpinnerGrey.svg";
import confusedMinnie from "../../assets/confusedMinnie.png";

export const CharacterDetail = () => {
    const {
        character,
        loading,
        error,
        goToPrev,
        goToNext,
        goBack,
        hasPrev,
        hasNext,
        currentId
    } = useCharacterDetailViewModel();

    //Visualizzazione dello stato di caricamento della pagina
    if (loading) {
        return (
            <Container className={style.container}>
                <div className={style.loadingContainer}>
                    <img className={style.spinner}
                         src={mickeySpinnerGrey}
                         alt="Loading" />
                    <p className={style.loadingText}>Loading character...</p>
                </div>
            </Container>
        );
    }

    //Gestione della visualizzazione dei personaggi con id presente nell'API ma undefined (1<id<9820 ma senza personaggio)
    if (character.name === undefined) {
        return (
            <Container className={style.container}>
                <div className={style.errorContainer}>
                    <h2 className={style.errorTitle}>No one is here...</h2>
                    <img
                        src={confusedMinnie}
                        alt="Is anyone here?"/>
                    <p className={style.errorText}>{error}</p>
                    <div className={style.errorActions}>
                        {hasPrev && (
                            <Button onClick={goToPrev} className={style.tryBtn}>
                            Try loading the previous character
                            </Button>)}
                        {hasNext && (
                            <Button onClick={goToNext} className={style.tryBtn}>
                                Try loading the next character
                            </Button>
                        )}
                    </div>
                </div>
            </Container>
        );
    }

    //Gestione della visualizzazione dei dati del personaggio, che sono contenuti ciascuno in una variabile value:
    //Se per una categoria non c'è value, mostra Unknown; se ce n'è più di una, separa i valori con una virgola. Altrimenti mostra Unknown
    const displayValue = (value) => {
        if (!value) return <span className={style.unknown}>Unknown</span>;
        if (Array.isArray(value)) {
            return value.length > 0 ? value.join(', ') : <span className={style.unknown}>Unknown</span>;
        }
        return value;
    };

    //Visualizzazione dei dati del personaggio
    return (
        <Container className={style.container}>
            {/* Header della card con bottone di navigazione e ID del personaggio*/}
            <div className={style.header}>
                <Button onClick={goBack} className={style.backBtn}>
                    Go back to characters' list
                </Button>
                <span className={style.idBadge}>{currentId}</span>
            </div>

            {/* Contenuto principale della card */}
            <Row className={style.content}>
                {/* Colonna immagine */}
                <Col md={5} className={style.imageColumn}>
                    <div className={style.imageContainer}>
                        <img
                            src={character.imageUrl}
                            alt={character.name}
                            className={style.image}
                        />
                    </div>
                </Col>

                {/* Colonna dettagli */}
                <Col md={7} className={style.detailsColumn}>
                    <h1 className={style.title}>{character.name}</h1>

                    {/* Informazioni */}
                    <div className={style.infoSection}>
                        <div className={style.infoRow}>
                            <span className={style.label}>Movies:</span>
                            <span className={style.value}>{displayValue(character.films)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>TV Series:</span>
                            <span className={style.value}>{displayValue(character.tvShows)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>Videogames:</span>
                            <span className={style.value}>{displayValue(character.videoGames)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>Park Attractions:</span>
                            <span className={style.value}>{displayValue(character.parkAttractions)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>Allies:</span>
                            <span className={style.value}>{displayValue(character.allies)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>Enemies:</span>
                            <span className={style.value}>{displayValue(character.enemies)}</span>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Navigazione Prev/Next */}
            <div className={style.navigation}>
                <Button
                    size="lg"
                    onClick={goToPrev}
                    disabled={!hasPrev}
                    className={style.navBtn}
                >
                    ← Precedente
                </Button>

                <Button
                    size="lg"
                    onClick={goToNext}
                    disabled={!hasNext}
                    className={style.navBtn}
                >
                    Successivo →
                </Button>
            </div>
        </Container>
    );
};

export default CharacterDetail;