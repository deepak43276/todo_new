import React, { useRef } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem"></label>
      <input
        type="text"
        ref={inputRef}
        id="addItem"
        placeholder="Add Item"
        required
        
        autoFocus
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" aria-label="Add Item">Add</button>
    </form>
  );
};

export default AddItem;
