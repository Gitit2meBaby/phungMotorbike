import { getFeatureBikes } from "../app/lib/getFeatureBikes";
import ClientSlider from "../components/ClientSlider";
import styles from "../styles/sliderSection.module.css";

// The main component is now a server component by default
const SliderSection = async () => {
  const featureBikes = await getFeatureBikes();

  if (featureBikes.length === 0) {
    return <div className={styles.slider}>No featured bikes available</div>;
  }

  return (
    <section className={styles.slider}>
      <ClientSlider bikes={featureBikes} />
    </section>
  );
};

export default SliderSection;
