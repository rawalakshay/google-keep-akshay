import React from "react";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Notes from "../Pages/Notes";
import Bin from "../Pages/Bin";
import Code from "../Pages/Code";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/code" element={<Code />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
