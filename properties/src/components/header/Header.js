import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>

        <a className={styles.title} href="/">
          100Acres
        </a>
      
          <input type="text" placeholder="Search your dream property" className={styles.inputwrap} >
          </input>
      
        <div display="flex" gap={8}>
          <a href="#" className={styles.navTab}>
            For Buyers
          </a>
          <a href="#" className={styles.navTab}>
            For Tenants
          </a>
          <a href="#" className={styles.navTab}>
            For Owners
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
