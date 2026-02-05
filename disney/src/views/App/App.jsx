import './App.css'
import MainTemplate from '../components/MainTemplate/MainTemplate.jsx';
import {HashRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import Home from '../Home/Home.jsx';
import Characters from '../Characters/Characters.jsx';
import CharacterDetail from '../CharacterDetail/CharacterDetail.jsx';
import Info from '../Info/Info.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Logo from '../../assets/logo_disney.png';

function App() {

    const nav = [
        {url: "/", text: "Home"},
        {url: "/characters", text: "Characters"},
        {url: "/info", text: "Info"}
    ];

    // Removed from Routes - reinsert later
    // <Route path="/characters" element={<Characters />}/>
    // <Route path="/info" element={<Info />}/>
    // <Route path="/characters/:_id" element={<CharacterDetail />}/>
    // <Route path="*" element={<NotFound />}/>

    return (

        <Router>

            <MainTemplate
                footerCourseName="Applicazioni Web: Progettazione e Sviluppo"
                footerCourseLink="https://elearning.unimib.it/course/view.php?id=61231"
                navItems={nav}
                logo={Logo}
            >

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/info" element={<Info />}/>
                    <Route path="*" element={<NotFound />}/>
                    <Route path="/characters" element={<Characters />}/>
                    <Route path="/characters/:id" element={<CharacterDetail />}/>
                </Routes>

            </MainTemplate>

        </Router>
    );
}

export default App;

