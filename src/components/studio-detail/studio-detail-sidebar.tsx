import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import type { Studio } from '@/data/mock-data';
import { StudioDetailFavoriteButton } from '@/components/studio-detail/studio-detail-favorite-button';

export function StudioDetailSidebar({ studio }: { studio: Studio }) {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Информация</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{studio.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span>{studio.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <span>{studio.email}</span>
          </div>
          {studio.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 shrink-0 text-primary" />
              <a href={studio.website} target="_blank" className="text-primary hover:underline" rel="noreferrer">
                Уебсайт
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-3 font-display text-lg font-semibold text-foreground">Локация</h3>
        <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
          {'\u{1F4CD}'} Картата изисква Google Maps API ключ
        </div>
      </div>

      <StudioDetailFavoriteButton studioId={studio.id} />
    </aside>
  );
}
