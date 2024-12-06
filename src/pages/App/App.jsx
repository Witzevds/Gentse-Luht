import { useState } from "react";

import "./App.css";
import Header from "../../components/Header/Header";
import Hero from "../../sections/Hero-main/Hero-main";
import GTK from "../../sections/GTK/GTK";
import CostOf from "../../sections/Cost-of/Cost-of";

function App() {
  return (
    <>
      <Hero />
      <GTK />
      <CostOf />
    </>
  );
}

export default App;
