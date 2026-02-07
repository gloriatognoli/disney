import React from 'react';
import { Container, Button, Spinner, Row, Col } from 'reactstrap';
import { useCharacterDetailViewModel } from '../../viewmodels/useCharacterDetailViewModel';
import style from './CharacterDetail.module.css';
import { Navigate } from 'react-router-dom';

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

    // LOADING STATE
    if (loading) {
        return (
            <Container className={style.container}>
                <div className={style.loadingContainer}>
                    <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
                    <p className={style.loadingText}>Caricamento personaggio...</p>
                </div>
            </Container>
        );
    }

    // ERROR STATE
    if (error) {
        return (
            <Container className={style.container}>
                <div className={style.errorContainer}>
                    <h2 className={style.errorTitle}>😢 Oops!</h2>
                    <p className={style.errorText}>{error}</p>
                    <div className={style.errorActions}>
                        <Button color="primary" onClick={goBack}>
                            Torna alla lista
                        </Button>
                        {hasPrev && (
                            <Button color="secondary" outline onClick={goToPrev}>
                                Prova personaggio precedente
                            </Button>
                        )}
                    </div>
                </div>
            </Container>
        );
    }

    // NO CHARACTER (non dovrebbe succedere)
    if (character === undefined) {
        return <Navigate to="404" replace />
    }

    // HELPER FUNCTION: Mostra valore o "Unknown"
    const displayValue = (value) => {
        if (!value) return <span className={style.unknown}>Unknown</span>;
        if (Array.isArray(value)) {
            return value.length > 0 ? value.join(', ') : <span className={style.unknown}>Unknown</span>;
        }
        return value;
    };

    // MAIN RENDER
    return (
        <Container className={style.container}>
            {/* Header con navigazione */}
            <div className={style.header}>
                <Button color="secondary" outline onClick={goBack} className={style.backBtn}>
                    ← Torna alla lista
                </Button>
                <span className={style.idBadge}>ID: {currentId}</span>
            </div>

            {/* Contenuto principale */}
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
                            <span className={style.label}>🎬 Film:</span>
                            <span className={style.value}>{displayValue(character.films)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>📺 Serie TV:</span>
                            <span className={style.value}>{displayValue(character.tvShows)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>🎮 Videogiochi:</span>
                            <span className={style.value}>{displayValue(character.videoGames)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>🎪 Attrazioni nei parchi:</span>
                            <span className={style.value}>{displayValue(character.parkAttractions)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>👥 Alleati:</span>
                            <span className={style.value}>{displayValue(character.allies)}</span>
                        </div>

                        <div className={style.infoRow}>
                            <span className={style.label}>😈 Nemici:</span>
                            <span className={style.value}>{displayValue(character.enemies)}</span>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Navigazione Prev/Next */}
            <div className={style.navigation}>
                <Button
                    color="primary"
                    size="lg"
                    onClick={goToPrev}
                    disabled={!hasPrev}
                    className={style.navBtn}
                >
                    ← Precedente
                </Button>

                <Button
                    color="primary"
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