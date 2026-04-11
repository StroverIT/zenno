import { NextResponse } from "next/server";
import { getPublicCatalog } from "@/lib/get-public-catalog";

export const runtime = "nodejs";

/** Public catalog — guests and all roles. Includes flat `classes` for discover/home maps. */
export async function GET() {
  const { studios, classes } = await getPublicCatalog();
  return NextResponse.json({ studios, classes });
}
