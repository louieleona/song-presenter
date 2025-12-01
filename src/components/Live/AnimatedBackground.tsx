import { useMemo } from 'react';
import { GradientTheme } from '../../types/song';

interface AnimatedBackgroundProps {
  tempo: 'slow' | 'fast';
  gradient?: GradientTheme;
}

const gradientThemes = {
  blue: {
    bg: 'from-gray-900 via-blue-900 to-black',
    particles: 'from-blue-400 to-white',
    lines: 'rgba(147, 197, 253, 0.3)',
    glow: 'rgba(59, 130, 246, 0.2)',
  },
  purple: {
    bg: 'from-gray-900 via-purple-900 to-black',
    particles: 'from-purple-400 to-white',
    lines: 'rgba(192, 132, 252, 0.3)',
    glow: 'rgba(168, 85, 247, 0.2)',
  },
  green: {
    bg: 'from-gray-900 via-green-900 to-black',
    particles: 'from-green-400 to-white',
    lines: 'rgba(134, 239, 172, 0.3)',
    glow: 'rgba(34, 197, 94, 0.2)',
  },
  orange: {
    bg: 'from-gray-900 via-orange-900 to-black',
    particles: 'from-orange-400 to-white',
    lines: 'rgba(251, 146, 60, 0.3)',
    glow: 'rgba(249, 115, 22, 0.2)',
  },
  pink: {
    bg: 'from-gray-900 via-pink-900 to-black',
    particles: 'from-pink-400 to-white',
    lines: 'rgba(244, 114, 182, 0.3)',
    glow: 'rgba(236, 72, 153, 0.2)',
  },
  cyan: {
    bg: 'from-gray-900 via-cyan-900 to-black',
    particles: 'from-cyan-400 to-white',
    lines: 'rgba(103, 232, 249, 0.3)',
    glow: 'rgba(6, 182, 212, 0.2)',
  },
};

export default function AnimatedBackground({ tempo, gradient = 'blue' }: AnimatedBackgroundProps) {
  const theme = gradientThemes[gradient];

  // Memoize stars so they don't regenerate on every render
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 2 + 0.5,
      })),
    []
  );

  // Generate lights based on tempo - use gradient as key to force regeneration on song change
  const lightCount = tempo === 'fast' ? 80 : 40;
  const lights = useMemo(
    () =>
      Array.from({ length: lightCount }, (_, i) => ({
        id: i,
        left: (i * 97) % 100, // More distributed positioning
        delay: (i * 2.3) % 15, // Pseudo-random but consistent
        size: tempo === 'fast' ? 2.5 + ((i * 1.7) % 4) : 1.5 + ((i * 1.7) % 2.5),
      })),
    [lightCount, tempo, gradient]
  );

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b ${theme.bg}`}>
      {/* Constellation stars - twinkling */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Rising lights/particles */}
      {lights.map((light) => (
        <div
          key={`light-${light.id}`}
          className={`absolute rounded-full bg-gradient-to-t ${theme.particles} ${
            tempo === 'fast' ? 'animate-rise-fast' : 'animate-rise-slow'
          }`}
          style={{
            left: `${light.left}%`,
            bottom: '-5%',
            width: `${light.size}px`,
            height: `${light.size}px`,
            animationDelay: `${light.delay}s`,
            boxShadow: `0 0 ${light.size * 2}px ${theme.glow}`,
          }}
        />
      ))}

      {/* Constellation lines - connecting some stars */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id={`lineGradient-${gradient}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.lines} />
            <stop offset="100%" stopColor="rgba(147, 197, 253, 0.1)" />
          </linearGradient>
        </defs>
        {stars.slice(0, 15).map((star, i) => {
          if (i === 0) return null;
          const prevStar = stars[i - 1];
          return (
            <line
              key={`line-${i}`}
              x1={`${prevStar.left}%`}
              y1={`${prevStar.top}%`}
              x2={`${star.left}%`}
              y2={`${star.top}%`}
              stroke={`url(#lineGradient-${gradient})`}
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />
          );
        })}
      </svg>

      {/* Ambient glow */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          tempo === 'fast' ? 'animate-pulse-fast' : 'animate-pulse-slow'
        }`}
        style={{
          background: `radial-gradient(circle at center, ${theme.glow}, transparent)`,
        }}
      />
    </div>
  );
}
