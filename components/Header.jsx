import Link from "next/link";
import React, { Fragment } from "react";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import { ConnectButton, lightTheme } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header>
      <Popover className="relative bg-dark-bg px-3">
        <div className="flex justify-between items-center px-1 py-6 sm:px-3 md:justify-start md:space-x-10">
          <div className="flex items-center ">
            <Link href="/" passHref>
              <h1 className=" text-4xl -mt-1 font-poppins font-extrabold ml-3 ">
                MRKT
              </h1>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-slate-300 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-sky-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-7 w-7 text-black" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-16">
              <Link href="/app" passHref>
                <div className="text-md ease-in rounded-lg transition-all text-gray-800 hover:text-sky-400">
                  App
                </div>
              </Link>

              <a
                target="blank"
                href="https://feedback.nirvanalabs.io/"
                className="text-md ease-in rounded-lg text-gray-800 transition-all hover:text-sky-400"
                rel="noreferrer"
              >
                Roadmap
              </a>
              {/* <a
              target="blank"
              href="https://docs.rarelist.io/"
              className="text-md ease-in rounded-lg text-gray-800 transition-all hover:text-sky-400"
              rel="noreferrer"
            >
              Docs
            </a> */}
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <div>
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 z-20 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 bg-menu-bg divide-y-2 divide-sky-700">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    <Link href="/" passHref>
                      <h1 className=" text-4xl md:text-4xl font-extrabold ml-3 font-poppins">
                        MRKT
                      </h1>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-slate-300 rounded-md p-2 inline-flex items-center justify-center text-gray-300 hover:text-sky-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon
                        className="h-7 w-7 text-black"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 bg-white">
                <div className="flex flex-col justify-center content-center w-full text-center">
                  <Link href="/app" passHref>
                    <div className="text-xl py-2 my-2 text-gray-700 hover:text-sky-400">
                      App
                    </div>
                  </Link>

                  <Link href="https://nirvanalabs.io" passHref>
                    <div className="text-xl py-2 my-2 text-gray-700 hover:text-sky-400">
                      About Us
                    </div>
                  </Link>

                  {/* <Link href="/get-listed" passHref>
                  <a
                    className="text-xl py-2 my-2 text-gray-200 hover:text-sky-400"
                  >
                    Creator Portal
                    </a>
                </Link> */}
                </div>
                <ConnectButton />
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
