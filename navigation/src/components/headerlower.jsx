import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from 'react';
import axios from 'axios';

const HeaderLower = ({ searchResults, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [titleClicked, setTitleClicked] = useState('');
    const [existingTitles, setExistingTitles] = useState([]);
    const [titleBox, setTitleBox] = useState(true);
    const handleSearch = async () => {
        try {
            // console.log("Search Term:", searchTerm);
            const response = await axios.get(`http://localhost:5000/search`, {
                params: {
                    searchTerm: searchTerm
                }
            });
            // console.log(response.data);
            onSearch(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleSearch();
        setSearchTerm("");
    }, [titleClicked]);

    const handleInputChange = async (value) => {
        setSearchTerm(value);
        try {
            const response = await axios.get(`http://localhost:5000/search`, {
                params: {
                    searchTerm: value
                }
            });
            setExistingTitles(response.data.map(result => result.title));
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="lowernavbar">
            <div className="leftlower">
                <div className="filter">
                    <p className="headingall">Filters</p>
                </div>
                <div className="filter-option">
                    <p className="font1">&nbsp;Title</p>
                    <input className="input" placeholder="All" />
                    <i className="fa-solid fa-caret-down icon-style1" />
                </div>
                <div className="filter-option">
                    <p className="font1">&nbsp;Published Date</p>
                    <input className="input" style={{ paddingRight: '1.5vw' }} type='date' placeholder="Select Date" />
                    {/* <i className="fa-solid fa-caret-down icon-style2" /> */}
                </div>
            </div>
            {/* Left side components */}
            {/* Right side components */}
            <div className="rightlower">
                <p className="font1">&nbsp;Search</p>
                <div className="input" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                    <input className="" style={{ flex: '1', marginRight: '5px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleInputChange(e.target.value);
                            setTitleBox(true);
                        }}
                    />
                    <button onClick={() => {
                        handleSearch();
                        setTitleBox(false);
                    }} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '5px' }}>
                        <IoIosSearch style={{ fontSize: '20px', color: '#333' }} />
                    </button>
                </div>

                {/* Display existing titles */}
                {titleBox ? (<div style={styles.existingTitlesContainer}>
                    {existingTitles.length > 0 && (
                        <div style={styles.existingTitlesWrapper}>

                            <ul style={styles.existingTitlesList}>
                                {existingTitles.map((title, index) => (
                                    <li key={index} style={styles.existingTitleItem} >
                                        <h4
                                            onClick={(e) => {
                                                setSearchTerm(title);
                                                setTitleClicked(title);
                                                // handleSearch();
                                                setTitleBox(false);
                                                console.log("searchedm title", title)

                                            }
                                            }

                                        >{title}</h4>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>) : (null)}

            </div>
        </div>
    );
};

const styles = {
    existingTitlesContainer: {
        marginTop: '0px',
        zIndex: 1,
        position: 'relative',
        overflow: 'hidden'
    },
    existingTitlesWrapper: {
        backgroundColor: '#f9f9f9',

        padding: '10px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        maxHeight: '100px',
        overflowY: 'auto',
        marginRight: '-17px',


    },
    existingTitlesHeader: {
        marginBottom: '5px',
        fontSize: '16px',
    },
    existingTitlesList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    existingTitleItem: {
        fontSize: '14px',
        marginBottom: '5px',

    },
    existingTitleItem: {
        fontSize: '14px',
        marginBottom: '5px',

    },
    scrollbarStyles: {
        width: '0px', // Hide the scrollbar
    },
};

export default HeaderLower;


