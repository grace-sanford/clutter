"use client";

import Image from 'next/image';
import CreateGame from '@/components/CreateGame';
import CreatePlayersTeamsForm from '@/components/CreatePlayerTeam';
import React, { useState } from 'react';

export default function Home() {
  const [showCreatePlayersTeamsForm, setShowCreatePlayersTeamsForm] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <p className="mt-0 text-center text-3xl bg-red-200 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-blue-600">
        Welcome to Clutter
      </p>
         {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center">

        {/* Components */}
        {showCreatePlayersTeamsForm ? (
          <>
      {/* Image */}
      <Image
        src="/face.png"
        alt="Face Icon"
        className="dark:invert mb-8"
        width={200}
        height={100}
        priority
      />
          <div className="z-10 max-w-5xl w-full justify-center text-base lg:flex">
            <CreatePlayersTeamsForm
              showCreatePlayersTeamsForm={showCreatePlayersTeamsForm}
              setShowCreatePlayersTeamsForm={setShowCreatePlayersTeamsForm}
            />
          </div>
          </>
        ) : (
          <CreateGame />
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto text-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <div className="flex justify-center gap-1 p-8 lg:pointer-events-auto lg:p-0 text-sm">
          <span className="lg:whitespace-nowrap">code by</span>
          <code className="font-mono font-bold whitespace-nowrap lg:ml-2">@gracesanford</code>
        </div>
        <div className="text-sm mb-4">
          line art by Kristina Margaryan from{' '}
          <a
            href="https://thenounproject.com/browse/icons/term/line-art/"
            className="underline"
            target="_blank"
            title="line art Icons"
          >
            Noun Project
          </a>{' '}
          (CC BY 3.0)
        </div>
      </div>
    </div>
  );
}

