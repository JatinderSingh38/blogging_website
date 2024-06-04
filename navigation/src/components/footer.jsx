
const Footer = () => {

    return (
        <>
            <div className="footer">
                <div className="upperfooter">
                    <div className="part1">
                        <h1 className="font3">
                            Training<span className="span-tag">Blog</span>
                        </h1>
                        <p className="blog-para">
                            Welcome to our technical blog, where we delve into the
                            <br /> world of cutting-edge technologies and explore their
                            <br /> practical applications.
                        </p>
                    </div>
                    <div className="part2">
                        <h1 className="font4">CATEGORY</h1>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JAVASCRIPT</li>
                            <li>VS CODE</li>
                        </ul>
                    </div>
                    <div className="part3">
                        <h1 className="font4">GET IN TOUCH</h1>
                        <ul>
                            <li>+91-8XXX-XXX-XX</li>
                            <li>jdemo@gmail.com</li>
                        </ul>
                    </div>
                    <div className="part4">
                        <h1 className="font4">FOLLOW US ON</h1>
                        <i className="fa-brands fa-twitter social" />
                        <i className="fa-brands fa-instagram social" />
                        <i className="fa-brands fa-linkedin-in social" />
                    </div>
                </div>
                <div className="lowerfooter">
                    <p>© 123 TRAININGBLOG</p>
                    <p>MADE WITH ❤️ MOHALI, INDIA</p>
                </div>
            </div>

        </>
    )
}
export default Footer