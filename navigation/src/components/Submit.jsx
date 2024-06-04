import { useLocation } from "react-router-dom"

const Submit = () => {
    const msg = useLocation();
    return (
        <div className="App">
            <h1>submit sucesfully</h1>
            <h1>name from Home: {msg.state.name}</h1>
            <h1>num from Home: {msg.state.age}</h1>
        </div>
    )
}
export default Submit