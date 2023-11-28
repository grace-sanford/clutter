"use client"
import React from 'react';
import Layout from '../../components/Layout'

const About = () => {
  return (
    <Layout>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Header */}
      <p className="text-3xl font-bold mb-8 text-center text-green-600">
        About Clutter Game
      </p>

      {/* Content */}
      <div className="max-w-2xl text-center">
        <p className="mb-4">
          Clutter is an exciting game that challenges your strategic thinking and creativity. It's designed to bring fun and engagement to players of all ages.
        </p>
        <p className="mb-4">
          Whether you're a seasoned gamer or just looking for a casual and enjoyable experience, Clutter offers a unique gameplay experience that keeps you coming back for more.
        </p>
        <p className="mb-4">
          The game involves creating teams, managing players, and navigating through various challenges to achieve victory. With its intuitive interface and vibrant design, Clutter promises an immersive gaming adventure.
        </p>
        <p>
          Join us on this journey and let Clutter be your go-to game for entertainment and friendly competition.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none p-8">
        <div className="flex justify-center gap-1 text-sm">
          <span>Code by</span>
          <code className="font-mono font-bold">@gracesanford</code>
        </div>
        <div className="text-sm mt-2">
          Line art by Kristina Margaryan from{' '}
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
    </Layout>
  );
};

export default About;