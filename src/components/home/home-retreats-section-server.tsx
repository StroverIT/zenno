import { getHomeRetreats } from '@/lib/home/home-data';
import HomeRetreatsSection from '../../views/HomePage/HomeRetreatsSection';

export default async function HomeRetreatsSectionServer() {
  const retreats = await getHomeRetreats(5);
  return <HomeRetreatsSection retreats={retreats} />;
}
