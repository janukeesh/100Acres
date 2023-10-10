import './search.css';
import {useState} from "react";
import {Search} from '@mui/icons-material';
function SearchBar() {
  const [title,setTitle] = useState("")
  const handleChange = (e)=>{
    setTitle(e.target.value)
  }
  return (
    <div className="container">
      <input type="text" value={title} onChange={handleChange} placeholder="Search your dream property" >
      </input>
      <Search sx={{ color:"white",fontSize:30 }} size=""></Search>
    </div>
  );
}

export default SearchBar;
