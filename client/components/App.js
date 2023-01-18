import React, { useState, createContext } from "react";
import Nav from "./Nav";
import Dash from "./Dash";
// import ReactDom from "react-dom/client";

export const DataContext = createContext();
const App = () => {
  const [searchData, setSearchData] = useState({searchString: null, category: null, location: null})
  const [receivedData, setReceivedData] = useState([]);
  

  return (
    <DataContext.Provider value={receivedData}>
      <Nav setSearchData={setSearchData} setReceivedData={setReceivedData}/>
      <Dash/>
    </DataContext.Provider>
  )
}

export default App;