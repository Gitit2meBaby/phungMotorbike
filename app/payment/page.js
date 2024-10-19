'use client';
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();
  const { transaction_status } = router.query; // NganLuong will send payment details

  if (transaction_status === '1') {
    return <h1>Payment Successful!</h1>;
  } else {
    return <h1>Payment Failed!</h1>;
  }
}
