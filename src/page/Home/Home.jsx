import './Home.css';
import NavBar from '../../Component/NavBar/NavBar';
import FirstShow from '../../Component/FirstShow/FirstShow';
import About from '../../Component/About/About';
import Skils from '../../Component/Skils/Skils';
import ExperienceList from '../../Component/Experince/Experince';
import Footer from '../../Component/footer/Footer';
import  { useEffect } from 'react';
// import { DarkModeProvider } from '../../Component/Darkmode/Darkmode';



function Home() {
    useEffect(() => {
        // Your logic here if needed
    }, []);

    return (
        <>
        {/* <DarkModeProvider> */}
            <NavBar />
            <div id="home"><FirstShow /></div>
            <div id="about"><About /></div>
            <div id="skills"><Skils /></div>
            <div id="experience"><ExperienceList /></div>
            <div id="contact"><Footer /></div>
        {/* </DarkModeProvider> */}
        </>
    );
}




export default Home;