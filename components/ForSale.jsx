// SSR component that holds the saleSlider component, change SaleSlider content in admin page
import React from "react";
import Link from "next/link";

import styles from "../styles/forSale.module.css";
import SaleSlider from "./SaleSlider";

const ForSale = () => {
  return (
    <>
      <section className={styles.forSale}>
        <div
          className={styles.divider}
          style={{ margin: "0 auto", width: "85%", marginBottom: "3rem" }}
        ></div>
        <h2>Bikes For Sale</h2>
        <p>
          Starting from just $200usd, Phung motorbikes has a wide range of bikes
          for sale. All our vehicles are fully serviced and well maintained
          throughout their lifetime, every bike comes with a bluecard and a
          thorough inspection from our staff.
        </p>

        <SaleSlider />

        <div className={styles.btnHolder}>
          <Link href="/motorbikes-for-sale" className={styles.btn}>
            View All
          </Link>
        </div>
      </section>
    </>
  );
};

export default ForSale;
