
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Logo({ className }: { className?: string }) {
  const logoImage = PlaceHolderImages.find(img => img.id === 'hospital-logo');

  return (
    <div className={cn("flex items-center justify-center", className)}>
        {logoImage ? (
            <Image 
                src={logoImage.imageUrl} 
                alt={logoImage.description} 
                width={40} 
                height={40} 
                className="rounded-lg object-cover"
                data-ai-hint={logoImage.imageHint}
            />
        ) : (
            <div className="w-10 h-10 bg-muted rounded-lg"></div>
        )}
    </div>
  );
}
