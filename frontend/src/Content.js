import React from 'react';

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item._id} className="item">
              
              {/* ✅ Checkbox for toggling completion */}
              <input 
                type="checkbox" 
                checked={item.checked} 
                onChange={() => handleCheck(item._id, item.checked)}
              />

              {/* ✅ Display Task */}
              <label style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                {item.item}
              </label>

              {/* ✅ Delete Button */}
              <button onClick={() => handleDelete(item._id)}>Delete</button>

            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </main>
  );
};

export default Content;
