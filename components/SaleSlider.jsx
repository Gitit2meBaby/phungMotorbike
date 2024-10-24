// components/SaleSlider.jsx
import { Suspense } from "react";
import { getFeatureSaleBikes } from "../app/lib/getFeatureSaleBikes";
import styles from "../styles/forSale.module.css";
import ClientSaleSlider from "./ClientSaleSlider";

// Loading component
const SliderSkeleton = () => (
  <div className={styles.slider}>
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "75%",
        background: "#f0f0f0",
        animation: "pulse 1.5s infinite ease-in-out",
      }}
    ></div>
  </div>
);

// Async component to fetch bikes
const SaleSliderContent = async () => {
  const bikes = await getFeatureSaleBikes();

  if (bikes.length === 0) {
    return <div className={styles.slider}>No bikes available for sale</div>;
  }

  return <ClientSaleSlider bikes={bikes} />;
};

// Main component with deferred loading
const SaleSlider = () => {
  return (
    <section className={styles.slider}>
      <Suspense fallback={<SliderSkeleton />}>
        {/* @ts-expect-error Async Component */}
        <SaleSliderContent />
      </Suspense>
    </section>
  );
};

export default SaleSlider;
