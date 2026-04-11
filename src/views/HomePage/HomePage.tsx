import { getPublicCatalog } from "@/lib/get-public-catalog";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const { studios, classes } = await getPublicCatalog();
  return <HomePageClient studios={studios} classes={classes} />;
}
