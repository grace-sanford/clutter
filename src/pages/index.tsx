"use client";

import Image from 'next/image';
import CreateGame from '@/components/CreateGame';
import CreatePlayersTeamsForm from '@/components/CreatePlayerTeam';
import React, { useState } from 'react';
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  const [showCreatePlayersTeamsForm, setShowCreatePlayersTeamsForm] = useState(true);

  return (
    <Layout>
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="mt-0 flex items-center justify-center" style={{ minHeight: '5rem' }}>
      <p className="text-center text-3xl items-center justify-center text-red-300">
       CLUTTER
      </p>
      </div>
         {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-blue-600 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-red-300">

        {/* Components */}
        {showCreatePlayersTeamsForm ? (
          <>
      {/* Image */}
      <Image
        src="/posh-face.png"
        alt="Face Icon"
        className="dark:invert"
        width={275}
        height={100}
        priority
      />
          <div className="z-10 max-w-5xl w-full justify-center text-base lg:flex mt-8">
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
      <div className="flex justify-center gap-1 p-8 lg:p-0 text-sm mb-2 mt-2">
          <span className="lg:whitespace-nowrap">code by</span>
          <code className="font-mono font-bold whitespace-nowrap lg:ml-2"><a href="https://github.com/grace-sanford" target="_blank">@gracesanford</a></code> | 
          <Link className="font-face" href="/about">about this project</Link>
      </div>
    </div>
    </Layout>
  );
}

