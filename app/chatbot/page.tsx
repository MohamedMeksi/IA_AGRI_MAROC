"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Send,
  ArrowLeft,
  User,
  Bot,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Maximize2,
  Minimize2,
  Leaf,
  Droplets,
  BarChart3,
  HelpCircle,
  Clock,
  ImageIcon,
  Paperclip,
  Mic,
  Settings,
  Info,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference"
import { AzureKeyCredential } from "@azure/core-auth"
require('dotenv').config();
// Configuration de l'IA
const token = process.env.NEXT_PUBLIC_AI_TOKEN || ""
const endpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT || ""
const model = process.env.NEXT_PUBLIC_AI_MODEL || "openai/gpt-4.1"

// Types pour les messages
type MessageType = "user" | "bot"

interface Message {
  id: number
  type: MessageType
  text: string
  timestamp: string
}

// Suggestions prédéfinies
const suggestions = [
  "J'ai besoin de conseils sur la gestion de l'eau en agriculture",
  "Comment détecter les maladies des plantes avec l'IA ?",
  "Quelles solutions pour optimiser les rendements agricoles ?",
  "Comment puis-je réduire ma consommation d'eau ?",
]

// Fonction pour obtenir l'heure actuelle au format HH:MM
const getCurrentTime = (): string => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Bonjour ! Je suis votre assistant IA spécialisé en agriculture. Comment puis-je vous aider aujourd'hui ?",
      timestamp: getCurrentTime(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)

  // Fonction pour faire défiler automatiquement vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    inputRef.current?.focus()
  }, [messages])

  // Fonction pour envoyer un message
  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    // Ajouter le message de l'utilisateur
    const newUserMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: text,
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setShowSuggestions(false)
    setIsTyping(true)

    try {
      const client = ModelClient(endpoint, new AzureKeyCredential(token))

      // Construire le contexte avec les messages précédents
      const contextMessages = [
        {
          "role": "system",
          "content": "Vous êtes un expert en agriculture. Vous êtes une IA spécialisée qui ne comprend que l'agriculture. Vous ne pouvez pas répondre à des questions hors sujet. Vous devez répondre en français, de manière concise et précise. Vous ne devez répondre qu'aux questions en rapport avec l'agriculture."
        },
        
        
        ...messages.slice(-5).map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.text,
        })),
        { role: "user", content: text },
      ]

      const response = await client.path("/chat/completions").post({
        body: {
          messages: contextMessages,
          temperature: 0.7,
          top_p: 0.9,
          model: model,
        },
      })

      if (isUnexpected(response)) {
        throw response.body.error
      }

      const botResponse = response.body.choices[0].message.content

      const newBotMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse ?? "",
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, newBotMessage])
    } catch (error) {
      console.error("Erreur avec l'API IA:", error)

      const errorMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        text: "Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard ou contacter notre support technique au 0522-123456.",
        timestamp: getCurrentTime(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(inputValue)
  }

  // Fonction pour copier la conversation
  const copyConversation = () => {
    const text = messages
      .map(
        (msg) =>
          `[${msg.timestamp}] ${msg.type === "user" ? "Vous" : "Assistant"}: ${
            msg.text
          }`
      )
      .join("\n\n")
    navigator.clipboard.writeText(text)
    alert("Conversation copiée dans le presse-papier")
  }

  // Fonction pour télécharger la conversation
  const downloadConversation = () => {
    const text = messages
      .map(
        (msg) =>
          `[${msg.timestamp}] ${msg.type === "user" ? "Vous" : "Assistant"}: ${
            msg.text
          }`
      )
      .join("\n\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversation-ia-agri-${new Date()
      .toISOString()
      .slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-green-900 via-green-800 to-green-700 ${
        isFullScreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            {!isFullScreen && (
              <Link
                href="/"
                className="flex items-center gap-1 mr-4 text-white hover:text-green-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium text-sm">Retour</span>
              </Link>
            )}

            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
                IA
              </div>
              <span className="font-bold text-sm text-white">
                IA-AGRI MAROC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:text-green-300 hover:bg-white/10"
              onClick={copyConversation}
              title="Copier la conversation"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:text-green-300 hover:bg-white/10"
              onClick={downloadConversation}
              title="Télécharger la conversation"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:text-green-300 hover:bg-white/10"
              onClick={() => setShowSidebar(!showSidebar)}
              title={
                showSidebar
                  ? "Masquer le panneau d'information"
                  : "Afficher le panneau d'information"
              }
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:text-green-300 hover:bg-white/10"
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={
                isFullScreen
                  ? "Quitter le mode plein écran"
                  : "Mode plein écran"
              }
            >
              {isFullScreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-6 h-[calc(100vh-8rem)]">

          {/* Interface de chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col"
          >
            {/* Titre du chatbot */}
            <div className="bg-gradient-to-r from-green-600/80 to-green-500/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">
                    Assistant IA-AGRI
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-xs text-white/90">
                      En ligne | Dernière mise à jour: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/10"
                onClick={() => setShowInfo(!showInfo)}
              >
                {showInfo ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Info panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-green-900/30 border-b border-white/10 overflow-hidden"
                >
                  <div className="p-4 text-sm text-white/90">
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Zone de messages */}
            <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-green-900/20 to-green-800/20">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-green-600/90 to-green-500/90 backdrop-blur-sm text-white"
                            : "bg-white/20 backdrop-blur-sm border border-white/10 text-white"
                        }`}
                      >
                        {message.type === "bot" && (
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-white mr-2">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold">
                                  Assistant IA-AGRI
                                </span>
                                <div className="flex items-center gap-1 text-xs text-white/70">
                                  <Clock className="h-3 w-3" />
                                  <span>{message.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {message.type === "user" && (
                          <div className="flex items-center justify-end mb-2">
                            <div className="flex-1 text-right">
                              <div className="flex justify-between items-center flex-row-reverse">
                                <span className="font-semibold">Vous</span>
                                <div className="flex items-center gap-1 text-xs text-white/70">
                                  <Clock className="h-3 w-3" />
                                  <span>{message.timestamp}</span>
                                </div>
                              </div>
                            </div>
                            <div className="w-8 h-8 bg-green-700/50 rounded-full flex items-center justify-center text-white ml-2">
                              <User className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <p className="leading-relaxed">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Indicateur de frappe */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/20 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-lg max-w-[85%]">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-white mr-2">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-white">
                                Assistant IA-AGRI
                              </span>
                              <div className="flex items-center gap-1 text-xs text-white/70">
                                <Clock className="h-3 w-3" />
                                <span>{getCurrentTime()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1,
                              delay: 0,
                            }}
                            className="w-2 h-2 bg-green-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1,
                              delay: 0.2,
                            }}
                            className="w-2 h-2 bg-green-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1,
                              delay: 0.4,
                            }}
                            className="w-2 h-2 bg-green-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 border-t border-white/10 bg-green-900/30"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium text-white/80">
                      Suggestions :
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs py-1 h-auto border-white/20 text-white hover:bg-white/10 hover:text-green-300"
                          onClick={() => sendMessage(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Zone de saisie */}
            <div className="border-t border-white/10 p-4 bg-green-900/30">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-grow relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Posez votre question sur l'agriculture..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow rounded-full border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus-visible:ring-green-500 pl-4 pr-24"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      title="Joindre une image"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      title="Joindre un fichier"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      title="Message vocal"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className="bg-green-600 hover:bg-green-700 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
              <div className="flex justify-between items-center mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setShowSuggestions(true)}
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Suggestions
                </Button>
                <p className="text-xs text-white/70">
                  Pour des questions complexes, un conseiller humain peut prendre
                  le relai.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Paramètres
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}