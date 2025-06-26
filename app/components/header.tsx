"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { LogIn, LogOut, User, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, isAdmin, user, logout } = useAuth()

  // Track scroll position for subtle header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine dashboard link based on admin status
  const dashboardLink = isAdmin ? "/admin/dashboard" : "/user/dashboard"

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300",
        isScrolled ? "shadow-md py-2" : "py-3 md:py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center group">
            <div className="relative h-10 w-36 md:h-12 md:w-48 overflow-hidden">
              <Image
                src="https://leuteriorealty.com/logomaterials/LeuterioRealty/Leuterio%20Realty%20logo%20black.png"
                alt="Leuterio Realty"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-realty-primary/10 scale-0 rounded-lg group-hover:scale-100 transition-transform duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="relative px-4 py-2 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-realty-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <Link
              href="/contests"
              className="relative px-4 py-2 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 group"
            >
              <span>Contests</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-realty-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={dashboardLink}
                  className="relative px-4 py-2 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 group"
                >
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {isAdmin ? "Admin Dashboard" : user?.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-realty-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-all duration-300 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="ml-2 px-5 py-2 bg-realty-primary text-white rounded-md font-medium hover:bg-realty-secondary transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}

            <Link
              href="https://leuteriorealty.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 bg-realty-primary text-white rounded-md font-medium hover:bg-realty-secondary transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Main Website
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 p-2 rounded-md bg-realty-primary/5 hover:bg-realty-primary/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span
                className={cn(
                  "absolute block h-0.5 bg-realty-primary rounded-full transition-all duration-300 w-6",
                  isMobileMenuOpen ? "top-3 rotate-45" : "top-1",
                )}
              ></span>
              <span
                className={cn(
                  "absolute top-3 block h-0.5 bg-realty-primary rounded-full transition-all duration-300",
                  isMobileMenuOpen ? "w-0 opacity-0" : "w-6 opacity-100",
                )}
              ></span>
              <span
                className={cn(
                  "absolute block h-0.5 bg-realty-primary rounded-full transition-all duration-300 w-6",
                  isMobileMenuOpen ? "top-3 -rotate-45" : "top-5",
                )}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden pt-20",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col h-full pb-6 px-6 overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="px-4 py-3 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/contests"
                className="px-4 py-3 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contests
              </Link>

              <Link
                href="/terms"
                className="px-4 py-3 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Terms & Conditions
              </Link>

              <Link
                href="/privacy"
                className="px-4 py-3 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardLink}
                    className="px-4 py-3 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 border-b border-gray-100 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-1" />
                    {isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-3 font-medium text-red-600 hover:text-red-800 transition-colors duration-300 border-b border-gray-100 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-4 py-3 font-medium text-realty-primary hover:text-realty-highlight transition-colors duration-300 border-b border-gray-100 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              )}

              <Link
                href="https://leuteriorealty.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-3 bg-realty-primary text-white rounded-md font-medium text-center hover:bg-realty-secondary transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Main Website
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.facebook.com/leuteriorealty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-realty-primary/10 text-realty-primary hover:bg-realty-primary hover:text-white transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/filipinohomesleuteriorealty/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-realty-primary/10 text-realty-primary hover:bg-realty-primary hover:text-white transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/leuteriorealty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-realty-primary/10 text-realty-primary hover:bg-realty-primary hover:text-white transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/leuterio-realty-&-brokerage/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-realty-primary/10 text-realty-primary hover:bg-realty-primary hover:text-white transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
