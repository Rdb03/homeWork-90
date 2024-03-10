import Toolbar from "./components/Toolbar.tsx";
import SettingBar from "./components/SettingBar.tsx";
import Canvas from "./components/Canvas.tsx";
import './styles/app.scss';

const App = () => {
    return (
        <div className="app">
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    )
};

export default App
