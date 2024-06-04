import { Link } from "react-router-dom";
const Nav = () => {

    const handleLogout = () => {
        localStorage.removeItem('token')
    }

    return (
        <>
            <div className='navbar'>

                <ul>
                    <Link to="/Home" className="nbar">Home</Link>
                </ul>
                <ul>
                    <Link to="/Services" className="nbar">Service</Link>
                </ul>
                <ul>
                    <Link to="/About" className="nbar">Figma</Link>
                </ul>
                <ul>
                    <Link to="/Contactus" className="nbar">Contact</Link>
                </ul>
                <ul>
                    <span onClick={handleLogout} ><Link to="/" className="nbar">Logout</Link></span>
                </ul>
                {/* <div className="nbar">{msg.state.isNav?"true":"fAlse"}</div> */}


            </div>

        </>
    );
}

export default Nav
