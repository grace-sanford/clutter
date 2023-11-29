"use client"
import React from 'react';
import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image';

const About = () => {
  return (
    <Layout pageTitle={'Clutter | About'}>
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="mt-0 flex items-center justify-center" style={{ minHeight: '5rem' }}>
      <p className="text-center text-3xl items-center justify-center text-red-300">
        About CLUTTER
      </p>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-blue-600 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-red-300">
        <p className="mb-1 font-bold text-2xl">
          How do you play?
        </p>
        <p>No <em>rhythms with</em>..., <em>sounds like</em>..., or <em>starts with</em>...</p>
        <p>No sounding out or spelling out names</p>
        <p className="mb-6">Fictional, real, famous, regular, extradordinary, funny, serious, historical and contemporary names welcome</p>
        <p className="mb-1 font-bold text-2xl">
          Who invented CLUTTER?
        </p>
        <p className="mb-6">Depending on who you ask, my Mom's friend, Denise, my Mom's friend, Lindsey, my Mom, the family in <a className="underline" href="https://en.wikipedia.org/wiki/Dan_in_Real_Life" target="_blank"><em>Dan In Real Life</em></a>, or this game is  
        actually just the first round of that other party game, <a className="underline" href="https://thenerdy.com/how-to-play-salad-bowl/" target="_blank">Salad Bowl</a></p>
        <p className="mb-1 font-bold text-2xl">
          What's the deal with this website?
        </p>
        <p className="mb-1">Developed with <a href='https://bun.sh/' target="_blank" 
        className="underline" >Bun</a> and <a href='https://chat.openai.com/' className="underline" target="_blank">ChatGPT</a>, 
        bootstraped with <a href="https://nextjs.org/" 
        target="_blank" className="underline">NextJS</a> frontend and <a href='https://www.postgresql.org/' 
        target="_blank" className="underline">PostreSQL</a> backend,
        this project is the work of me, <a href='https://github.com/grace-sanford' target="_blank" className="underline font-mono font-bold">
        @gracesanford</a> </p> 
        <div className='flex flex-row space-x-4 items-center'>
  <a href="https://bun.sh/" target="_blank" rel="noreferrer">
    <Image
      src="/bun-logo.svg" 
      alt="bun" 
      width={50} 
      height={50}
      className="logo"
    />
  </a>
  <a href="https://chat.openai.com/" target="_blank" rel="noreferrer">
    <Image
      src="/chatgpt-logo.svg" 
      alt="postresql" 
      width={50} 
      height={50}
      className="logo"
    />
  </a>
  <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
    <Image
      src="/next-logo.svg" 
      alt="postresql" 
      width={50} 
      height={50}
      className="logo"
    />
  </a>
  <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
    <Image 
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" 
      alt="postgresql" 
      width={50} 
      height={50}
      className="logo"
    /> 
  </a>
</div>
        <p>Landing page line art is courtesy of Kristina Margaryan from{' '}
          <a
            href="https://thenounproject.com/browse/icons/term/line-art/"
            className="underline"
            target="_blank"
            title="line art Icons"
          >
            Noun Project
          </a>{' '}
          (CC BY 3.0)</p>
        {/* "Play Clutter" button */}
        <Link href="/" className="bg-green-500 text-white py-3 px-6 rounded-full font-bold text-xl mt-8">
          Play CLUTTER
          </Link>
      </div>
      </div>
    </Layout>
  );
};

export default About;