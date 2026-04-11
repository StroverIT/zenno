'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';

export function StudioDetailFavoriteButton({ studioId }: { studioId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const fav = isFavorite(studioId);

  const handleClick = () => {
    if (!isAuthenticated) {
      setAuthOpen(true);
      return;
    }
    const added = toggleFavorite(studioId);
    toast.success(added ? 'Добавено в любими' : 'Премахнато от любими');
  };

  return (
    <>
      <Button variant={fav ? 'default' : 'secondary'} className="w-full" onClick={handleClick}>
        <Heart className={`mr-2 h-4 w-4 ${fav ? 'fill-current' : ''}`} />
        {fav ? 'В любими' : 'Добави в любими'}
      </Button>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
