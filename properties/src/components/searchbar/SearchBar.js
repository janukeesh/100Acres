import './search.css';
import {useState} from "react";
function SearchBar() {
  const [title,setTitle] = useState("")
  const [flag,setflag]=useState(false)
  const handleChange = (e)=>{
    setTitle(e.target.value)
  }
  const handleClick = ()=>{
    setflag(true);

  }
  return (
  <div className='wrapper'>
      <div className="inputcontainer">
          <div className='tabheader'>
          <div>Buy</div>
          <div>|</div>
          <div>Rent</div>
          </div>
          <input type="text" value={title} onChange={handleChange} onClick={handleClick} placeholder="Search your dream property" >
          </input>
      </div>
      {flag && <div className='filterLayer'>
        <div>Budget</div>
        <div>Bedroom</div>
        <div>Posted By</div>
      </div>
    }
      </div>
  );
}

export default SearchBar;
