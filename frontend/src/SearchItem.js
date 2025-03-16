import React from 'react'

const SearchItem = ({search,setSearch}) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()} >
    <label htmlFor="search"></label>
    <input type="text" 
    id="search"
    placeholder="Search Items"
    role="searchItem" 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    
    
    />
    </form>
  )
}

export default SearchItem