import React from "react";
import { useState, createContext } from "react";
import Nav from "./Nav";
// import ReactDom from "react-dom/client";


const App = () => {
  const DataContext = createContext();
  const [searchData, setSearchData] = useState({searchString: null, category: null, location: null})
  const [receivedData, setReceivedData] = useState([]);
  

  return (
    <div>
      Oasis
      <Nav setSearchData={setSearchData} setReceivedData={setReceivedData}/>
      <DataContext.Provider value={receivedData}>
        <Dash/>
      </DataContext.Provider>
    </div>
  )
}

export default App;