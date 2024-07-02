'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { createContext, useContext } from "react";
const inter = Inter({ subsets: ["latin"] });
type Theme={
  colors:{primary:string,
    secondary:string
  }
}

const defaultTheme:Theme= {
  colors:{
    primary:"#007bff",
    secondary:"#6c757d"
  }
}
const ThemeContext= createContext<Theme>(defaultTheme)

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>
}

export const useTheme= () =>useContext(ThemeContext);