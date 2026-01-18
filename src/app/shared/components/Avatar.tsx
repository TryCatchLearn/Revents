import { useState } from 'react';

type Props = {
    src?: string | null;
    alt?: string;
    displayName?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    sm: 'w-14 h-14 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-28 h-28 text-5xl',
    xl: 'w-32 h-32 text-6xl'
};

const getInitial = (name?: string): string => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
};

const getColorFromName = (name?: string): string => {
    if (!name) return 'bg-neutral';

    const colors = [
        'bg-primary',
        'bg-secondary',
        'bg-accent',
        'bg-info',
        'bg-success',
        'bg-warning',
        'bg-error',
    ];

    // Generate a consistent color based on the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
};

export default function Avatar({ src, alt = 'avatar', displayName, size = 'md', className = '' }: Props) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src || '/user.png');

    const initial = getInitial(displayName);
    const bgColor = getColorFromName(displayName);

    const handleImageError = () => {
        if (currentSrc !== '/user.png') {
            // First try fallback to user.png
            setCurrentSrc('/user.png');
            setImageError(false);
            setImageLoaded(false);
        } else {
            // If user.png also fails, show initial
            setImageError(true);
        }
    };

    const showInitial = imageError;

    return (
        <div className={`${className}`}>
            <div className={`${sizeClasses[size]} rounded-full ${showInitial ? bgColor : ''} flex items-center justify-center overflow-hidden relative`}>
                {!showInitial && (
                    <>
                        {!imageLoaded && (
                            <div className={`absolute inset-0 ${bgColor} flex items-center justify-center`}>
                                <span className="font-bold text-white select-none">
                                    {initial}
                                </span>
                            </div>
                        )}
                        <img
                            src={currentSrc}
                            alt={alt}
                            onError={handleImageError}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                        />
                    </>
                )}
                {showInitial && (
                    <span className="font-bold text-white select-none">
                        {initial}
                    </span>
                )}
            </div>
        </div>
    );
}
