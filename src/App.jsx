import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen bg-stone-400">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default App
