import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch items from database
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setFetchError(err.message);
        setIsLoading(false);
      });
  }, []);

  // ✅ Handle adding a new item
  const addItem = async (item) => {
    if (!item.trim()) return;
    try {
      const response = await axios.post('http://localhost:3001/add', { item, checked: false });
      setItems([...items, response.data]); // Update UI with new item
      setNewItem('');
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Handle submit to add a new item
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem);
  };

  // ✅ Handle toggling checkbox state in MongoDB
  const handleCheck = async (id, checked) => {
    try {
      await axios.patch(`http://localhost:3001/update/${id}`, { checked: !checked });
      setItems(items.map(item => 
        item._id === id ? { ...item, checked: !checked } : item
      ));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Handle deleting an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setItems(items.filter((item) => item._id !== id)); // Update UI after deletion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Header title="TO DO LIST" />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />

      {fetchError && <p>{`Error: ${fetchError}`}</p>}
      {isLoading ? <p>Loading items...</p> : (
        <Content
          items={items.filter((item) => item.item?.toLowerCase().includes(search?.toLowerCase() || ''))

          }
          handleCheck={handleCheck} // ✅ Pass handleCheck function
          handleDelete={handleDelete}
        />
      )}
      <Footer length={items.length} />
    </div>
  );
}

export default App;
