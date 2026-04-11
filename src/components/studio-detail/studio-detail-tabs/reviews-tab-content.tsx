import { Star } from 'lucide-react';
import type { Review } from '@/data/mock-data';

export function ReviewsTabContent({ studioReviews }: { studioReviews: Review[] }) {
  return (
    <div className="space-y-4">
      {studioReviews.length === 0 && (
        <p className="text-muted-foreground">Все още няма ревюта.</p>
      )}
      {studioReviews.map((review) => (
        <div key={review.id} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">{review.userName}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
          </div>
          <p className="mt-2 text-foreground/80">{review.text}</p>
          <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
        </div>
      ))}
    </div>
  );
}
