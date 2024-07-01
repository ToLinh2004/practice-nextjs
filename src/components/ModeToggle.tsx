"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import Image from "next/image";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <button onClick={() => setTheme("light")}>
        <Image
          src="/sunny.png"
          width={20}
          height={20}
          alt="Picture of the author"
        />
        hhhhh
      </button>
      <button onClick={() => setTheme("dark")}>
        <Image
          src="/moon.png"
          width={20}
          height={20}
          alt="Picture of the author"
        />
        kkkkkk
      </button>
      <button onClick={() => setTheme("system")}>
        <Image
          src="/moon.png"
          width={20}
          height={20}
          alt="Picture of the author"
        />
        <span className="sr-only">Toggle theme</span>
      </button>
    </>
  );
}
