"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react"

import { locales } from '@/i18n/settings'
import { Link } from '@/i18n/navigation'
import ProfileMenu from "@/components/ui/ProfileMenu"
import Image from "next/image"
import { config } from "@/app/[locale]/config"
// Définition du type HeaderProps


export function Header() {
  const t = useTranslations('navigation')
  const tTheme = useTranslations('theme')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'fr'
  const { data: session } = useSession()

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light"
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{config.title}</h1>
        <nav className="flex space-x-8">
          <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
          <Link href="/about" className="text-sm font-medium">{t('about')}</Link>
          <Link href="/projects" className="text-sm font-medium">{t('projects')}</Link>
          <Link href="/contact" className="text-sm font-medium">{t('contact')}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {locales.map((locale) => {
              const isActive = currentLocale === locale
              return (
                <Link
                  key={locale}
                  href="/"
                  locale={locale}
                  className={`text-sm font-medium ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {locale.toUpperCase()}
                </Link>
              )
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <Button variant="ghost" size="icon">
              <span className="sr-only">{tTheme('menu')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              <span className="sr-only">{tTheme('toggle')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hidden dark:block"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block dark:hidden"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </Button>
          </motion.div>
          <div className="relative">
            {session ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-900"
              >
                <Image
                  alt="User"
                  src={session?.user?.image || "/placeholder.svg"}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </button>
            ) : (
              <div className="flex gap-2 ml-auto">
                <Link href="/register">
                <Button variant="outline">
                  S&apos;inscrire
                </Button>
                </Link>
                <Link href="/login">
                <Button variant="default">
                  Se connecter
                </Button>
                </Link>
              </div>
            )}
            <AnimatePresence>
              {isProfileOpen && session && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72"
                >
                  <ProfileMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
} 