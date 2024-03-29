import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Toolbar from "./components/Toolbar.tsx";
import SettingBar from "./components/SettingBar.tsx";
import Canvas from "./components/Canvas.tsx";
import './styles/app.scss';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path='/:id/*' element={<>
                        <Toolbar />
                        <SettingBar />
                        <Canvas />
                    </>} />
                    <Route path='/' element={<Navigate to={`f${(+new Date).toString(16)}`} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
