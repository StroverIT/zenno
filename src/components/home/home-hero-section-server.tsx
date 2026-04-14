import HeroSection from "@/views/HomePage/HeroSection";
import { getHomeStudios, getHomeClasses } from "@/lib/home/home-data";

export default async function HomeHeroSectionServer() {
  const [studios, classes] = await Promise.all([getHomeStudios(), getHomeClasses()]);
  const totalEnrolled = classes.reduce((s, c) => s + c.enrolled, 0);
  const totalReviews = studios.reduce((s, st) => s + st.reviewCount, 0);
  const avgRating =
    totalReviews > 0
      ? (studios.reduce((acc, st) => acc + st.rating * st.reviewCount, 0) / totalReviews).toFixed(1)
      : studios.length > 0
        ? (studios.reduce((acc, st) => acc + st.rating, 0) / studios.length).toFixed(1)
        : "0";
  const yogaStylesCount = new Set(classes.map((c) => c.yogaType)).size;

  return (
    <HeroSection
      studioCount={studios.length}
      classCount={classes.length}
      totalEnrolled={totalEnrolled}
      avgRating={avgRating}
      totalReviews={totalReviews}
      yogaStylesCount={yogaStylesCount}
    />
  );
}
