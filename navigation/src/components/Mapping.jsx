import { useState } from "react";
const Mapping = () => {
    const Dummydata = [
        { id: 1, name: "john", age: 25 },
        { id: 2, name: "alice", age: 27 },
        { id: 3, name: "jane", age: 29 }];
    const [formData, setFormData] = useState({ name: "", age: " " });
    const handlenameChange = (e) => {
        // console.log("Name changed:", e.target.value); // Log name change
        setFormData({ ...formData, name: e.target.value });

    };
    const handleageChange = (e) => {
        // console.log("Age changed:", e.target.value); // Log age change
        setFormData({ ...formData, age: e.target.value });
        console.log(JSON.stringify(formData))
    };
    return (
        <div className="App">
            <h1>mapping</h1>
            <ol>{
                Dummydata.map((item) => (
                    <li>{item.name} -age {item.age}</li>

                ))
            }<li>
                    <label>freind name</label>
                    <input type="text" placeholder="freindname" value={formData.name}
                        onChange={handlenameChange}
                    ></input>
                </li>
                <li>
                    <label>Age</label>
                    <input type="text" placeholder="freindname" value={formData.age}
                        onChange={handleageChange}
                    ></input>
                </li>
            </ol>

        </div>

    )
}
export default Mapping;