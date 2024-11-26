// app/api/debug-cache/route.js
import { getBikes } from "../../lib/getBikes";

export async function GET() {
  const timestamp = Date.now();
  const bikes = await getBikes();

  return Response.json(
    {
      timestamp,
      bikeCount: bikes.length,
      bikes: bikes.map((bike) => ({
        id: bike.id,
        name: bike.name,
        model: bike.model,
      })),
      cache_status: process.env.VERCEL ? "Vercel" : "Local",
      node_env: process.env.NODE_ENV,
      vercel_env: process.env.VERCEL_ENV,
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "x-debug-time": timestamp.toString(),
      },
    }
  );
}
