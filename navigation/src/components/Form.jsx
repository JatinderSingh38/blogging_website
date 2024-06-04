import { useState } from "react";

const Form = () => {
    const [FormData, setFormData] = useState({
        name: "",
        age: ""
    });
    const [Errors, setErrors] = useState({});

    const handleSubmit = () => {
        let errors = {};

        if (!FormData.name.trim()) {
            errors.name = 'Name is required';
            // console.log("error", errors)
        }
        if (!FormData.age) {
            errors.age = 'age is required';
            // console.log("error", errors)
        }

        if (JSON.stringify(errors) === '{}') {
            // Errors not found, update the state to display error messages
            console.log("fd", FormData)
            setFormData({ name: "", age: "" });
            alert("Form submitted successfully");
        }
        console.log("fd2", FormData)
        setErrors(errors);

    };

    return (
        <div style={{ backgroundColor: 'green', textAlign: 'center' }}>
            <h3>FORM</h3>
            <input
                type='text'
                placeholder="Username"
                value={FormData.name}
                onChange={(e) => {
                    setFormData({ ...FormData, name: e.target.value });
                    setErrors({ ...Errors, name: "" }); // Clear error message
                }
                }
            />
            <br />
            {Errors.name && <span style={{ color: "red" }}>{Errors.name}</span>}
            <br />
            <input
                type='text'
                placeholder="Age"
                value={FormData.age}
                onChange={(e) => {
                    setFormData({ ...FormData, age: e.target.value });
                    setErrors({ ...Errors, age: "" }); // Clear error message
                }
                }
            />
            <br />
            {Errors.age && <span style={{ color: "red" }}>{Errors.age}</span>}
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
export default Form

//another method for form validating
// import { useState } from "react";
// const Form = () => {
//     const [name, setName] = useState("");
//     const [age, setAge] = useState("");
//     const [nameError, setNameError] = useState("");
//     const [ageError, setAgeError] = useState("");

//     const handleSubmit = () => {
//         let nameError = "";
//         let ageError = "";

//         if (!name.trim()) {
//             nameError = 'Name is required';
//         }
//         if (!age) {
//             ageError = 'Age is required';
//         }

//         setNameError(nameError);
//         setAgeError(ageError);

//         if (!nameError && !ageError) {
//             console.log("Name:", name);
//             console.log("Age:", age);
//             setName("");
//             setAge("");
//             alert("Form submitted successfully");
//         }
//     };

//     return (
//         <div style={{ backgroundColor: 'green', textAlign: 'center' }}>
//             <h3>FORM</h3>
//             <input
//                 type='text'
//                 placeholder="Username"
//                 value={name}
//                 onChange={(e) => {
//                     setName(e.target.value);
//                     setNameError(""); // Clear error message
//                 }}
//             />
//             <br />
//             {nameError && <span style={{ color: "red" }}>{nameError}</span>}
//             <br />
//             <input
//                 type='text'
//                 placeholder="Age"
//                 value={age}
//                 onChange={(e) => {
//                     setAge(e.target.value);
//                     setAgeError(""); // Clear error message
//                 }}
//             />
//             <br />
//             {ageError && <span style={{ color: "red" }}>{ageError}</span>}
//             <br />
//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//     );
// };
// export default Form;




// import { useState } from "react";
// const Form = () => {
//     const [FormData, setFormData] = useState({
//         name: "",
//         age: ""
//     })
//     const [Errors, setErrors] = useState({});
//     const HandleSubmit = () => {
//         let error = {}
//         if (FormData.name.trim() == "") {
//             setErrors(error.name)
//             error.name = 'name is required';
//             setErrors({ error })
//             console.log("error", error)
//         }
//         else {
//             console.log("formdata", FormData)
//             alert("form submitteds")
//         }

//         // navigate("/Naive", {
//         //     state: {
//         //         name: "",
//         //     }
//         // })
//         setFormData({ name: "", age: "" });
//     }
//     return (
//         <div style={{ backgroundColor: 'green', textAlign: 'center' }}>
//             <h3>FORM</h3>
//             <input type='text' placeholder="username" value={FormData.name} onChange={(e) => setFormData({ ...FormData, name: e.target.value })
//             }></input>
//             {Errors.name && <p style={{ color: "red" }}>{Errors.name}</p>}
//             <br />
//             <input type='text' placeholder="text" value={FormData.age} onChange={(e) => setFormData({ ...FormData, age: e.target.value })}></input>
//             <br />
//             <button onClick={HandleSubmit}>submit</button>
//         </div>
//     )
// }
// export default Form