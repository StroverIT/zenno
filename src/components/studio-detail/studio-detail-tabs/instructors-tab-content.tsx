import { Star } from 'lucide-react';
import type { Instructor } from '@/data/mock-data';
import { Badge } from '@/components/ui/badge';

export function InstructorsTabContent({ studioInstructors }: { studioInstructors: Instructor[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {studioInstructors.map((instr) => (
        <div key={instr.id} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/30 text-2xl">
              {'\u{1F9D1}\u{200D}\u{1F3EB}'}
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground">{instr.name}</h4>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span>{instr.rating}</span>
                <span className="text-muted-foreground">· {instr.experienceLevel}</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{instr.bio}</p>
          <div className="mt-3 flex gap-1">
            {instr.yogaStyle.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
