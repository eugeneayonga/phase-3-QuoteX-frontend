import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
    return (
        <div>
            <input
                type="text"
                id="search"
                value={searchTerm}
                placeholder="Search for a quote"
                onChange={(event) => onSearch(event.target.value)}
            />
        </div>
    );
};


export default SearchBar;