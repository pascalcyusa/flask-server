function Dashboard() {
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(null);
    const [boost, setBoost] = useState(0);
    const [time, setTime] = useState('00:00');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCommand = (command) => {
        switch (command) {
            case 'moveup':
                setDirection('up');
                break;
            case 'movedown':
                setDirection('down');
                break;
            case 'moveleft':
                setDirection('left');
                break;
            case 'moveright':
                setDirection('right');
                break;
            case 'stop':
                setDirection(null);
                setSpeed(0);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1>Robot Car Dashboard</h1>
            <p>Current Time: {time}</p>
            <p>Speed: {speed}</p>
            <p>Direction: {direction}</p>
            <button onClick={() => handleCommand('moveup')}>Move Up</button>
            <button onClick={() => handleCommand('movedown')}>Move Down</button>
            <button onClick={() => handleCommand('moveleft')}>Move Left</button>
            <button onClick={() => handleCommand('moveright')}>Move Right</button>
            <button onClick={() => handleCommand('stop')}>Stop</button>
        </div>
    );
}

ReactDOM.render(<Dashboard />, document.getElementById('root'));
