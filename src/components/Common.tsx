import { ReactNode } from 'react';
import { motion, useSpring } from 'motion/react';

export function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
    </svg>
  );
}

export function FlowerIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <circle cx="12" cy="7" r="4" opacity="0.85" />
      <circle cx="17" cy="12" r="4" opacity="0.85" />
      <circle cx="12" cy="17" r="4" opacity="0.85" />
      <circle cx="7" cy="12" r="4" opacity="0.85" />
      <circle cx="12" cy="12" r="3.2" fill="#D4C04D" />
    </svg>
  );
}

export function TapeStrip({
  tone = 'bg-[#D7E3A4]/90',
  rotation = '-3deg',
  className = '',
}: {
  tone?: string;
  rotation?: string;
  className?: string;
}) {
  return (
    <div
      style={{ transform: `rotate(${rotation})` }}
      className={`h-6 w-24 ${tone} border-l-2 border-r-2 border-dashed border-[#FAF8F2]/70 shadow-sm ${className}`}
    />
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-14">
      <Reveal>
        <p className="font-hand text-2xl text-[#657733] font-semibold">{kicker}</p>
      </Reveal>
      <h2 className="font-display text-5xl leading-none text-[#291100] md:text-7xl">
        {title.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="mr-4 inline-block"
            initial={{ opacity: 0, y: '50%', rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

export function Tilt({
  children,
  className = '',
  rot = 0,
}: {
  children: ReactNode;
  className?: string;
  rot?: number;
}) {
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });

  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, rotate: rot, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      whileHover={{ scale: 1.02, rotate: 0 }}
    >
      {children}
    </motion.div>
  );
}
