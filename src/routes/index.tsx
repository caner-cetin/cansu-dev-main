import { useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  Briefcase,
  GithubIcon,
  Mail,
  MapPin,
  Music,
  Pause,
  Play,
} from "lucide-react";
import AmazonwebservicesOriginalWordmark from "devicons-react/icons/AmazonwebservicesOriginalWordmark";
import DeviconsReactOriginal from "devicons-react/icons/DeviconsReactOriginal";
import DockerOriginal from "devicons-react/icons/DockerOriginal";
import GithubactionsOriginal from "devicons-react/icons/GithubactionsOriginal";
import GoOriginal from "devicons-react/icons/GoOriginal";
import KubernetesOriginal from "devicons-react/icons/KubernetesOriginal";
import PostgresqlOriginal from "devicons-react/icons/PostgresqlOriginal";
import PythonOriginal from "devicons-react/icons/PythonOriginal";
import TypescriptOriginal from "devicons-react/icons/TypescriptOriginal";
import { motion, useReducedMotion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const easeOut = [0.23, 1, 0.32, 1] as const;
type TechIcon = ComponentType<
  SVGProps<SVGElement> & { size?: number | string }
>;

const quickLinks = [
  {
    label: "GitHub",
    href: "https://github.com/caner-cetin",
    icon: GithubIcon,
  },
  {
    label: "AOTY",
    href: "https://www.albumoftheyear.org/user/letterbomb/",
    icon: Music,
  },
  {
    label: "hire me",
    href: "https://hire.cansu.dev",
    icon: Briefcase,
  },
  {
    label: "email",
    href: "mailto:hello@cansu.dev",
    icon: Mail,
  },
];

const techStack = [
  {
    name: "Go",
    icon: GoOriginal,
    href: "https://reddit.com/r/programmingcirclejerk/comments/13o6u9c/fuck_you_go/",
  },
  {
    name: "Python",
    icon: PythonOriginal,
    href: "https://www.reddit.com/r/programmingcirclejerk/comments/m8mjt3/python_ist_a_piece_of_shit_it_shouldnt_be/",
  },
  {
    name: "CI/CD",
    icon: GithubactionsOriginal,
    href: "https://www.reddit.com/r/programmingcirclejerk/comments/mmqveg/creating_a_blockchain_distributed_package_manager/",
  },
  {
    name: "Kubernetes",
    icon: KubernetesOriginal,
    href: "https://www.reddit.com/r/programmingcirclejerk/comments/qnw7r5/kubernetes_made_writing_poor_code_a_breeze_at/",
  },
  {
    name: "Postgres",
    icon: PostgresqlOriginal,
    href: "https://www.reddit.com/r/programmingcirclejerk/comments/1f8w80w/vercel_docs_next_lets_create_an_api_route_that/",
  },
  {
    name: "Typescript",
    icon: TypescriptOriginal,
    href: "https://www.reddit.com/r/programmingcirclejerk/comments/1aytq9l/i_even_pay_for_copilot_almost_exclusively_to/",
  },
  {
    name: "AWS",
    icon: AmazonwebservicesOriginalWordmark,
    href: "https://reddit.com/r/programmingcirclejerk/comments/1b6modu/an_online_wheel_of_fortune_was_implemented_using/",
  },
  {
    name: "SaltStack",
    icon: DeviconsReactOriginal,
    href: "https://www.reddit.com/r/programmingcirclejerk/comments/1kgcdgg/cowsay_and_the_ansible_output_achieved_when/",
  },
  {
    name: "Docker",
    icon: DockerOriginal,
    href: "https://reddit.com/r/programmingcirclejerk/comments/gaen3m/if_your_devs_dont_understand_docker_they_arent/",
  },
];

interface PageSectionProps {
  index: string;
  title: string;
  href?: string;
  children: React.ReactNode;
}

const PageSection = ({ index, title, href, children }: PageSectionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="group border-t border-white/10 py-8 first:border-t-0 first:pt-0 sm:py-10"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.22, ease: easeOut }}
    >
      <div className="mb-5 grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-start">
        <div className="font-mono text-sm text-slate-500">{index}</div>
        <div>
          {href ? (
            <a
              href={href}
              className="inline-flex text-2xl font-semibold leading-tight text-white underline decoration-white/0 underline-offset-8 transition-colors duration-200 ease-out hover:text-slate-100 hover:decoration-white/40 sm:text-3xl"
            >
              {title}
            </a>
          ) : (
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {title}
            </h2>
          )}
        </div>
      </div>
      <div className="text-base leading-7 text-slate-200/90 sm:pl-12 sm:text-lg">
        {children}
      </div>
    </motion.section>
  );
};

const TechTile = ({
  href,
  icon: Icon,
  name,
  index,
}: {
  href: string;
  icon: TechIcon;
  name: string;
  index: number;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      title={name}
      className="group flex min-h-24 flex-col justify-between rounded-md border border-white/10 bg-white/[0.035] p-3 text-left transition-colors duration-200 ease-out hover:border-white/25 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/25 active:scale-[0.98]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.035, ease: easeOut }}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 transition-colors duration-200 ease-out group-hover:text-slate-100">
        {name}
      </span>
      <Icon
        aria-label={`${name} logo`}
        size="2rem"
        className="mt-5 opacity-70 grayscale transition duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
      />
    </motion.a>
  );
};

const AudioPlayer = ({ href, label }: { href: string; label: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || !audioRef.current.duration) return;

    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100,
    );
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
        {label}
      </div>
      <div className="flex items-center gap-3">
        <audio
          ref={audioRef}
          src={href}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
        <button
          onClick={togglePlay}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-slate-50 transition duration-150 ease-out hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25 active:scale-[0.97]"
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-slate-100 transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const IdentityRail = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.aside
      className="lg:sticky lg:top-8"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: easeOut }}
    >
      <div className="rounded-md border border-white/10 bg-black/50 p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-6">
        <div className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-slate-400">
          cansu.dev
        </div>
        <h1 className="text-4xl font-semibold leading-none text-white sm:text-5xl">
          Caner Çetin
        </h1>
        <p className="mt-4 max-w-sm font-mono text-sm uppercase tracking-[0.18em] text-slate-300">
          Software Engineer
        </p>
        <div className="mt-5 grid gap-2 border-y border-white/10 py-4 font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <span>role</span>
            <span className="text-slate-100">backend/devops</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>location</span>
            <span className="flex items-center gap-1 text-slate-100">
              <MapPin size={13} />
              Turkey
            </span>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 font-mono text-xs uppercase tracking-[0.12em] text-slate-200 transition duration-150 ease-out hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25 active:scale-[0.97]"
              >
                <Icon size={15} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-slate-950 bg-[url('/bg.webp')] bg-cover bg-center bg-fixed text-white">
      <div className="min-h-screen bg-black/70 px-4 py-5 backdrop-saturate-50 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8">
          <IdentityRail />

          <div className="rounded-md border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-8 lg:p-10">
            <PageSection
              index="01"
              title="Who are you?"
              href="https://www.youtube.com/watch?v=tzjrm0lWsqE"
            >
              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
                <p>
                  Caner Çetin, 24 year old software developer from Turkey. Backend &
                  DevOps developer at awesome places for a couple years now.
                  Spiritually a horse.
                </p>
                <img
                  className="h-36 w-full rounded-md border border-white/10 object-cover md:h-32"
                  src="https://media1.tenor.com/m/7ygvYhw0tjsAAAAC/spin-haru-urara.gif"
                  alt="Spinning Haru Urara"
                />
              </div>
            </PageSection>

            <PageSection index="02" title="What do you do?" href="/">
              <p>Mostly coding and listening to music.</p>
              <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {techStack.map((tech, index) => (
                  <TechTile key={tech.name} {...tech} index={index} />
                ))}
              </div>
              <p className="text-slate-300">I am also balding, if it counts.</p>
            </PageSection>

            <PageSection index="03" title="How the f**k I pronounce your name?">
              <p>
                Caner is pronounced like "Janer", or simply "John", or even
                "Canoe".
              </p>
              
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <AudioPlayer
                  href="/audio/pronounce-meh.mp3"
                  label="i can take this"
                />
                <AudioPlayer
                  href="/audio/pronounce-best.mp3"
                  label="best pronouncation"
                />
                <AudioPlayer
                  href="/audio/pronounce-dont.mp3"
                  label="dont do this"
                />
              </div>
            </PageSection>

            <PageSection
              index="05"
              title="Contact"
              href="https://www.youtube.com/watch?v=FCXj64y8NBw"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:hello@cansu.dev"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-4 font-mono text-sm uppercase tracking-[0.12em] text-slate-50 transition duration-150 ease-out hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/25 active:scale-[0.97]"
                >
                  <Mail size={17} />
                  hello@cansu.dev
                </a>
                <a
                  href="https://hire.cansu.dev"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 font-mono text-sm uppercase tracking-[0.12em] text-slate-100 transition duration-150 ease-out hover:border-white/30 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/25 active:scale-[0.97]"
                >
                  <Briefcase size={17} />
                  hire me
                </a>
              </div>
            </PageSection>
          </div>
        </div>
      </div>
    </main>
  );
}
