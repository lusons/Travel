import React from "react";
import styles from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>{props.children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
