import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import style from './Info.module.css';

const Info = () => {
    return (
        <Container className={style.pageContainer}>
            {/* Hero Section: titolo della pagina */}
            <div className={style.hero}>
                <h1 className={style.mainTitle}>About This Project</h1>
            </div>

            {/* Contenuto principale */}
            <Row className={style.contentRow}>
                {/* Descrizione del progetto */}
                <Col lg="8" className="mb-4">
                    <Card className={style.card}>
                        <CardBody>
                            <h2 className={style.sectionTitle}>What is this project?</h2>
                            <p className={style.text}>
                                This project is a Single Page Application designed
                                to help fans explore and discover their favorite Disney characters.
                                From classic animated heroes to modern favorites, our platform provides
                                detailed information about hundreds of beloved characters from the
                                Disney universe.
                            </p>
                            <p className={style.text}>
                                Built with Vite and React v.19.2.0 and powered by the Disney API,
                                this application offers an intuitive interface to browse, search,
                                and learn about the iconic characters that have shaped childhoods
                                and continue to inspire audiences worldwide.
                            </p>
                            <p className={style.text}>
                                Whether you're a casual Disney fan or a dedicated enthusiast,
                                our platform makes it easy to dive deep into the stories, films,
                                and adventures of your favorite characters.
                            </p>
                        </CardBody>
                    </Card>

                    {/* Caratteristiche e funzionalità del progetto */}
                    <Card className={`${style.card} mt-4`}>
                        <CardBody>
                            <h2 className={style.sectionTitle}>Key Features</h2>
                            <ul className={style.featureList}>
                                <li>Browse over 500 Disney characters with detailed information</li>
                                <li>Search functionality to quickly find your favorite characters</li>
                                <li>Responsive design that works seamlessly on all devices</li>
                                <li>Grid and list view options for personalized browsing</li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>

                {/* Informazioni generali (sidebar) */}
                <Col lg="4">
                    {/* Informazioni e link all'API */}
                    <Card className={`${style.card} ${style.highlightCard} mb-4`}>
                        <CardBody>
                            <h3 className={style.cardTitle}>Powered By</h3>
                            <p className={style.text}>
                                This application uses the Disney API to fetch real-time data
                                about Disney characters.
                            </p>
                            <a
                                href="https://disneyapi.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button color="primary" className={style.apiButton}>
                                    Visit Disney API
                                </Button>
                            </a>
                        </CardBody>
                    </Card>

                    {/* Chi siamo? */}
                    <Card className={style.card}>
                        <CardBody>
                            <h3 className={style.cardTitle}>Created By</h3>
                            <div className={style.creator}>
                                <div className={style.creatorIcon}>GT</div>
                                <div className={style.creatorInfo}>
                                    <h4 className={style.creatorName}>Gloria Tognoli</h4>
                                    <p className={style.creatorRole}>Developer</p>
                                </div>
                            </div>
                            <div className={style.creator}>
                                <div className={style.creatorIcon}>AP</div>
                                <div className={style.creatorInfo}>
                                    <h4 className={style.creatorName}>Annalisa Perrini</h4>
                                    <p className={style.creatorRole}>Developer</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Card riassuntiva sul progetto */}
                    <Card className={`${style.card} mt-4`}>
                        <CardBody>
                            <h3 className={style.cardTitle}>Project Info</h3>
                            <div className={style.infoItem}>
                                <span className={style.infoLabel}>Year:</span>
                                <span className={style.infoValue}>2026</span>
                            </div>
                            <div className={style.infoItem}>
                                <span className={style.infoLabel}>Framework:</span>
                                <span className={style.infoValue}>React 19.2.0 with Vite</span>
                            </div>
                            <div className={style.infoItem}>
                                <span className={style.infoLabel}>Pattern:</span>
                                <span className={style.infoValue}>MVVM</span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Info;