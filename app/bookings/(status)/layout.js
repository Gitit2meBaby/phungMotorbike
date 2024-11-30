// app/booking/(status)/layout.js
import styles from "../../../styles/status.module.css";

export const metadata = {
  title: "Booking Status | Motorbike Rental",
  description: "Booking status for your motorbike rental",
};

export default function BookingStatusLayout({ children }) {
  return (
    <div className={styles.statusContainer}>
      <main className={styles.statusMain}>{children}</main>
    </div>
  );
}
