import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function StudioNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-lg text-muted-foreground">Студиото не е намерено.</p>
      <Button asChild variant="ghost" className="mt-4">
        <Link href="/discover">Назад</Link>
      </Button>
    </div>
  );
}
