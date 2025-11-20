import { cn } from '@/lib/utils';
import { Stethoscope } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Stethoscope className="w-6 h-6" />
        </div>
    </div>
  );
}
