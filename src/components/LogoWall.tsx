import { techStack } from "@/data/profile";

export default function LogoWall() {
  return (
    <div className="relative overflow-x-hidden py-8" aria-label="Technologies I work with">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20"></div>

      <div className="flex animate-scroll w-max will-change-transform hover:[animation-play-state:paused]">
        {[...techStack, ...techStack].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-2 pr-12 md:pr-20 group transition-all duration-300"
            aria-hidden={index >= techStack.length ? true : false}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/svg/tech/${tech.icon}.svg`}
              alt=""
              className="h-7 w-7 object-contain brightness-0 dark:invert opacity-60 dark:opacity-50 transition duration-300 group-hover:opacity-100 group-hover:scale-110"
              width={28}
              height={28}
              loading={index < techStack.length ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="text-lg font-medium text-[var(--white-icon)] whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--white)]">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
