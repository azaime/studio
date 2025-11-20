import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Stethoscope } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');

  return (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Stethoscope className="w-6 h-6" />
        </div>
      <span className="font-semibold text-lg">
        HOPITALE PROVINCIALE DE MONGO
      </span>
    </div>
  );
}
