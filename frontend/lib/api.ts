import type { Poi, RouteResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPois(): Promise<Poi[]> {
  const res = await fetch(`${API_URL}/api/poi`);
  if (!res.ok) throw new Error("Failed to fetch POIs");
  return res.json();
}

export async function fetchRoute(fromId: number, toId: number): Promise<RouteResponse> {
  const res = await fetch(`${API_URL}/api/route?from_id=${fromId}&to_id=${toId}`);
  if (!res.ok) throw new Error("Route not found");
  return res.json();
}
