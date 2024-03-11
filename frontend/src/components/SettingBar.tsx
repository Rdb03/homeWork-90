import toolState from "../store/toolState.ts";

const SettingBar = () => {
    return (
        <div className="setting-bar" style={{top: 40}}>
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id="line-width"
                type="number" defaultValue={1} min={1} max={50}/>
        </div>
    );
};

export default SettingBar;