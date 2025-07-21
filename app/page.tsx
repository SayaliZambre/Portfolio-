"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  MapPin,
  Award,
  Code,
  GraduationCap,
  Menu,
  X,
  Calendar,
  Building,
  ChevronRight,
  Cloud,
  User,
  Lightbulb,
  Palette,
  Zap,
  Sun,
  Moon,
  MessageCircle,
  Send,
  Minimize2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isRaining, setIsRaining] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", 
      message: "Hi! I'm Sayali's AI assistant. How can I help you today?"
     },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const audioRef = useRef<HTMLAudioElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Music tracks
  const tracks = [
    {
      //  title: "Perfect",
    // artist: "Ed Sheeran",
    src: "./songs/Perfect.mp3", // ✅ leading slash, path is correct now
    srcSet: "./songs/Perfect.mp3",
  },
    // { title: "Chill Vibes", artist: "Lo-Fi Beats", src: "./songs/home-lofi-ambient-chill-176082.mp3" },
    // { title: "Coding Flow", artist: "Ambient Tech", src: "./songs/sapphire-2025-346224.mp3"},
  //  { title: " Flow", artist: " Tech", src: "songs/" },

  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "skills", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleRain = () => {
    setIsRaining(!isRaining)
  }

  const toggleMusic = () => {
    setIsMusicPlayerOpen(!isMusicPlayerOpen)
  }

  const playPause = () => {
    if (audioRef.current) {
      setIsLoading(true)
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Fallback for when audio can't play
            setIsPlaying(false)
          })
      }
      setIsLoading(false)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    }
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    const userMessage = { type: "user", message: currentMessage }
    setChatMessages((prev) => [...prev, userMessage])

    // Simple bot responses
    setTimeout(() => {
      let botResponse = ""
      const msg = currentMessage.toLowerCase()

      if (msg.includes("experience") || msg.includes("work")) {
        botResponse =
          "Sayali has experience at Cognizant, Maikisan, and Ricoz. She's worked on full-stack development, React Native apps, and blockchain projects!"
      } else if (msg.includes("skills") || msg.includes("tech")) {
        botResponse =
          "Sayali is skilled in React.js, Next.js, React Native, Node.js, MongoDB, Blockchain, and more. She's also solved 300+ LeetCode problems!"
      } else if (msg.includes("projects")) {
        botResponse =
          "Some of her notable projects include Dhanwantari (healthcare app), Healthcare Blockchain system, Referral App, and Vagabond Partners!"
      } else if (msg.includes("contact") || msg.includes("email")) {
        botResponse =
          "You can reach Sayali at zambresayali6@gmail.com or call +91-9284637275. She's based in Nanded, India."
      } else if (msg.includes("education")) {
        botResponse =
          "Sayali is pursuing B.Tech in Electronics & Telecommunication Engineering from Shri Guru Gobind Singhji Institute, Nanded (2021-2025)."
      } else {
        botResponse =
          "That's interesting! Feel free to ask me about Sayali's experience, skills, projects, or how to contact her."
      }

      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
    }, 1000)

    setCurrentMessage("")
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitStatus("success")
    setIsSubmitting(false)
    setContactForm({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setSubmitStatus("idle"), 5000)
  }

  const handleContactChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  if (!mounted) return null

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      } overflow-x-hidden relative`}
    >
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        onEnded={() => setIsPlaying(false)}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      >
        <source src={tracks[currentTrack].src} type="audio/mpeg" />
      </audio>

      {/* Animated Background Particles */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${
              theme === "dark" ? "bg-cyan-400/20" : "bg-blue-400/20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Rain Effect */}
      {isRaining && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-gradient-to-b from-blue-400 to-transparent opacity-60 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                height: `${15 + Math.random() * 25}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Background Image */}
      <div
        className={`fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ${
          theme === "dark" ? "opacity-100" : "opacity-20"
        }`}
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg')`,
        }}
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            theme === "dark" ? "bg-slate-900/60" : "bg-white/40"
          }`}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-700 ${
          theme === "dark" ? "bg-slate-900/80 border-slate-700/50" : "bg-white/80 border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="text-2xl animate-wave">👋</span>
              <span
                className={`font-bold text-xl transition-all duration-700 animate-pulse ${
                  theme === "dark" ? "text-cyan-400" : "text-blue-600"
                }`}
              >
                Sayali .Dev
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-500 hover:scale-110 transform ${
                    activeSection === item.id
                      ? theme === "dark"
                        ? "text-cyan-400 scale-110"
                        : "text-blue-600 scale-110"
                      : theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-600"
                  } hover:${theme === "dark" ? "text-cyan-400" : "text-blue-600"} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side icons */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`transition-all duration-500 hover:scale-125 hover:rotate-180 ${
                  theme === "dark" ? "text-gray-300 hover:text-cyan-400" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRain}
                className={`transition-all duration-500 hover:scale-125 ${
                  isRaining
                    ? theme === "dark"
                      ? "text-blue-400 animate-bounce"
                      : "text-blue-600 animate-bounce"
                    : theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-600"
                } hover:${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}
              >
                <Cloud className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMusic}
                className={`transition-all duration-500 hover:scale-125 ${
                  isMusicPlayerOpen
                    ? theme === "dark"
                      ? "text-green-400 animate-pulse"
                      : "text-green-600 animate-pulse"
                    : theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-600"
                } hover:${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}
              >
                <Music className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Navigation Button */}
            <button
              className={`md:hidden transition-all duration-500 hover:scale-110 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-down">
              <div
                className={`px-2 pt-2 pb-3 space-y-1 border-t transition-all duration-700 ${
                  theme === "dark" ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-gray-200/50"
                }`}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block px-3 py-2 text-base font-medium transition-all duration-500 hover:scale-105 ${
                      activeSection === item.id
                        ? theme === "dark"
                          ? "text-cyan-400"
                          : "text-blue-600"
                        : theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-600"
                    } hover:${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Vibe Message */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 animate-bounce-slow">
        <div
          className={`backdrop-blur-sm border rounded-full px-6 py-2 text-sm flex items-center gap-2 transition-all duration-700 hover:scale-105 ${
            theme === "dark"
              ? "bg-slate-800/80 border-cyan-500/30 text-cyan-400"
              : "bg-white/80 border-blue-500/30 text-blue-600"
          }`}
        >
          {/* Enjoy the vibe - hit play & add some rain. 🎵🌧️ */}
        </div>
      </div>

      {/* Music Player */}
      {isMusicPlayerOpen && (
        <div className="fixed top-24 right-6 z-50 animate-slide-down">
          <Card
            className={`w-80 shadow-xl transition-all duration-700 ${
              theme === "dark" ? "bg-slate-800/95 border-slate-700" : "bg-white/95 border-gray-200"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      isPlaying ? (theme === "dark" ? "bg-green-400" : "bg-green-500") : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="font-semibold">Now Playing</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMusicPlayerOpen(false)}
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center mb-6">
                <div
                  className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center transition-all duration-500 ${
                    isPlaying ? "animate-spin-slow" : ""
                  } ${theme === "dark" ? "bg-slate-700" : "bg-gray-200"}`}
                >
                  <Music className={`w-8 h-8 ${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`} />
                </div>
                <h3
                  className={`font-semibold text-lg transition-colors duration-700 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tracks[currentTrack].title}
                </h3>
                <p
                  className={`text-sm transition-colors duration-700 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {tracks[currentTrack].artist}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTrack}
                  className="hover:scale-110 transition-all duration-300"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  onClick={playPause}
                  disabled={isLoading}
                  className={`w-12 h-12 rounded-full transition-all duration-500 hover:scale-110 ${
                    theme === "dark" ? "bg-cyan-600 hover:bg-cyan-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTrack}
                  className="hover:scale-110 transition-all duration-300"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Chatbot - Left Side */}
      <div className="fixed bottom-6 left-6 z-50">
        {!isChatOpen ? (
          <div className="relative">
            {/* Floating Chat Button */}
            <Button
              onClick={() => setIsChatOpen(true)}
              className={`relative rounded-full w-16 h-16 shadow-2xl transition-all duration-700 hover:scale-125 animate-bounce-slow group ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              }`}
            >
              <MessageCircle className="w-7 h-7 text-white" />

              {/* Notification Dot */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>

              {/* Ripple Effect */}
              <div
                className={`absolute inset-0 rounded-full animate-ping ${
                  theme === "dark" ? "bg-cyan-400/30" : "bg-blue-400/30"
                }`}
              ></div>
            </Button>

            {/* Welcome Message Tooltip */}
            <div
              className={`absolute bottom-20 left-0 w-64 p-3 rounded-lg shadow-xl animate-fade-in pointer-events-none ${
                theme === "dark"
                  ? "bg-slate-800/95 border border-slate-700 text-white"
                  : "bg-white/95 border border-gray-200 text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold"></span>
              </div>
              <p className="text-xs opacity-80"></p>

              {/* Arrow pointing to button */}
              <div
                className={`absolute -bottom-2 left-8 w-4 h-4 rotate-45 ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              ></div>
            </div>
          </div>
        ) : (
          <Card
            className={`w-96 h-[500px] shadow-2xl transition-all duration-700 animate-slide-up border-2 ${
              theme === "dark"
                ? "bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-cyan-500/30"
                : "bg-gradient-to-b from-white/95 to-gray-50/95 border-blue-500/30"
            }`}
          >
            {/* Enhanced Header */}
            <div
              className={`flex items-center justify-between p-4 border-b-2 ${
                theme === "dark"
                  ? "border-slate-700/50 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"
                  : "border-gray-200/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* AI Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center animate-pulse ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-500"
                  }`}
                >
                  <span className="text-white font-bold text-sm">AI</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="font-bold text-lg">Sayali's AI Assistant</span>
                  </div>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Always online • Responds instantly
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Minimize Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className={`hover:scale-110 transition-all duration-300 rounded-full w-8 h-8 ${
                    theme === "dark" ? "hover:bg-slate-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced Chat Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-black/5">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`flex items-end gap-2 max-w-xs ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        msg.type === "user"
                          ? theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : theme === "dark"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                      }`}
                    >
                      {msg.type === "user" ? "You" : "AI"}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm shadow-lg transition-all duration-500 hover:scale-105 relative ${
                        msg.type === "user"
                          ? theme === "dark"
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : theme === "dark"
                            ? "bg-gradient-to-r from-slate-700 to-slate-600 text-gray-100 border border-slate-600"
                            : "bg-gradient-to-r from-gray-100 to-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      {msg.message}

                      {/* Message Tail */}
                      <div
                        className={`absolute top-4 ${
                          msg.type === "user" ? "right-0 translate-x-1" : "left-0 -translate-x-1"
                        } w-3 h-3 rotate-45 ${
                          msg.type === "user"
                            ? theme === "dark"
                              ? "bg-cyan-600"
                              : "bg-blue-600"
                            : theme === "dark"
                              ? "bg-slate-700 border-r border-b border-slate-600"
                              : "bg-gray-100 border-r border-b border-gray-200"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                    }`}
                  >
                    AI
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      theme === "dark" ? "bg-slate-700 border border-slate-600" : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Input Form */}
            <form
              onSubmit={handleChatSubmit}
              className={`p-4 border-t-2 ${
                theme === "dark"
                  ? "border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50"
                  : "border-gray-200/50 bg-gradient-to-r from-white/50 to-gray-50/50"
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask me anything about Sayali..."
                    className={`w-full px-4 py-3 rounded-full text-sm border-2 transition-all duration-500 focus:scale-105 pr-12 ${
                      theme === "dark"
                        ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                        : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-${theme === "dark" ? "cyan" : "blue"}-500/50`}
                  />

                  {/* Mic Icon */}
                  <button
                    type="button"
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      theme === "dark" ? "text-gray-400 hover:text-cyan-400" : "text-gray-500 hover:text-blue-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <Button
                  type="submit"
                  className={`rounded-full w-12 h-12 transition-all duration-500 hover:scale-110 shadow-lg ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                  } text-white`}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex gap-2 mt-3">
                {["👋 Say Hi", "💼 Experience", "🚀 Projects", "📧 Contact"].map((action, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentMessage(action.split(" ").slice(1).join(" "))}
                    className={`px-3 py-1 rounded-full text-xs transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-slate-600"
                        : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 border border-gray-300"
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </form>
          </Card>
        )}
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 pt-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <h2
                className={`text-lg mb-4 transition-all duration-700 animate-fade-in ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Hello, I'm
              </h2>
              <h1
                className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-700 animate-text-glow animate-typing ${
                  theme === "dark" ? "text-cyan-400" : "text-blue-600"
                }`}
              >
                SAYALI
              </h1>
              <p
                className={`text-xl mb-12 transition-all duration-700 animate-fade-in-up ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
                style={{ animationDelay: "0.5s" }}
              >
                {/* Full Stack Dev & Electronics Engineer */}
                Software Developer
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {[
                  // { number: "2+", label: "Years Experience" },
                  { number: "10+", label: "Projects Completed" },
                  { number: "3+", label: "Internships Done" },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className={`backdrop-blur-sm transition-all duration-700 hover:scale-110 hover:-translate-y-2 animate-fade-in-up ${
                      theme === "dark"
                        ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                        : "bg-white/50 border-gray-200/50 hover:bg-white/70"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`text-2xl font-bold mb-1 transition-all duration-700 animate-pulse ${
                          theme === "dark" ? "text-cyan-400" : "text-blue-600"
                        }`}
                      >
                        {stat.number}
                      </div>
                      <div
                        className={`text-xs transition-all duration-700 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
               <a
  href="https://drive.google.com/uc?export=download&id=1g3eSOvVYtelv50A8AAdzrO9Yvk46Ffi8"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl animate-pulse">
    Resume
  </Button>
</a>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className={`px-8 py-3 rounded-lg bg-transparent transition-all duration-500 hover:scale-110 hover:shadow-xl ${
                    theme === "dark"
                      ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Right Content - Profile */}
            <div className="relative flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative">
                {/* Profile Image */}
                {/* <div
                  className={`w-80 h-80 rounded-full border-4 overflow-hidden flex items-center justify-center transition-all duration-700 hover:scale-110 animate-float ${
                    theme === "dark" ? "border-cyan-400 bg-slate-800" : "border-blue-600 bg-white"
                  }`}
                >
                  <User
                    className={`w-32 h-32 transition-all duration-700 animate-pulse ${
                      theme === "dark" ? "text-cyan-400" : "text-blue-600"
                    }`}
                  />
                </div> */}

                <div
  className={`w-80 h-80 rounded-full border-4 overflow-hidden flex items-center justify-center transition-all duration-700 hover:scale-110 animate-float ${
    theme === "dark" ? "border-cyan-400 bg-slate-800" : "border-blue-600 bg-white"
  }`}
>
  <img
    src="./Sayali.jpg" // Replace this with your actual image path
    alt="Profile"
    className="w-full h-full object-cover transition-all duration-700"
  />
</div>

                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 animate-bounce-slow">
                  <Link href="https://github.com/SayaliZambre" target="_blank">
                    <Button
                      size="sm"
                      className={`rounded-full border transition-all duration-500 hover:scale-125 hover:rotate-12 ${
                        theme === "dark"
                          ? "bg-slate-800 border-slate-600 hover:bg-slate-700"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Github className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Skill Badges */}
                {[
                  { icon: Code, text: "Clean Code", position: "top-8 -left-16", color: "cyan" },
                  { icon: Palette, text: "Creative Design", position: "bottom-16 -left-20", color: "green" },
                  { icon: Lightbulb, text: "Innovation", position: "top-20 -right-16", color: "purple" },
                  { icon: Zap, text: "Problem Solver", position: "bottom-8 -right-12", color: "yellow" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`absolute ${badge.position} animate-float hover:scale-125 transition-all duration-500`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <Badge
                      className={`backdrop-blur-sm border transition-all duration-500 hover:scale-125 cursor-pointer ${
                        theme === "dark"
                          ? `bg-slate-800/80 text-${badge.color}-400 border-${badge.color}-400/30`
                          : `bg-white/80 text-${badge.color}-600 border-${badge.color}-600/30`
                      }`}
                    >
                      <badge.icon className="w-3 h-3 mr-1" />
                      {badge.text}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`relative z-10 py-20 transition-all duration-700 ${
          theme === "dark" ? "bg-slate-900/50" : "bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Experience
            </h2>
            <div
              className={`w-20 h-1 mx-auto mb-6 transition-all duration-700 animate-pulse ${
                theme === "dark" ? "bg-cyan-400" : "bg-blue-600"
              }`}
            ></div>
            <p
              className={`text-lg transition-all duration-700 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              My professional journey and internship experiences
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Intern - Cognizant",
                period: "May 2024 - Ongoing",
                badge: "Current",
                badgeColor: "green",
                points: [
                  "Gained hands-on experience in C# and the .NET framework by developing scalable applications",
                  "Strengthened skills in software development workflows and database integration",
                ],
              },
              {
                title: "Junior IT Developer - Maikisan",
                period: "February 2024 - April 2024",
                badge: "Certificate",
                badgeColor: "slate",
                points: [
                  "Contributed to agricultural e-commerce platform connecting farmers with buyers",
                  "Built platform using React Native, React.js, and Next.js",
                ],
              },
              {
                title: "Full Stack Developer Intern - Ricoz",
                period: "June 2024 - September 2024",
                badge: "Remote",
                badgeColor: "slate",
                points: [
                  "Built and maintained web applications using React.js and Next.js",
                  "Focused on server-side rendering and SEO optimization",
                ],
              },
            ].map((exp, index) => (
              <Card
                key={index}
                className={`backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:-translate-y-4 animate-slide-in-left ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                    : "bg-white/50 border-gray-200/50 hover:bg-white/70"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-700 animate-pulse ${
                          theme === "dark" ? "bg-blue-500/20" : "bg-blue-500/10"
                        }`}
                      >
                        <Building
                          className={`w-6 h-6 transition-all duration-700 ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-semibold transition-all duration-700 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {exp.title}
                        </h3>
                        <p
                          className={`flex items-center gap-2 transition-all duration-700 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`transition-all duration-700 animate-pulse ${
                        exp.badgeColor === "green"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : theme === "dark"
                            ? "bg-slate-600/50 text-gray-300 border border-slate-600"
                            : "bg-gray-100 text-gray-600 border border-gray-300"
                      }`}
                    >
                      {exp.badge}
                    </Badge>
                  </div>
                  <ul
                    className={`space-y-2 transition-all duration-700 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {exp.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <ChevronRight
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-all duration-700 ${
                            theme === "dark" ? "text-cyan-400" : "text-blue-600"
                          }`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Projects
            </h2>
            <div
              className={`w-20 h-1 mx-auto mb-6 transition-all duration-700 animate-pulse ${
                theme === "dark" ? "bg-cyan-400" : "bg-blue-600"
              }`}
            ></div>
            <p
              className={`text-lg transition-all duration-700 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Some of my notable projects and contributions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Dhanwantari App",
                subtitle: "Healthcare Management Application",
                description: "Android healthcare app with vital medical information input and emergency SOS features.",
                tech: ["React Native", "Node.js", "MongoDB", "Redux"],
                color: "red",
              },
              
              {
                title: "Healthcare Blockchain App",
                subtitle: "Blockchain-based Healthcare System",
                description: "Secure patient record management with blockchain technology and smart contracts.",
                tech: ["React.js", "Blockchain", "Solidity", "Node.js"],
                color: "blue",
              },
              {
                title: "Referral App",
                subtitle: "Job Referral Platform",
                description: "MERN stack application connecting job seekers with professionals offering referrals.",
                tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
                color: "green",
              },
              {
                title: "Vagabond Partners",
                subtitle: "Travel Companion Finder",
                description: "Connect with like-minded travelers and explore new places together.",
                tech: ["React Native", "MongoDB", "Chat API"],
                color: "purple",
              },
              {
                title: " Quiz App",
                subtitle: "Quiz for mhcet students",
                description: "Interactive quiz application for MHCET students to test their knowledge and prepare for exams.",
                tech: ["React js", "MongoDB", "Nodejs"],
                color: "yellow",
              },
             
              {
                title: " BlockDrive ",
                subtitle: "  Blockchain-based File Storage",
                description: "Decentralized file storage system using blockchain technology for secure and efficient data management.",
                tech: ["React Native", "MongoDB", "Chat API"],
                color: "purple",
              },
              {
                title: " Chat boat",
                subtitle: "AI Chatbot Application",
                description: "AI-powered chatbot application for customer support and user interaction.",
                tech: ["React Native", "MongoDB", "Chat API"],
                color: "purple",
              },
              {
                title: " Ecomerse App",
                subtitle: "E-commerce Application",
                description: "Full-stack e-commerce application with product listings, cart management, and payment integration.",
                tech: ["React Native", "MongoDB", "Chat API"],
                color: "purple",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className={`group backdrop-blur-sm transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:rotate-1 animate-fade-in-up ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                    : "bg-white/50 border-gray-200/50 hover:bg-white/70"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-700 animate-pulse ${
                        theme === "dark" ? `bg-${project.color}-500/20` : `bg-${project.color}-500/10`
                      }`}
                    >
                      <Code
                        className={`w-6 h-6 transition-all duration-700 ${
                          theme === "dark" ? `text-${project.color}-400` : `text-${project.color}-600`
                        }`}
                      />
                    </div>
                    <Link href="#" className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 transition-all duration-500 hover:scale-110 ${
                          theme === "dark" ? "text-gray-300 hover:text-cyan-400" : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </Button>
                    </Link>
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-2 transition-all duration-700 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-2 transition-all duration-700 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className={`mb-4 text-sm leading-relaxed transition-all duration-700 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        className={`backdrop-blur-sm border transition-all duration-500 hover:scale-110 cursor-pointer ${
                          theme === "dark"
                            ? `bg-${project.color}-500/20 text-${project.color}-400 border-${project.color}-500/30`
                            : `bg-${project.color}-500/10 text-${project.color}-600 border-${project.color}-500/30`
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`relative z-10 py-20 transition-all duration-700 ${
          theme === "dark" ? "bg-slate-900/50" : "bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Skills
            </h2>
            <div
              className={`w-20 h-1 mx-auto mb-6 transition-all duration-700 animate-pulse ${
                theme === "dark" ? "bg-cyan-400" : "bg-blue-600"
              }`}
            ></div>
            <p
              className={`text-lg transition-all duration-700 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Languages",
                skills: ["C++", "JavaScript", "Typescript", "Nodejs", "Solidity"],
                color: "blue",
              },
              {
                title: "Frameworks",
                skills: ["React.js", "Next.js", "React Native", "Express.js"],
                color: "green",
              },
              {
                title: "Tools",
                skills: ["Figma", "Git", "GitHub", "VS Code"],
                color: "purple",
              },
              {
                title: "Database",
                skills: ["MongoDB", "SQL", "Blockchain"],
                color: "red",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className={`backdrop-blur-sm transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-slide-in-up ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                    : "bg-white/50 border-gray-200/50 hover:bg-white/70"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-700 animate-pulse ${
                        theme === "dark" ? `bg-${category.color}-500/20` : `bg-${category.color}-500/10`
                      }`}
                    >
                      <Code
                        className={`w-5 h-5 transition-all duration-700 ${
                          theme === "dark" ? `text-${category.color}-400` : `text-${category.color}-600`
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold transition-all duration-700 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        className={`backdrop-blur-sm border transition-all duration-500 hover:scale-110 cursor-pointer ${
                          theme === "dark"
                            ? `bg-${category.color}-500/20 text-${category.color}-400 border-${category.color}-500/30`
                            : `bg-${category.color}-500/10 text-${category.color}-600 border-${category.color}-500/30`
                        }`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Walchand Hackathon", subtitle: "Finalist - Top 5", color: "yellow" },
              { title: "Frontend Battle 2.0", subtitle: "3rd Position", color: "orange" },
              { title: "Webverse", subtitle: "2nd Position", color: "Red" },
              { title: "LeetCode", subtitle: "300+ Problems", color: "green" },
            ].map((achievement, index) => (
              <Card
                key={index}
                className={`backdrop-blur-sm transition-all duration-700 hover:scale-110 hover:-translate-y-2 text-center animate-fade-in-up ${
                  theme === "dark"
                    ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                    : "bg-white/50 border-gray-200/50 hover:bg-white/70"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-700 animate-pulse ${
                      theme === "dark" ? `bg-${achievement.color}-500/20` : `bg-${achievement.color}-500/10`
                    }`}
                  >
                    <Award
                      className={`w-6 h-6 transition-all duration-700 ${
                        theme === "dark" ? `text-${achievement.color}-400` : `text-${achievement.color}-600`
                      }`}
                    />
                  </div>
                  <h4
                    className={`font-semibold mb-2 transition-all duration-700 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {achievement.title}
                  </h4>
                  <p
                    className={`text-sm transition-all duration-700 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {achievement.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              About Me
            </h2>
            <div
              className={`w-20 h-1 mx-auto mb-6 transition-all duration-700 animate-pulse ${
                theme === "dark" ? "bg-cyan-400" : "bg-blue-600"
              }`}
            ></div>
            <p
              className={`text-lg transition-all duration-700 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Get to know me better
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h3
                className={`text-2xl font-bold mb-6 transition-all duration-700 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                My Journey
              </h3>
              <p
                className={`mb-6 leading-relaxed transition-all duration-700 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I'm currently pursuing my Bachelor's in Electronics and Telecommunication Engineering at Shri Guru
                Gobind Singhji Institute Of Engineering And Technology, Nanded. My journey in technology has been
                enriched through valuable internships at leading companies like Cognizant, Maikisan, and Ricoz.
              </p>
              <p
                className={`mb-8 leading-relaxed transition-all duration-700 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                My passion lies in creating innovative solutions that bridge the gap between technology and real-world
                problems. I specialize in full-stack development with expertise in React, Next.js, React Native, and
                emerging technologies like blockchain.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "300+", label: "LeetCode Problems" },
                  { number: "5+", label: "Major Projects" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-lg border transition-all duration-700 hover:scale-110 hover:-translate-y-2 animate-fade-in-up ${
                      theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-white/50 border-gray-200/50"
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div
                      className={`text-2xl font-bold mb-1 transition-all duration-700 animate-pulse ${
                        theme === "dark" ? "text-cyan-400" : "text-blue-600"
                      }`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className={`text-sm transition-all duration-700 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 animate-slide-in-right">
              <Card
                className={`backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                  theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-white/50 border-gray-200/50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-700 animate-pulse ${
                        theme === "dark" ? "bg-blue-500/20" : "bg-blue-500/10"
                      }`}
                    >
                      <GraduationCap
                        className={`w-6 h-6 transition-all duration-700 ${
                          theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-semibold transition-all duration-700 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Education
                      </h4>
                      <p
                        className={`transition-all duration-700 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        B.Tech in Electronics & Telecommunication
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm mb-1 transition-all duration-700 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Shri Guru Gobind Singhji Institute Of Engineering And Technology, Nanded
                  </p>
                  <p
                    className={`text-sm transition-all duration-700 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    August 2021 - May 2025
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                  theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-white/50 border-gray-200/50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-700 animate-pulse ${
                        theme === "dark" ? "bg-purple-500/20" : "bg-purple-500/10"
                      }`}
                    >
                      <MapPin
                        className={`w-6 h-6 transition-all duration-700 ${
                          theme === "dark" ? "text-purple-400" : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-semibold transition-all duration-700 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Location
                      </h4>
                      <p
                        className={`transition-all duration-700 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Nanded, India
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm transition-all duration-700 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Available for remote work and relocation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`relative z-10 py-20 transition-all duration-700 ${
          theme === "dark" ? "bg-slate-900/50" : "bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Get In Touch
            </h2>
            <div
              className={`w-20 h-1 mx-auto mb-6 transition-all duration-700 animate-pulse ${
                theme === "dark" ? "bg-cyan-400" : "bg-blue-600"
              }`}
            ></div>
            <p
              className={`text-lg transition-all duration-700 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              Let's connect and discuss opportunities
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-slide-in-left">
                <h3
                  className={`text-2xl font-bold mb-8 transition-all duration-700 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Contact Information
                </h3>
                <div className="space-y-6 mb-8">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      content: "zambresayali6@gmail.com",
                      href: "mailto:zambresayali6@gmail.com",
                      color: "blue",
                    },
                    { icon: Phone, title: "Mobile", content: "+91-9284637275", color: "green" },
                    { icon: MapPin, title: "Location", content: "Nanded, India", color: "purple" },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-700 hover:scale-105 hover:-translate-y-1 animate-fade-in-up ${
                        theme === "dark" ? "hover:bg-slate-800/30" : "hover:bg-white/30"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-700 animate-pulse ${
                          theme === "dark" ? `bg-${contact.color}-500/20` : `bg-${contact.color}-500/10`
                        }`}
                      >
                        <contact.icon
                          className={`w-6 h-6 transition-all duration-700 ${
                            theme === "dark" ? `text-${contact.color}-400` : `text-${contact.color}-600`
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-semibold transition-all duration-700 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {contact.title}
                        </p>
                        {contact.href ? (
                          <Link
                            href={contact.href}
                            className={`transition-all duration-500 hover:scale-105 ${
                              theme === "dark"
                                ? "text-gray-300 hover:text-cyan-400"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                          >
                            {contact.content}
                          </Link>
                        ) : (
                          <p
                            className={`transition-all duration-700 ${
                              theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {contact.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h4
                    className={`text-xl font-bold mb-4 transition-all duration-700 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Connect With Me
                  </h4>
                  {[
                    {
                      icon: Github,
                      title: "GitHub",
                      subtitle: "View my repositories",
                      href: "https://github.com/SayaliZambre",
                    },
                    {
                      icon: Linkedin,
                      title: "LinkedIn",
                      subtitle: "Professional network",
                      href: "https://www.linkedin.com/in/sayali-zambre-a21690242",
                    },
                    {
                      icon: Linkedin,
                      title: "Figma",
                      subtitle: "designs",
                      href: "https://www.figma.com/files/team/1106180380533840104/user/1106180372083635313?fuid=1106180372083635313",
                    },
                    { icon: Code, title: "LeetCode", subtitle: "Coding practice", href: "https://leetcode.com/u/Sayaliiiii/" },
                    { icon: Code, title: "GFG", subtitle: "Coding practice", href: "https://www.geeksforgeeks.org/user/2021berazj/" },

                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-700 hover:scale-105 hover:-translate-y-1 group animate-fade-in-up ${
                        theme === "dark"
                          ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                          : "bg-white/50 border-gray-200/50 hover:bg-white/70"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-700 ${
                          theme === "dark"
                            ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                            : "bg-gray-100 group-hover:bg-gray-200"
                        }`}
                      >
                        <social.icon
                          className={`w-6 h-6 transition-all duration-500 ${
                            theme === "dark"
                              ? "text-gray-300 group-hover:text-cyan-400"
                              : "text-gray-600 group-hover:text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold transition-all duration-700 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {social.title}
                        </p>
                        <p
                          className={`text-sm transition-all duration-700 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {social.subtitle}
                        </p>
                      </div>
                      <ExternalLink
                        className={`w-5 h-5 transition-all duration-500 ${
                          theme === "dark"
                            ? "text-gray-400 group-hover:text-cyan-400"
                            : "text-gray-500 group-hover:text-blue-600"
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-slide-in-right">
                <Card
                  className={`backdrop-blur-sm transition-all duration-700 hover:scale-105 ${
                    theme === "dark" ? "bg-slate-800/50 border-slate-700/50" : "bg-white/50 border-gray-200/50"
                  }`}
                >
                  <CardContent className="p-8">
                    <h3
                      className={`text-2xl font-bold mb-6 transition-all duration-700 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Send Message
                    </h3>

                    {submitStatus === "success" && (
                      <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 animate-fade-in">
                        <p className="font-semibold">Message sent successfully! 🎉</p>
                        <p className="text-sm">I'll get back to you soon.</p>
                      </div>
                    )}

                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className={`text-sm font-medium transition-all duration-700 ${
                              theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={contactForm.name}
                            onChange={(e) => handleContactChange("name", e.target.value)}
                            required
                            className={`transition-all duration-500 focus:scale-105 ${
                              theme === "dark"
                                ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                            } focus:outline-none focus:ring-2 focus:ring-${theme === "dark" ? "cyan" : "blue"}-500`}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className={`text-sm font-medium transition-all duration-700 ${
                              theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            required
                            className={`transition-all duration-500 focus:scale-105 ${
                              theme === "dark"
                                ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                            } focus:outline-none focus:ring-2 focus:ring-${theme === "dark" ? "cyan" : "blue"}-500`}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className={`text-sm font-medium transition-all duration-700 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => handleContactChange("subject", e.target.value)}
                          required
                          className={`transition-all duration-500 focus:scale-105 ${
                            theme === "dark"
                              ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                              : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                          } focus:outline-none focus:ring-2 focus:ring-${theme === "dark" ? "cyan" : "blue"}-500`}
                          placeholder="What's this about?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className={`text-sm font-medium transition-all duration-700 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => handleContactChange("message", e.target.value)}
                          required
                          rows={5}
                          className={`transition-all duration-500 focus:scale-105 resize-none ${
                            theme === "dark"
                              ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                              : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                          } focus:outline-none focus:ring-2 focus:ring-${theme === "dark" ? "cyan" : "blue"}-500`}
                          placeholder="Tell me about your project or opportunity..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                          theme === "dark" ? "bg-cyan-600 hover:bg-cyan-700" : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold rounded-lg`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 py-8 border-t transition-all duration-700 ${
          theme === "dark" ? "bg-slate-900/80 border-slate-700/50" : "bg-white/80 border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p
              className={`transition-all duration-700 animate-fade-in ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © 2024 Sayali Zambre. All rights reserved. Made with ❤️ and lots of ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
