"use client";

import Image from "next/image";
import CreatePlayersTeamsForm from "@/components/CreatePlayerTeam";
import React, { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
// import { v4 } from "uuid";
import { useEffect } from "react";
import Modal from "react-modal";

export default function Home() {

  useEffect(() => {
    // Set the app element to the root element of your application
    Modal.setAppElement('#your-root-element-id');
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-screen" id="your-root-element-id">
        {/* Main Content */}
        <div
          className="flex-grow flex flex-row items-center justify-center bg-blue-600 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-red-300"
          style={{ minHeight: "100vh", overflowY: "auto" }}
        >
          <>
            {/* Image */}
            <div className="relative flex-grow flex justify-center">
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
          className="flex flex-row items-center justify-center gap-2 p-8 lg:p-0 text-sm mb-2 mt-2 text-red-300"
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
