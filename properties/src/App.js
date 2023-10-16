import { Search } from "@mui/icons-material";
import "./App.css";
import Header from "./components/header/Header";
import SearchBar from "./components/searchbar/SearchBar";
import logo from './logo.svg';
import './App.css';
import PageList from './pageList';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar/>
     <PageList/>
    </div>
  );
}

export default App;
