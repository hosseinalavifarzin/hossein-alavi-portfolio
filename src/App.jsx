import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import MainHome from './page/MainHome/MainHome';
import Home from './page/Home/Home';
import Blog from './page/Blog/Blog';
import BlogPost from './page/BlogPost/BlogPost';
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
                            element={
                                <MainHome />
                            }
                        />


                        <Route
                            path="/portfolio"
                            element={
                                <Home />
                            }
                        />


                        {/* =================================
                            DEFAULT BLOG LANGUAGE = FARSI
                        ================================== */}

                        <Route
                            path="/blog"
                            element={
                                <Navigate
                                    to="/blog/fa"
                                    replace
                                />
                            }
                        />


                        <Route
                            path="/blog/:language"
                            element={
                                <Blog />
                            }
                        />


                        <Route
                            path="/blog/:language/:slug"
                            element={
                                <BlogPost />
                            }
                        />


                        <Route
                            path="/projects/:projectId"
                            element={
                                <ProjectDetails />
                            }
                        />

                    </Routes>

                </BrowserRouter>

            </LanguageProvider>

        </ThemeProvider>
    );

}


export default App;