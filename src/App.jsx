import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Home from './page/Home/Home';
import ProjectDetails from './page/ProjectDetails/ProjectDetails';

import {
    ThemeProvider
} from './context/ThemeContext';

import {
    LanguageProvider
} from './context/LanguageContext';


function App() {

    return (

        <ThemeProvider>

            <LanguageProvider>

                <BrowserRouter>

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/projects/:projectId"
                            element={<ProjectDetails />}
                        />

                    </Routes>

                </BrowserRouter>

            </LanguageProvider>

        </ThemeProvider>

    );

}


export default App;