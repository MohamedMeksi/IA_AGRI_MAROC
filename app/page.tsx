"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronRight,
  Droplets,
  Bug,
  BarChart3,
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Shield,
  Leaf,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Détecter le défilement pour changer le style du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold transition-all ${
                isScrolled ? "bg-green-600" : "bg-green-600/90 backdrop-blur-sm"
              }`}
            >
              IA
            </div>
            <span className={`font-bold text-xl transition-colors ${isScrolled ? "text-green-700" : "text-black"}`}>
              IA-AGRI MAROC
            </span>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition-colors ${isScrolled ? "text-green-700" : "text-black"}`}>
              Accueil
            </Link>
            <Link
              href="#solutions"
              className={`font-medium transition-colors ${
                isScrolled ? "text-green-700 hover:text-green-800" : "text-black/90 hover:text-black"
              }`}
            >
              Solutions
            </Link>
            <Link
              href="#"
              className={`font-medium transition-colors ${
                isScrolled ? "text-green-700 hover:text-green-800" : "text-black/90 hover:text-black"
              }`}
            >
              Produits
            </Link>
            <Link
              href="#"
              className={`font-medium transition-colors ${
                isScrolled ? "text-green-700 hover:text-green-800" : "text-black/90 hover:text-black"
              }`}
            >
              Services
            </Link>
            <Link
              href="#"
              className={`font-medium transition-colors ${
                isScrolled ? "text-green-700 hover:text-green-800" : "text-black/90 hover:text-black"
              }`}
            >
              Blog
            </Link>
            <Link
              href="#"
              className={`font-medium transition-colors ${
                isScrolled ? "text-green-700 hover:text-green-800" : "text-black/90 hover:text-black"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div
              className={`relative rounded-full overflow-hidden transition-all ${
                isScrolled ? "bg-gray-100" : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <Input
                type="text"
                placeholder="Rechercher..."
                className={`pl-9 border-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  isScrolled ? "bg-gray-100 text-gray-800" : "bg-transparent text-black placeholder:text-black/70"
                }`}
              />
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isScrolled ? "text-gray-500" : "text-black/70"
                }`}
              />
            </div>
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              className={!isScrolled ? "bg-white/20 backdrop-blur-sm text-black hover:bg-white/30 border-0" : ""}
            >
              Connexion
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-md" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={`h-6 w-6 ${isScrolled ? "text-green-700" : "text-white"}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-green-800 z-50 lg:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold">
                  IA
                </div>
                <span className="font-bold text-xl text-white">IA-AGRI MAROC</span>
              </div>
              <button className="p-2 rounded-md text-white" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="block py-2 px-4 text-white font-medium text-lg border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  href="#solutions"
                  className="block py-2 px-4 text-white font-medium text-lg border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solutions
                </Link>
                <Link
                  href="#"
                  className="block py-2 px-4 text-white font-medium text-lg border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link
                  href="#"
                  className="block py-2 px-4 text-white font-medium text-lg border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="#"
                  className="block py-2 px-4 text-white font-medium text-lg border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="block py-2 px-4 text-white font-medium text-lg border-b border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
              <div className="mt-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-green-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                </div>
                <Button className="w-full mt-4 bg-white text-green-700 hover:bg-white/90">Connexion</Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-16">
          <div className="absolute inset-0 z-0">
            <img
              src="https://maroc-diplomatique.net/wp-content/uploads/2024/02/agricole-e1707469521723.jpg"
              alt="Champ agricole avec technologies modernes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-black/50"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Révolutionnez votre agriculture avec l&apos;Intelligence Artificielle
                </h1>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  IA-AGRI MAROC fusionne les technologies de pointe avec le secteur agricole marocain pour optimiser vos
                  rendements et promouvoir des pratiques durables.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg h-14 px-8">
                    Découvrir nos solutions
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white bg-green-800 border-white hover:bg-white/10 text-lg h-14 px-8"
                  >
                    Demander une démo
                  </Button>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Solutions fiables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Écologique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Rendements +30%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white/90">Support 24/7</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden md:block"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-green-500/20 rounded-xl blur-xl"></div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-2xl relative">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src="https://www.euractiv.fr/wp-content/uploads/sites/3/2020/02/shutterstock_700890880.jpg"
                        alt="Démonstration IA-AGRI"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Analyse en temps réel</h3>
                    <p className="text-white/80 mb-4">
                      Visualisez les données de votre exploitation et recevez des recommandations personnalisées.
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Voir la démonstration</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
              <a href="#solutions" className="flex flex-col items-center text-white">
                <span className="text-sm mb-2">Découvrir</span>
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-gradient-to-b from-white to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-4 text-green-800">Nos solutions innovantes</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez comment nos technologies d&apos;intelligence artificielle peuvent transformer votre
                  exploitation agricole et augmenter votre productivité.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Solution 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-48 bg-blue-500 relative overflow-hidden">
                  <img
                    src="https://wcmassets.cbc.be/content/dam/asset-management/belgium/nl/global-stories/responsible-investing/AIenduurzaam_farming_TI750x500.jpg/_jcr_content/renditions/cq5dam.web.680.9999.jpeg.cdn.res/last-modified/1681983347063/cq5dam.web.680.9999.jpeg"
                    alt="Gestion de l'eau"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">IA pour la gestion de l&apos;eau</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Optimisation de l&apos;irrigation grâce à des algorithmes d&apos;IA qui analysent les conditions
                    climatiques et l&apos;humidité du sol en temps réel. Réduisez votre consommation d&apos;eau
                    jusqu&apos;à 30%.
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href="#"
                      className="text-green-600 font-medium flex items-center group-hover:text-green-700 transition-colors"
                    >
                      En savoir plus{" "}
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Économie d&apos;eau
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Solution 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-48 bg-red-500 relative overflow-hidden">
                  <img
                    src="https://images.theconversation.com/files/359385/original/file-20200922-22-8458rp.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip"
                    alt="Détection des maladies"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">Détection des maladies des plantes</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Utilisation d&apos;images satellites et de l&apos;IA pour identifier rapidement les maladies et
                    nuisibles. Détectez les problèmes avant qu&apos;ils ne se propagent et sauvez vos récoltes.
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href="#"
                      className="text-green-600 font-medium flex items-center group-hover:text-green-700 transition-colors"
                    >
                      En savoir plus{" "}
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Protection des cultures
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Solution 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-48 bg-green-500 relative overflow-hidden">
                  <img
                    src="https://dailygeekshow.com/wp-content/uploads/2020/04/une-agriculture-haut-rendement.jpeg"
                    alt="Analyse prédictive"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">Analyse prédictive des rendements</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Prédiction des rendements agricoles basés sur des modèles de machine learning. Planifiez votre
                    production et optimisez votre chaîne d&apos;approvisionnement avec précision.
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      href="#"
                      className="text-green-600 font-medium flex items-center group-hover:text-green-700 transition-colors"
                    >
                      En savoir plus{" "}
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Optimisation
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Voir toutes nos solutions
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-green-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Ce que disent nos clients</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Découvrez les témoignages de nos clients qui ont transformé leur exploitation agricole grâce à nos
                solutions d&apos;IA.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-700 rounded-full mr-4 overflow-hidden">
                    <img
                      src="https://img.freepik.com/photos-premium/portrait-agriculteur-barbu-moderne-bras-croises-regardant-camera-se-tient-dans-domaine-agricole-travailleur-masculin-gai-dans-agriculture-agricole-agricole_184353-1352.jpg?semt=ais_hybrid&w=740"
                      alt="Mohammed Alami"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Mohammed Alami</h4>
                    <p className="text-white/70">Agriculteur, Région de Fès</p>
                  </div>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  "Grâce aux solutions d&apos;IA-AGRI MAROC, j&apos;ai pu réduire ma consommation d&apos;eau de 30% tout
                  en augmentant mes rendements. Leur système de détection précoce des maladies m&apos;a également permis
                  d&apos;intervenir rapidement et de sauver ma récolte. Un investissement qui a changé mon
                  exploitation."
                </p>
                <div className="mt-6 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-700 rounded-full mr-4 overflow-hidden">
                    <img
                      src="https://img.freepik.com/photos-gratuite/mode-vie-personne-respectueuse-environnement_23-2149125176.jpg?semt=ais_hybrid&w=740"
                      alt="Fatima Benali"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Fatima Benali</h4>
                    <p className="text-white/70">Directrice, Coopérative Agricole de Marrakech</p>
                  </div>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  "L&apos;analyse prédictive des rendements nous a permis de mieux planifier notre production et
                  d&apos;optimiser notre chaîne d&apos;approvisionnement. Un investissement qui a été rentabilisé dès la
                  première année. La précision des prévisions est remarquable et nous permet de prendre des décisions
                  éclairées."
                </p>
                <div className="mt-6 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Voir tous les témoignages
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-green-800">Pourquoi choisir IA-AGRI MAROC ?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous combinons expertise technologique et connaissance approfondie du secteur agricole marocain pour
                vous offrir des solutions sur mesure.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-700">Engagement pour des pratiques durables</h3>
                <p className="text-gray-600 text-lg">
                  Nos solutions sont conçues pour promouvoir une agriculture respectueuse de l&apos;environnement tout
                  en maximisant vos rendements et votre rentabilité.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-700">Expertise en IA et agriculture</h3>
                <p className="text-gray-600 text-lg">
                  Notre équipe combine une expertise en intelligence artificielle avec une connaissance approfondie du
                  secteur agricole marocain et de ses défis spécifiques.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <path d="M3 12h.01M12 3v.01M21 12h.01M12 21v.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-700">Réduction des coûts</h3>
                <p className="text-gray-600 text-lg">
                  Nos solutions permettent de réduire les coûts d&apos;exploitation et d&apos;augmenter la rentabilité
                  de votre exploitation agricole grâce à une optimisation intelligente des ressources.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-green-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre agriculture ?</h2>
                <p className="text-xl mb-8 text-white/90">
                  Rejoignez les centaines d&apos;agriculteurs marocains qui ont déjà adopté nos solutions d&apos;IA pour
                  optimiser leur exploitation et augmenter leurs rendements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-white/90 text-lg h-14 px-8">
                    Demander une démo gratuite
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg h-14 px-8"
                  >
                    Contacter un conseiller
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                  IA
                </div>
                <span className="font-bold text-2xl">IA-AGRI MAROC</span>
              </div>
              <p className="text-gray-400 mb-6">
                L&apos;Intelligence Artificielle au service de l&apos;agriculture marocaine. Nous révolutionnons le
                secteur agricole avec des solutions innovantes et durables.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-6">Liens rapides</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="#solutions" className="text-gray-400 hover:text-white transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Produits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-6">Ressources</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Études de cas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-400">+212 5XX XX XX XX</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-400">contact@ia-agri-maroc.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500 mt-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-400">Casablanca, Maroc</span>
                </li>
              </ul>

              <div className="mt-8">
                <h5 className="font-medium mb-3 text-white">Inscrivez-vous à notre newsletter</h5>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    className="bg-white/10 border-white/20 text-white rounded-r-none focus-visible:ring-green-500"
                  />
                  <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">S&apos;inscrire</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 IA-AGRI MAROC. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Conditions d&apos;utilisation
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1.5,
        }}
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          href="/chatbot"
          className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all flex items-center gap-3 pr-5 group"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white relative">
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
              className="lucide lucide-message-circle"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </div>
          <span className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">
            Discuter avec notre IA
          </span>
        </Link>
      </motion.div>
    </div>
  )
}
