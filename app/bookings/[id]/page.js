import { notFound } from "next/navigation";
import BookingPage from "../../../components/BookingPage";
import { getBikes } from "../../lib/getBikes";

export default async function Bookings({ params }) {
  const { id } = params; // Get the bike ID from URL params

  // Await the fetching of bikes if it's async
  const bikes = await getBikes();
  const bike = bikes.find((b) => b.id === id);

  if (!bike) {
    // Fix syntax for returning JSX
    return notFound();
  }

  // Return the BookingPage component if the bike is found
  return <BookingPage bike={bike} />;
}
