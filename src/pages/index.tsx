"use client";

import Image from "next/image";
import CreateGame from "@/components/CreateGame";
import CreatePlayersTeamsForm from "@/components/CreatePlayerTeam";
import React, { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
// import { v4 } from "uuid";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div
          className="mt-0 flex items-center justify-center"
          style={{ minHeight: "5rem" }}
        >
          <p className="text-center text-3xl items-center justify-center text-red-300">
            CLUTTER
          </p>
        </div>
        {/* Main Content */}
        <div
          className="flex-grow flex flex-col items-center justify-center bg-blue-600 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-red-300"
          style={{ minHeight: "100vh", overflowY: "auto" }}
        >
          <>
            {/* Image */}
            <div className="relative mt-20">
              <Image
                src="/posh-face.png"
                alt="Face Icon"
                className="dark:invert"
                width={275}
                height={100}
                priority
              />
            </div>
            {/* Position the CreatePlayersTeamsForm underneath the Image */}
            <div className="flex-grow flex justify-center items-top p-8 mt-15">
              <CreatePlayersTeamsForm />
            </div>
          </>
        </div>

        {/* Footer */}
        <div
          //<CreateGame/>
          className="flex flex-row items-center justify-center gap-2 p-8 lg:p-0 text-sm mb-2 mt-2 text-black"
          style={{ minHeight: "10vh" }}
        >
          <span className="lg:whitespace-nowrap">code by</span>
          <code className="font-mono font-bold whitespace-nowrap lg:ml-2">
            <a href="https://github.com/grace-sanford" target="_blank">
              @gracesanford
            </a>
          </code>{" "}
          |
          <Link className="underline" href="/about">
            about this project
          </Link>
        </div>
      </div>
    </Layout>
  );
}
