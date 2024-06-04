import { useEffect, useState } from "react";
const Notes = () => {
    const [notes, setnotes] = useState([{
        title: "",
        data: ""
    }])
    const [value, setvalue] = useState([])
    useEffect(() => {
        const store = localStorage.getItem("data1")
        if (store) {
            setvalue(JSON.parse(store));
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('data1', JSON.stringify(notes));
    }, [value]);
    const handleAddTask = (e) => {
        if (notes.title && notes.data) {
            setvalue([...value, notes]);
            setnotes([{
                title: "",
                data: ""
            }])
        }
    }

    return (
        <div className="note">
            <h1>Notes</h1>
            <input type="text" placeholder="Add title" value={notes.title} onChange={(e) => setnotes({ ...notes, title: e.target.value })}></input>
            <br></br>
            <textarea placeholder="Add text" value={notes.data} onChange={(e) => setnotes({ ...notes, data: e.target.value })}></textarea>
            <button onClick={handleAddTask}>Submit</button>
            {value.map((item, index) => (
                <div key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.data}</p>
                    <button >Remove Task</button>
                </div>
            ))}
        </div>
    )
}
export default Notes;
// import { useEffect, useState } from "react";

// const Notes = () => {
//     const [notes, setNotes] = useState([{ title: "", data: "" }]);
//     const [value, setValue] = useState([]);

//     useEffect(() => {
//         const store = localStorage.getItem("data1");
//         if (store) {
//             setValue(JSON.parse(store));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('data1', JSON.stringify(value));
//     }, [value]);

//     const handleAddTask = (e) => {
//         if (notes.title && notes.data) {
//             setValue([...value, notes]);
//             setNotes({ title: "", data: "" });
//         }
//     };

//     const handleRemoveTask = (index) => {
//         const newTasks = [...value];
//         newTasks.splice(index, 1);
//         setValue(newTasks);
//     };

//     return (
//         <div className="note">
//             <h1>Notes</h1>
//             <input
//                 type="text"
//                 placeholder="Add title"
//                 value={notes.title}
//                 onChange={(e) => setNotes({ ...notes, title: e.target.value })}
//             />
//             <br />
//             <textarea
//                 placeholder="Add text"
//                 value={notes.data}
//                 onChange={(e) => setNotes({ ...notes, data: e.target.value })}
//             ></textarea>
//             <button onClick={handleAddTask}>Submit</button>
//             {value.map((item, index) => (
//                 <div key={index}>
//                     <h3>{item.title}</h3>
//                     <p>{item.data}</p>
//                     <button onClick={() => handleRemoveTask(index)}>Remove Task</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Notes;

// import tdlogo from './tdlogo.png';
// import { useState, useEffect } from 'react';

// const Todo = () => {
//     const [note, setNote] = useState({ todo: "", desc: "" });
//     const [items, setItems] = useState([]);


//     // Load items from local storage on component mount
//     useEffect(() => {
//         const storedItems = localStorage.getItem('todoItems');
//         if (storedItems) {
//             setItems(JSON.parse(storedItems));
//         }
//     }, []); // Empty dependency array ensures this effect runs only once, on component mount

//     const handleSubmit = () => {
//         if (note.todo.trim() !== "") {
//             setItems([...items, note]);
//             setNote({ todo: "", desc: "" });
//         }
//     };

//     const handleDelete = (index) => {
//         const newItems = [...items];
//         newItems.splice(index, 1);
//         setItems(newItems);

//     };

//     useEffect(() => {
//         // localStorage.setItem('todoItems', JSON.stringify(items));
//         localStorage.setItem('todoItems', JSON.stringify(items));
//     }, [items]); // Update local storage whenever items change

//     return (
//         <div className="todo-div">
//             <div>
//                 <img src={tdlogo} alt="tdlogo" />
//             </div>
//             <div style={{ color: 'lightgreen' }}>
//                 <h2>ADD YOUR LIST HERE</h2>
//                 <input
//                     placeholder='Add todo'
//                     value={note.todo}
//                     onChange={(e) => setNote({ ...note, todo: e.target.value })}
//                 />
//                 <br />
//                 <input
//                     placeholder='Description'
//                     value={note.desc}
//                     onChange={(e) => setNote({ ...note, desc: e.target.value })}
//                 />
//                 <button onClick={handleSubmit}>Add</button>
//             </div>
//             <div>
//                 <h2>TODO LIST</h2>
//                 <ul>
//                     {items.map((item, index) => (
//                         <li key={index}>
//                             <strong>{item.todo}</strong>: {item.desc}
//                             <button onClick={() => handleDelete(index)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Todo;
// import tdlogo from './tdlogo.png';
// import { useState, useEffect } from 'react';
// const Todo = () => {
//     const [Notes, setnotes] = useState([{
//         todo: "",
//         desc: ""

//     }
//     ]
//     )
//     const [items, setItems] = useState([]);
//     const Handlesubmit = () => {

//         console.log("Submitted todo:", JSON.stringify(Notes));
//         // console.log("Submitted description:", Notes.desc);
//         localStorage.setItem('fdf', JSON.stringify(Notes))
//         // Clear the input fields after submission
//         setnotes({
//             todo: "",
//             desc: ""
//         });
//     }
//     useEffect(() => {
//         const store = localStorage.getItem('fdf')
//         if (store) {
//             setItems(JSON.parse(store))
//         }
//     }, [])
//     return (
//         <div className="todo-div">
//             <div className="">
//                 <img src={tdlogo} alt="tdlogo"></img>
//             </div>
//             <div style={{ color: 'lightgreen' }}>
//                 <h2>ADD YOUR LIST HERE</h2>
//                 <input placeholder='Add todo' value={Notes.todo} onChange={(e) => setnotes({ ...Notes, todo: e.target.value })}></input>
//                 <br />
//                 <input placeholder='description' value={Notes.desc} onChange={(e) => setnotes({ ...Notes, desc: e.target.value })}></input>
//                 <button onClick={Handlesubmit}>Add</button>
//             </div>
//         </div>
//     );
// }
// export default Todo;