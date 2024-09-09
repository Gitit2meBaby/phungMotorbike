import { Suspense } from "react";
import Cards from "../components/Cards";
import ForSale from "../components/ForSale";
import Hero from "../components/Hero";
import InfoCard from "../components/InfoCard";
import Repair from "../components/Repair";
import SliderSection from "../components/SliderSection";

import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className={styles.home}>
        <SliderSection />
        <div className={styles.hero2}>
          <h1>Phung Motorbike</h1>
          <h2 style={{ fontSize: "2rem", lineHeight: "2.2rem", textAlign: "center", color: '#e97f26', letterSpacing: '1px', padding: '0 1rem', marginBottom: '0rem' }}>Hanoi&apos;s Leading provider of quality motorbikes</h2>
          <InfoCard />
        </div>
      </div>

      <Suspense>
        <Cards />
      </Suspense>

      <div className={styles.deskGrid}>
        <Suspense>
          <ForSale />
        </Suspense>
        <Suspense>
          <Repair />
        </Suspense>
      </div>
    </main>
  );
}
