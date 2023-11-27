"use client";

import CreateGame from '@/components/CreateGame'
import CreatePlayersTeamsForm from '@/components/CreatePlayerTeam'
import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showCreatePlayersTeamsForm, setShowCreatePlayersTeamsForm] = useState(true);

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="mb-8 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      Get started by making teams!&nbsp;
      </p>
      <Image
        src="/face.png"
        alt="Face Icon"
        className="dark:invert"
        width={200}
        height={50}
        priority
      />
      <div className="text-xs mb-8">
      line art by Kristina Margaryan <br></br>from <a href="https://thenounproject.com/browse/icons/term/line-art/" className="underline" target="_blank" title="line art Icons">Noun Project</a> (CC BY 3.0)
      </div>

      {/* Render either CreatePlayersTeamsForm or CreateGame based on the condition */}
      {showCreatePlayersTeamsForm ? (
        <div className="z-10 max-w-5xl w-full justify-center font-mono text-base lg:flex">
          <CreatePlayersTeamsForm 
            showCreatePlayersTeamsForm={showCreatePlayersTeamsForm} 
            setShowCreatePlayersTeamsForm={setShowCreatePlayersTeamsForm}
          />
        </div>
      ) : (
        <CreateGame />
      )}

      {/* Footer at the bottom */}
      <div className="mt-auto flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-sm"
          href="https://github.com/grace-sanford"
          target="_blank"
          rel="noopener noreferrer"
        >
          By <code className="font-mono font-bold">@gracesanford</code>
        </a>
      </div>
    </main>
  )
}
