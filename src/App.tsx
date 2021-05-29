import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Footer />
    </div>
  );
}

export default App;
