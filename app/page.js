import Cards from "../components/Cards";
import ForSale from "../components/ForSale";
import Hero from "../components/Hero";
import InfoCard from "../components/InfoCard";
import Repair from "../components/Repair";
import SliderSection from "../components/SliderSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SliderSection />
      <h2 style={{ fontSize: "2rem", lineHeight: "2.2rem", textAlign: "center", color: '#e97f26', letterSpacing: '1px', padding: '0 1rem', marginBottom: '0rem' }}>Hanoi's Leading provider of quality motorbikes</h2>
      <InfoCard />
      <Cards />
      <ForSale />
      <Repair />
    </main>
  );
}
