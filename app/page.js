import Hero from "../components/Hero";
import InfoCard from "../components/InfoCard";
import SliderSection from "../components/SliderSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SliderSection />
      <h2 style={{ textAlign: "center", color: '#e97f26', letterSpacing: '1px', padding: '0 1rem' }}>Hanoi's Leading provider of quality motorbikes</h2>
      <InfoCard />
    </main>
  );
}
