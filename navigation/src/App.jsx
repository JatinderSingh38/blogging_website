import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Ser from './components/Services';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contactus';
import Submit from './components/Submit';
import Signup from './components/signup';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';
import UpdateBlog from './components/updateblog';
import { useState, useEffect } from 'react';
import CreateBlog from './components/createblog';
import Userprofile from './components/userprofile';
import Fpassword from './components/forgetpassword';
import { Provider } from 'react-redux';
import { store } from './components/Redux/store';
const App1 = () => {
  const location = useLocation();
  console.log(location)
  const [hideNV, sethideNV] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname == "/" || location.pathname === "/signup" || location.pathname == "/userprofile" || location.pathname == "/forgetpassword") {
      sethideNV(true);
    }
    else {
      sethideNV(false);
    }
  }, [location]);
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      navigate('/About')
    }
  }, [token])
  return (
    <>

      {hideNV == false && <Header />}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/createblog" element={<CreateBlog />}></Route>
        <Route path="/updateblog/:id" element={<UpdateBlog />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Services" element={<Ser />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Contactus" element={<Contact />}></Route>
        <Route path="/Submit" element={<Submit />}></Route>
        <Route path="/userprofile" element={<Userprofile />}></Route>
        <Route path="/forgetpassword" element={<Fpassword />}></Route>
      </Routes>
      {hideNV == false && <Footer />}
      {/* <Geolocation /> */}
    </>
  )
}
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Nav /> */}
        <App1 />
        {/* <Form /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;

// import './App.css';
// import { BrowserRouter, Route, Routes, } from "react-router-dom";
// import Ser from './components/Services';
// import Home from './components/Home';
// import Nav from './components/Naive';
// import About from './components/About';
// import Contact from './components/Contactus';
// import Submit from './components/Submit';
// import Mapping from './components/Mapping';
// import Todo from './components/todo';
// import Login from './components/login'
// import Geolocation from './components/practice'

// function App() {
//   return (
//     <BrowserRouter>
//       {/* <Mapping /> */}
//       <Nav />
//       {/* <practice/> */}
//       <Routes>
//         <Route path="/" element={<Login />}></Route>
//         <Route path="/Services" element={<Ser />}></Route>
//         <Route path="/About" element={<About />}></Route>
//         <Route path="/Contactus" element={<Contact />}></Route>
//         <Route path="/Submit" element={<Submit />}></Route>
//       </Routes>
//       <Geolocation />
//     </BrowserRouter>
//   );
// }

// export default App;
