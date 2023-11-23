import {} from "react";

import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Books from "./pages/books";
import Add from "./pages/add";
import Update from "./pages/update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:bookId" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
