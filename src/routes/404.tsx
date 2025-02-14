import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
})

export function NotFoundPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className={`absolute inset-0 bg-cover bg-center ease-out`}
        style={{
          backgroundImage: `url('/bg2.jpg')`,
          filter: 'brightness(0.8)'
        }}
      />


      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 animate-float rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="space-y-6">
          <h1
            className={`eb-garamond-normal text-3xl font-light tracking-widest text-white/70 transition-all duration-1000`}
          >
            are you lost?
          </h1>

          <p
            className={`eb-garamond-normal text-md tracking-wider text-gray-400/60`}
          >
            404 - page not found
          </p>

          <a
            href="/"
            className={`mt-16 inline-block text-md tracking-widest text-white/50 
              transition-all duration-300 hover:text-white/70 eb-garamond-normal`}
          >
            find your way back
          </a>
        </div>
      </div>
    </div>
  );
}