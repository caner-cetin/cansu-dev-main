import { useEffect, useRef, useState } from "react";
import { GithubIcon, Mail, Music, Pause, Play, Briefcase } from "lucide-react";
import figlet from "figlet";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

interface TechStackProps {
  href: string;
  icon: string;
  shadowColor: string;
  name: string;
  index: number;
}
const TechStack = ({
  href,
  icon,
  shadowColor,
  name,
  index,
}: TechStackProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={`relative flex items-center justify-center p-2 rounded-md bg-gray-800/60 backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -5,
        scale: 1.1,
        transition: { type: "spring", stiffness: 300 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={name}
    >
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${shadowColor}, 0 0 40px ${shadowColor}`
            : `0 0 10px ${shadowColor}`,
        }}
        className="w-full h-full absolute rounded-md"
      />
      <motion.img
        src={icon}
        alt={`${name} Logo`}
        className="h-8 w-auto relative z-10"
        style={{
          filter: "grayscale(100%) brightness(1)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  href?: string;
  delay?: number;
}

const Section = ({ title, children, href, delay }: SectionProps) => {
  if (!delay) delay = 0;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById(`section-${title}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <motion.div
      id={`section-${title}`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      <motion.div
        className="divider"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {href ? (
          <motion.a
            href={href}
            className="link link-hover font-extrabold text-lg text-gray-100 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {title}
          </motion.a>
        ) : (
          <span className="font-extrabold text-lg text-gray-100">{title}</span>
        )}
      </motion.div>
      <motion.div
        className="text-slate-50"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: delay + 0.2,
              duration: 0.5,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const AudioPlayer = ({ href, label }: { href: string; label: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center p-2 rounded-lg">
      <div className="text-sm font-extrabold mb-1">{label}</div>
      <motion.div className="flex items-center gap-2">
        <audio
          ref={audioRef}
          src={href}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
        <motion.button
          onClick={togglePlay}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-700/60"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Pause size={12} className="text-gray-100" />
          ) : (
            <Play size={12} className="text-gray-100" />
          )}
        </motion.button>
        <div className="relative w-20 h-1 bg-gray-700/60 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-blue-400/60"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function Portfolio() {
  const [asciiArt, setAsciiArt] = useState("");
  useEffect(() => {
    const loadAsciiArt = async () => {
      figlet.text("Hi there!", { font: "Univers" }, (err, data) => {
        if (!err) setAsciiArt(data || "");
      });
    };
    loadAsciiArt();
  }, []);

  const techStack = [
    {
      name: "Go",
      icon: "/images/Go-Logo_Aqua.svg",
      href: "https://reddit.com/r/programmingcirclejerk/comments/13o6u9c/fuck_you_go/",
      shadowColor: "rgba(0,128,255,0.5)",
    },
    {
      name: "Python",
      icon: "/images/python-icon.svg",
      href: "https://www.reddit.com/r/programmingcirclejerk/comments/m8mjt3/python_ist_a_piece_of_shit_it_shouldnt_be/",
      shadowColor: "rgba(0,255,0,0.5)",
    },
    {
      name: "FastAPI",
      icon: "/images/fastapi-icon.svg",
      href: "https://www.reddit.com/r/programmingcirclejerk/comments/vpniv1/flask_is_my_go_to_for_just_getting_a_web_project/",
      shadowColor: "rgba(0,255,0,0.5)",
    },
    {
      name: ".NET",
      icon: "/images/dotnet-icon.svg",
      href: "https://www.reddit.com/r/programmingcirclejerk/comments/1902tfa/dotnet_and_c_make_me_feel_like_everything_else_is/",
      shadowColor: "rgba(255,0,128,0.5)",
    },
    {
      name: "MongoDB",
      icon: "/images/mongodb-icon.svg",
      href: "https://www.youtube.com/watch?v=b2F-DItXtZs",
      shadowColor: "rgba(0,255,0,0.5)",
    },
    {
      name: "Typescript",
      icon: "/images/typescript.svg",
      href: "https://www.reddit.com/r/programmingcirclejerk/comments/1aytq9l/i_even_pay_for_copilot_almost_exclusively_to/",
      shadowColor: "rgba(255,0,0,0.5)",
    },
    {
      name: "AWS",
      icon: "/images/aws-logo.svg",
      href: "https://reddit.com/r/programmingcirclejerk/comments/1b6modu/an_online_wheel_of_fortune_was_implemented_using/",
      shadowColor: "rgba(255,153,0,0.5)",
    },
    {
      name: "SaltStack",
      icon: "/images/saltstack-icon.svg",
      href: "#",
      shadowColor: "rgba(0,255,255,0.5)",
    },
    {
      name: "Docker",
      icon: "/images/docker-icon.svg",
      href: "https://reddit.com/r/programmingcirclejerk/comments/gaen3m/if_your_devs_dont_understand_docker_they_arent/",
      shadowColor: "rgba(0,170,255,0.5)",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 bg-[url('/bg.webp')] bg-cover bg-center bg-fixed relative">
      <div className="container mx-auto px-4 py-8 bg-blend-normal backdrop-blur-sm text-white shadow-inner border border-white/10 bg-scanlines max-w-2xl text-center">
        <AnimatePresence>
          {asciiArt && (
            <motion.pre
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-[7px] flex mx-auto justify-center text-gray-50 font-mono mb-8"
            >
              {asciiArt}
            </motion.pre>
          )}
        </AnimatePresence>

        <Section
          title="Who are you?"
          href="https://www.youtube.com/watch?v=tzjrm0lWsqE"
        >
          <p className="mb-4 flex">
            Caner, 24 year old software developer from Turkey. Backend & DevOps
            developer at awesome places for a couple years now. Spiritually a
            horse.
            <img
              className="w-40 h-32 justify-center aspect-auto"
              src="https://media1.tenor.com/m/7ygvYhw0tjsAAAAC/spin-haru-urara.gif"
            />
          </p>
        </Section>

        <Section
          title="What do you do?"
          href={window.location.href}
          delay={0.1}
        >
          <p className="mb-4">Mostly coding and listening to music.</p>
          <div className="grid grid-cols-3 gap-3 my-6 max-w-md mx-auto">
            {techStack.map((tech, index) => (
              <TechStack key={tech.name} {...tech} index={index} />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <motion.a
              href="https://rateyourmusic.com/~canercetin"
              className="flex items-center gap-2 link font-extrabold hover:text-sky-200 transition-colors"
              whileHover={{ scale: 1.08, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Music size={20} />
              RYM
            </motion.a>
            <motion.a
              href="https://github.com/caner-cetin"
              className="flex items-center gap-2 link font-extrabold hover:text-sky-200 transition-colors"
              whileHover={{ scale: 1.08, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon size={20} />
              GitHub
            </motion.a>
            <motion.a
              href="https://hire.cansu.dev"
              className="flex items-center gap-2 link font-extrabold hover:text-sky-200 transition-colors"
              whileHover={{ scale: 1.08, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase size={20} />
              hire me
            </motion.a>
          </div>
          I am also balding, if it counts.
        </Section>

        <Section
          title="How the f**k I pronounce your name?"
          href=""
          delay={0.2}
        >
          Caner is pronounced like "Janer", or simply "John", or even "Canoe".
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
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
        </Section>

        <Section title="...cansu.dev?" href={window.location.href} delay={0.4}>
          <>
            Yes, it is because of the reasons you can guess. It is absolutely
            fine to call me Caner, but if you can, or if we are talking online,
            please call me Cansu.
          </>
        </Section>

        <Section
          title="Contact"
          href="https://www.youtube.com/watch?v=FCXj64y8NBw"
          delay={0.6}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@cansu.dev"
              className="flex items-center gap-2 link hover:text-blue-400 transition-colors"
            >
              <Mail size={20} />
              hello@cansu.dev
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}
