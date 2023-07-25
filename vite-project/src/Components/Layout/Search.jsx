import React, { useState } from "react";
import "./Search.css";
import SearchIcon from '@mui/icons-material/Search';
const Search = () => {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="iconBox">
                    <SearchIcon sx={{ fontSize: "2vmax", color: 'white' }} />
                </div>
            </form>
        </>
    );
};

export default Search;