import './Home.css';

import NavBar from '../../Component/NavBar/NavBar';
import FirstShow from '../../Component/FirstShow/FirstShow';
import About from '../../Component/About/About';
import Skils from '../../Component/Skils/Skils';
import Experience from '../../Component/Experince/Experince';
import Projects from '../../Component/Projects/Projects';
import Footer from '../../Component/footer/Footer';


function Home() {
    return (
        <>
            <NavBar />

            <div id="home">
                <FirstShow />
            </div>

            <div id="about">
                <About />
            </div>

            <div id="skills">
                <Skils />
            </div>

            <div id="experience">
                <Experience />
            </div>

            <Projects />

            <div id="contact">
                <Footer />
            </div>
        </>
    );
}


export default Home;