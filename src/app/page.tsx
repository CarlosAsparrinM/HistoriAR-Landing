"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "es" | "en";

function browserLanguage(): Language {
  return navigator.languages.some((language) => language.toLowerCase().startsWith("en")) ? "en" : "es";
}

const ENGLISH_TEXT: Record<string, string> = {
  "Descargar aplicación": "Download app",
  "🤖 Descargar aplicación": "🤖 Download app",
  "DISPONIBLE EN": "GET IT ON",
  "Google Play": "Google Play",
  "PROBAR AHORA": "TRY NOW",
  "Probar Ahora": "Try Now",
  "Probar en la Web": "Try on Web",
  "Descargar aplicación en Google Play": "Download app on Google Play",
  "Disponible en Google Play · v": "Available on Google Play · v",
  "Inicio": "Home",
  "Funcionalidades": "Features",
  "Capturas": "Screenshots",
  "Instalación": "Installation",
  "Privacidad": "Privacy",
  "Términos": "Terms",
  "Cerrar menú": "Close menu",
  "Abrir menú": "Open menu",
  "Menú de navegación": "Navigation menu",
  "Realidad Aumentada": "Augmented Reality",
  "Explora tu Ciudad": "Explore Your City",
  "Tours Guiados": "Guided Tours",
  "Quizzes Educativos": "Educational Quizzes",
  "Apunta tu cámara y coloca modelos 3D hiperrealistas de monumentos en tu entorno real. Rota, escala e interactúa con la historia.": "Point your camera and place hyper-realistic 3D monument models in your real environment. Rotate, scale, and interact with history.",
  "Descubre restos arqueológicos y monumentos históricos cercanos mediante un mapa interactivo con geolocalización precisa en tiempo real.": "Discover nearby archaeological sites and historical monuments through an interactive map with precise real-time geolocation.",
  "Sigue rutas temáticas, cronológicas o arquitectónicas únicas, diseñadas por museos y expertos culturales peruanos.": "Follow unique thematic, chronological, or architectural routes designed by Peruvian museums and cultural experts.",
  "Pon a prueba lo que aprendiste con preguntas interactivas y desafiantes cuestionarios sobre cada monumento.": "Put your learning to the test with interactive questions and challenging quizzes about every monument.",
  "Monumentos cobran vida en tu entorno real con ARCore": "Monuments come to life in your real environment with ARCore",
  "Mapa interactivo con monumentos cercanos en tiempo real": "Interactive map with nearby monuments in real time",
  "Recorridos temáticos activos y paradas disponibles": "Active themed tours and available stops",
  "Estadísticas de visitas, quizzes e insignias ganadas": "Visit, quiz, and badge statistics",
  "Configuración": "Settings",
  "Personaliza notificaciones, precisión y preferencias": "Customize notifications, accuracy, and preferences",
  "Inicio de Sesión": "Sign In",
  "Acceso rápido y seguro a tu cuenta HistoriAR": "Quick and secure access to your HistoriAR account",
  "Crear Cuenta": "Create Account",
  "Únete gratis a la comunidad HistoriAR": "Join the HistoriAR community for free",
  "Descarga el Archivo": "Download the File",
  "Haz clic en el botón de descarga de esta página para obtener el archivo .apk directamente desde nuestro servidor oficial.": "Click this page's download button to get the .apk file directly from our official server.",
  "Permite la Instalación": "Allow Installation",
  'Ve a Ajustes → Seguridad en tu Android y habilita "Instalar apps de fuentes desconocidas" para tu navegador.': 'Go to Settings → Security on your Android device and enable "Install unknown apps" for your browser.',
  "Instala y Explora": "Install and Explore",
  "Ejecuta el archivo descargado, presiona Instalar y ¡comienza a descubrir el patrimonio cultural peruano con AR!": "Open the downloaded file, tap Install, and start discovering Peru's cultural heritage with AR!",
  "App Android · v": "Android app · v",
  "Explora el patrimonio arqueológico de Lima en": "Explore Lima's archaeological heritage in",
  "Descubre el pasado. Vívelo en el presente.": "Discover the past. Experience it in the present.",
  "Una innovadora aplicación móvil diseñada para transformar tu entorno y": "An innovative mobile application designed to transform your surroundings and",
  "hacer cobrar vida a la historia de las huacas de Lima directamente desde": "bring the history of Lima's huacas to life directly from",
  "tu smartphone, utilizando tecnología AR de última generación, modelos 3D": "your smartphone, using cutting-edge AR technology, 3D models",
  "y dinámicas interactivas.": "and interactive experiences.",
  "APK disponible · v": "Available on Google Play · v",
  "🔒 Recomendado Android 11.0+ (8 GB RAM) · Requiere soporte ARCore": "🔒 Android 11.0+ recommended (8 GB RAM) · ARCore support required",
  "¿Qué es HistoriAR?": "What is HistoriAR?",
  "“Más que una app — es una": "“More than an app — it is a",
  "ventana interactiva": "interactive window",
  "al pasado.”": "to the past.”",
  "HistoriAR transforma la manera en que te conectas con el patrimonio cultural.": "HistoriAR transforms the way you connect with cultural heritage.",
  "A través de la cámara de tu celular, verás monumentos históricos cobrar vida en": "Through your phone's camera, you will see historical monuments come to life as",
  "modelos 3D interactivos, podrás seguir rutas temáticas diseñadas por expertos y": "interactive 3D models, follow themed routes designed by experts, and",
  "poner a prueba tus conocimientos sobre la marcha.": "test your knowledge along the way.",
  "Monumentos": "Monuments",
  "Tours disponibles": "Tours available",
  "Tecnología AR": "AR technology",
  "Todo lo que necesitas para explorar la historia": "Everything you need to explore history",
  "Capturas reales de la app": "Real app screenshots",
  "Descubre HistoriAR por dentro": "Discover HistoriAR from the inside",
  "Pantallas tomadas directamente de la aplicación en funcionamiento": "Screens captured directly from the running application",
  "Desliza para ver más": "Swipe to see more",
  "¿Cómo instalar HistoriAR?": "How do I install HistoriAR?",
  "Al estar en fase de lanzamiento, la app se distribuye mediante un archivo APK seguro.": "As the app is in its launch phase, it is distributed through a secure APK file.",
  "Solo sigue estos 3 pasos:": "Just follow these 3 steps:",
  "Descarga 100% segura": "100% secure download",
  "El archivo APK se sirve directamente desde nuestro servidor. Android mostrará una advertencia": "The APK file is served directly from our server. Android will show a",
  "estándar para apps fuera de Play Store — es normal en apps beta. Puedes verificar el código": "standard warning for apps outside the Play Store — this is normal for beta apps. You can verify the source",
  "fuente en nuestro repositorio de GitHub.": "code in our GitHub repository.",
  "Versión": "Version",
  "Disponibilidad de plataformas": "Platform availability",
  "✅ Disponible": "✅ Available",
  "🔜 Próximamente": "🔜 Coming soon",
  "🟠 Especificaciones Mínimas": "🟠 Minimum specifications",
  "🟢 Recomendado (Fluidez Perfecta)": "🟢 Recommended (Smooth performance)",
  "Procesador:": "Processor:",
  "Requisitos:": "Requirements:",
  "Soporte de Google ARCore (indispensable)": "Google ARCore support (required)",
  "Soporte ARCore obligatorio y Red 5G": "ARCore support required and 5G network",
  "Soporte ARKit": "ARKit support",
  "Soporte ARKit (LiDAR opcional)": "ARKit support (LiDAR optional)",
  "© 2026 HistoriAR — Reviviendo el patrimonio cultural con tecnología.": "© 2026 HistoriAR — Bringing cultural heritage back to life with technology.",
  "Creado con ❤️ en Perú por": "Created with ❤️ in Peru by",
  "y": "and",
  "Eliminar Cuenta": "Delete Account",
  "Una innovadora aplicación móvil diseñada para transformar tu entorno y hacer cobrar vida a la historia de las huacas de Lima directamente desde tu smartphone, utilizando tecnología AR de última generación, modelos 3D y dinámicas interactivas.": "An innovative mobile app designed to transform your surroundings and bring the history of Lima's huacas to life directly from your smartphone, using cutting-edge AR technology, 3D models, and interactive experiences.",
  "HistoriAR transforma la manera en que te conectas con el patrimonio cultural. A través de la cámara de tu celular, verás monumentos históricos cobrar vida en modelos 3D interactivos, podrás seguir rutas temáticas diseñadas por expertos y poner a prueba tus conocimientos sobre la marcha.": "HistoriAR transforms the way you connect with cultural heritage. Through your phone's camera, you will see historical monuments come to life as interactive 3D models, follow themed routes designed by experts, and test your knowledge along the way.",
  "Al estar en fase de lanzamiento, la app se distribuye mediante un archivo APK seguro. Solo sigue estos 3 pasos:": "The app is in its launch phase and is distributed through a secure APK file. Just follow these 3 steps:",
  "El archivo APK se sirve directamente desde nuestro servidor. Android mostrará una advertencia estándar para apps fuera de Play Store — es normal en apps beta. Puedes verificar el código fuente en nuestro repositorio de GitHub.": "The APK file is served directly from our server. Android will show a standard warning for apps outside the Play Store — this is normal for beta apps. You can verify the source code in our GitHub repository.",
  "Versión 1.0.3 · Build 2026.05.29 · Recomendado Android 11.0+ (8 GB RAM) · ARCore requerido": "Version 1.0.3 · Build 2026.05.29 · Android 11.0+ recommended (8 GB RAM) · ARCore required",
  "Especificaciones Mínimas": "Minimum specifications",
  "Recomendado (Fluidez Perfecta)": "Recommended (Smooth performance)",
  "S.O.:": "OS:",
  "Helio G99 / Snapdragon 680 o 695": "Helio G99 / Snapdragon 680 or 695",
  "Android 11.0+ (ej. Moto Edge 60)": "Android 11.0+ (e.g. Moto Edge 60)",
  "Apple A12 Bionic (iPhone XR/XS/SE 2da Gen)": "Apple A12 Bionic (iPhone XR/XS/2nd Gen SE)",
  "Apple A14 Bionic (iPhone 12 en adelante)": "Apple A14 Bionic (iPhone 12 and later)",
  "4 GB a 6 GB": "4 GB to 6 GB",
};

const ORIGINAL_TEXT = new WeakMap<Text, string>();

function translatePage(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const original = ORIGINAL_TEXT.get(node) ?? node.nodeValue ?? "";
    ORIGINAL_TEXT.set(node, original);
    const trimmed = original.trim();
    const translated = language === "en" ? ENGLISH_TEXT[trimmed] : trimmed;
    if (!translated || translated === trimmed) {
      node.nodeValue = language === "es" ? original : original;
      return;
    }
    const leading = original.match(/^\s*/)?.[0] ?? "";
    const trailing = original.match(/\s*$/)?.[0] ?? "";
    node.nodeValue = `${leading}${translated}${trailing}`;
  });
}

// =====================================================================
// 🔗  CONFIGURACIÓN DEL APK
// =====================================================================
//
//  Configurado con el archivo APK alojado de forma segura en GitHub Releases:
//
// =====================================================================
const APK_DOWNLOAD_URL = "https://play.google.com/store/apps/details?id=com.historiar.app";
const WEB_APP_URL      = "https://historiar-web.vercel.app/";
const APK_AVAILABLE    = true;
const APK_VERSION      = "1.0.3";
const APK_BUILD        = "2026.05.29";

// ─────────────────────────────────────────
// Static data
// ─────────────────────────────────────────
const FEATURES = [
  {
    icon: "🎮",
    title: "Realidad Aumentada",
    desc: "Apunta tu cámara y coloca modelos 3D hiperrealistas de monumentos en tu entorno real. Rota, escala e interactúa con la historia.",
  },
  {
    icon: "🗺️",
    title: "Explora tu Ciudad",
    desc: "Descubre restos arqueológicos y monumentos históricos cercanos mediante un mapa interactivo con geolocalización precisa en tiempo real.",
  },
  {
    icon: "📚",
    title: "Tours Guiados",
    desc: "Sigue rutas temáticas, cronológicas o arquitectónicas únicas, diseñadas por museos y expertos culturales peruanos.",
  },
  {
    icon: "🧩",
    title: "Quizzes Educativos",
    desc: "Pon a prueba lo que aprendiste con preguntas interactivas y desafiantes cuestionarios sobre cada monumento.",
  },
];

const SCREENSHOTS = [
  { src: "/interfaces/ar-view.jpeg",  title: "Realidad Aumentada",  desc: "Monumentos cobran vida en tu entorno real con ARCore" },
  { src: "/interfaces/explorer.jpeg", title: "Explora tu Ciudad",   desc: "Mapa interactivo con monumentos cercanos en tiempo real" },
  { src: "/interfaces/mi-tour.jpeg",  title: "Mi Tour",             desc: "Recorridos temáticos activos y paradas disponibles" },
  { src: "/interfaces/profile.jpeg",  title: "Mi Perfil",           desc: "Estadísticas de visitas, quizzes e insignias ganadas" },
  { src: "/interfaces/settings.jpeg", title: "Configuración",       desc: "Personaliza notificaciones, precisión y preferencias" },
  { src: "/interfaces/login.jpeg",    title: "Inicio de Sesión",    desc: "Acceso rápido y seguro a tu cuenta HistoriAR" },
  { src: "/interfaces/register.jpeg", title: "Crear Cuenta",        desc: "Únete gratis a la comunidad HistoriAR" },
];

const INSTALL_STEPS = [
  {
    number: "01",
    icon: "⬇️",
    title: "Descarga el Archivo",
    desc: "Haz clic en el botón de descarga de esta página para obtener el archivo .apk directamente desde nuestro servidor oficial.",
  },
  {
    number: "02",
    icon: "🔓",
    title: "Permite la Instalación",
    desc: 'Ve a Ajustes → Seguridad en tu Android y habilita "Instalar apps de fuentes desconocidas" para tu navegador.',
  },
  {
    number: "03",
    icon: "🚀",
    title: "Instala y Explora",
    desc: "Ejecuta el archivo descargado, presiona Instalar y ¡comienza a descubrir el patrimonio cultural peruano con AR!",
  },
];

const NAV_LINKS = [
  { href: "#inicio",                  label: "Inicio" },
  { href: "#funcionalidades",         label: "Funcionalidades" },
  { href: "#galeria",                 label: "Capturas" },
  { href: "#como-instalar",           label: "Instalación" },
  { href: "/politica-de-privacidad",  label: "Privacidad" },
  { href: "/terminos-y-condiciones",  label: "Términos" },
];

function GooglePlayIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gpBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#0072FF" />
        </linearGradient>
        <linearGradient id="gpRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3A44" />
          <stop offset="100%" stopColor="#D50000" />
        </linearGradient>
        <linearGradient id="gpYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDE00" />
          <stop offset="100%" stopColor="#FF9100" />
        </linearGradient>
        <linearGradient id="gpGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F076" />
          <stop offset="100%" stopColor="#00A843" />
        </linearGradient>
      </defs>
      <path
        d="M3.609 1.814C3.23 2.222 3 2.825 3 3.619v16.762c0 .794.23 1.397.609 1.805l.095.087 9.49-9.49v-.224L3.704 3.091l-.095.095-.001-.001c.001-.46.001-.912 0-1.372z"
        fill="url(#gpBlue)"
      />
      <path
        d="M16.353 15.918l-3.159-3.159v-.224l3.16-3.159.071.04 3.743 2.128c1.069.607 1.069 1.603 0 2.212l-3.744 2.128-.071.034z"
        fill="url(#gpRed)"
      />
      <path
        d="M13.265 12.535L3.609 22.186c.356.377.948.423 1.618.043l11.126-6.319-3.088-3.375z"
        fill="url(#gpYellow)"
      />
      <path
        d="M13.265 12.037l3.088-3.376L5.227 2.342C4.557 1.962 3.965 2.008 3.609 2.385l9.656 9.652z"
        fill="url(#gpGreen)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────
// Shared download button (Google Play badge)
// ─────────────────────────────────────────
function DownloadBtn({
  id,
  large = false,
  compact = false,
}: {
  id: string;
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <a
      id={id}
      href={APK_AVAILABLE ? APK_DOWNLOAD_URL : "#como-instalar"}
      className={`btn-google-play ${large ? "btn-google-play-lg" : ""} ${compact ? "btn-google-play-compact" : ""} ${APK_AVAILABLE ? "" : "btn-disabled"}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Descargar aplicación en Google Play"
    >
      <GooglePlayIcon size={large ? 30 : compact ? 18 : 24} />
      <div className="btn-google-play-text">
        <span className="btn-google-play-subtitle">DISPONIBLE EN</span>
        <span className="btn-google-play-title">Google Play</span>
      </div>
      {!APK_AVAILABLE && (
        <span className="btn-google-play-soon">
          Próximamente
        </span>
      )}
    </a>
  );
}

function CursorClickIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, transform: "rotate(-8deg)" }}
      aria-hidden="true"
    >
      {/* Click spark lines */}
      <path d="M7 4L4 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M3 8L1 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M5 12L2 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      {/* 3D Arrow Cursor */}
      <path
        d="M8 5L21 14.5L14.5 16L12 23L8 5Z"
        fill="#FFFFFF"
        stroke="#0369A1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 7.5L18.5 14L14 15.2L12 20.5L9.5 7.5Z"
        fill="#F0F9FF"
      />
    </svg>
  );
}

// ─────────────────────────────────────────
// 3D Web App button (PROBAR AHORA)
// ─────────────────────────────────────────
function WebAppBtn({
  id,
  large = false,
  compact = false,
}: {
  id: string;
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <a
      id={id}
      href={WEB_APP_URL}
      className={`btn-web-app ${large ? "btn-web-app-lg" : ""} ${compact ? "btn-web-app-compact" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Probar HistoriAR en la Web"
    >
      <div className="btn-web-app-inner">
        <span className="btn-web-app-text">PROBAR AHORA</span>
        <CursorClickIcon size={large ? 24 : compact ? 14 : 18} />
      </div>
    </a>
  );
}

// ─────────────────────────────────────────
// Phone mockup wrapper
// ─────────────────────────────────────────
function PhoneMockup({
  src,
  alt,
  sizeClass,
  priority = false,
}: {
  src: string;
  alt: string;
  sizeClass: string;
  priority?: boolean;
}) {
  return (
    <div className={`phone-shell ${sizeClass}`}>
      <div className="phone-body">
        <div className="phone-notch" />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 185px, (max-width: 768px) 220px, 260px"
          priority={priority}
          loading={priority ? "eager" : undefined}
        />
        <div className="phone-home-bar" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────
function LanguageToggle({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div aria-label="Language selector" style={{ display: "inline-flex", padding: 3, gap: 2, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, background: "rgba(15,23,42,0.58)" }}>
    {(["es", "en"] as const).map((option) => <button key={option} type="button" aria-pressed={language === option} onClick={() => onChange(option)} style={{ border: 0, borderRadius: 999, padding: "5px 8px", background: language === option ? "#F97316" : "transparent", color: language === option ? "#fff" : "#CBD5E1", cursor: "pointer", fontSize: "0.7rem", fontWeight: 800, lineHeight: 1 }}>{option.toUpperCase()}</button>)}
  </div>;
}

function Navbar({ scrolled, language, onLanguageChange }: { scrolled: boolean; language: Language; onLanguageChange: (language: Language) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`navbar-base ${scrolled ? "navbar-scrolled" : ""}`}>
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1200, padding: "0 20px" }}
        >
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
            <Image
              src="/historiar-logo.png"
              alt="HistoriAR logo"
              width={36}
              height={36}
              style={{ borderRadius: 9, width: 36, height: 36 }}
            />
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
              Histori<span style={{ color: "#F97316" }}>AR</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="desktop-nav flex items-center" style={{ gap: 32 }}>
            {NAV_LINKS.map((l) => {
              const isLocalRoute = l.href.startsWith("/");
              return isLocalRoute ? (
                <Link key={l.href} href={l.href} className="nav-link">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="nav-link">
                  {l.label}
                </a>
              );
            })}
          </div>

          <div className="desktop-nav"><LanguageToggle language={language} onChange={onLanguageChange} /></div>

          {/* Desktop CTA */}
          <div className="desktop-cta flex items-center" style={{ gap: 8 }}>
            <WebAppBtn id="navbar-web-app-btn" compact />
            <DownloadBtn id="navbar-download-btn" compact />
          </div>

          {/* Hamburger */}
          <button
            id="hamburger-menu-btn"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className={`hamburger-btn${open ? " open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="mobile-nav" id="mobile-nav-overlay" role="dialog" aria-label="Menú de navegación">
          <LanguageToggle language={language} onChange={onLanguageChange} />
          {NAV_LINKS.map((l) => {
            const isLocalRoute = l.href.startsWith("/");
            return isLocalRoute ? (
              <Link key={l.href} href={l.href} className="mobile-nav-link" onClick={close}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="mobile-nav-link" onClick={close}>
                {l.label}
              </a>
            );
          })}
          <div style={{ width: "100%", maxWidth: 320, padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
            <DownloadBtn id="mobile-download-btn" />
            <WebAppBtn id="mobile-web-app-btn" />
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────
// Hero
// ─────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero-bg"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 96, paddingBottom: 72 }}
    >
      <div
        className="hero-grid mx-auto"
        style={{ maxWidth: 1200, padding: "0 20px", width: "100%" }}
      >
        {/* Left: text */}
        <div
          className="hero-text-left flex flex-col anim-slide-left"
          style={{ gap: 24 }}
        >
          {/* Beta pill */}
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.3)",
                fontSize: "0.74rem",
                fontWeight: 700,
                color: "#FB923C",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#F97316",
                  display: "inline-block",
                  flexShrink: 0,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              App Android · v{APK_VERSION} · Beta
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#F8FAFC",
              margin: 0,
            }}
          >
            Explora el patrimonio arqueológico de Lima en{" "}
            <span className="gradient-text">Realidad Aumentada</span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              fontWeight: 600,
              color: "#F97316",
              margin: 0,
            }}
          >
            Descubre el pasado. Vívelo en el presente.
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(0.88rem, 1.8vw, 1rem)",
              color: "#94A3B8",
              lineHeight: 1.78,
              maxWidth: 480,
              margin: 0,
            }}
          >
            Una innovadora aplicación móvil diseñada para transformar tu entorno y
            hacer cobrar vida a la historia de las huacas de Lima directamente desde
            tu smartphone, utilizando tecnología AR de última generación, modelos 3D
            y dinámicas interactivas.
          </p>

          {/* CTA block */}
          <div
            className="hero-cta-col flex flex-col"
            style={{ gap: 14 }}
          >
            {/* APK status pill */}
            {APK_AVAILABLE ? (
              <div>
                <span className="apk-status-available">
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", flexShrink: 0, animation: "pulse-dot 2s ease-in-out infinite" }} />
                  APK disponible · v{APK_VERSION} · Build {APK_BUILD}
                </span>
              </div>
            ) : (
              <div>
                <span className="apk-status-soon">⏳ APK en preparación — el botón se activa en cuanto esté listo</span>
              </div>
            )}

            <div className="flex flex-wrap items-center" style={{ gap: 12 }}>
              <DownloadBtn id="hero-download-btn" large />
              <WebAppBtn id="hero-web-app-btn" large />
            </div>

            <p style={{ fontSize: "0.76rem", color: "#4B5563", display: "flex", alignItems: "center", gap: 6, margin: 0, flexWrap: "wrap" }}>
              🔒 Recomendado Android 11.0+ (8 GB RAM) · Requiere soporte ARCore
            </p>
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="flex justify-center items-center hero-phone-col anim-slide-right">
          <div style={{ position: "relative" }}>
            {/* Glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 280, height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(249,115,22,0.28) 0%, transparent 70%)",
                filter: "blur(24px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div className="anim-float" style={{ position: "relative", zIndex: 1 }}>
              <PhoneMockup
                src="/interfaces/ar-view.jpeg"
                alt="HistoriAR — Vista de Realidad Aumentada mostrando una huaca peruana con modelo 3D superpuesto"
                sizeClass="phone-hero"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Value Proposition
// ─────────────────────────────────────────
function ValueSection() {
  return (
    <section
      className="section-pad"
      style={{ padding: "80px 20px", background: "rgba(255,255,255,0.016)", position: "relative", overflow: "hidden" }}
    >
      <div className="divider-orange" style={{ position: "absolute", top: 0, left: "8%", right: "8%" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.76rem", fontWeight: 700, color: "#F97316", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>
          ¿Qué es HistoriAR?
        </p>

        <blockquote
          style={{
            fontSize: "clamp(1.3rem, 3.5vw, 2.3rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: "#F8FAFC",
            fontStyle: "italic",
            margin: "0 0 22px",
          }}
        >
          “Más que una app — es una{" "}
          <span className="gradient-text">ventana interactiva</span>{" "}al pasado.”
        </blockquote>

        <p
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
            color: "#94A3B8",
            lineHeight: 1.8,
            maxWidth: 660,
            margin: "0 auto 44px",
          }}
        >
          HistoriAR transforma la manera en que te conectas con el patrimonio cultural.
          A través de la cámara de tu celular, verás monumentos históricos cobrar vida en
          modelos 3D interactivos, podrás seguir rutas temáticas diseñadas por expertos y
          poner a prueba tus conocimientos sobre la marcha.
        </p>

        <div className="stats-grid" style={{ maxWidth: 580, margin: "0 auto" }}>
          {[
            { value: "10+",    label: "Monumentos" },
            { value: "5+",     label: "Tours disponibles" },
            { value: "ARCore", label: "Tecnología AR" },
          ].map((s) => (
            <div key={s.label} className="glass-card" style={{ padding: "24px 12px" }}>
              <p style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, color: "#F97316", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
                {s.value}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Features
// ─────────────────────────────────────────
function FeaturesSection() {
  return (
    <section id="funcionalidades" className="section-pad" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.76rem", fontWeight: 700, color: "#F97316", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
            Funcionalidades
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F8FAFC",
              margin: 0,
            }}
          >
            Todo lo que necesitas para explorar la historia
          </h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card anim-fade-up delay-${i + 1}`}
              style={{ padding: "32px 24px" }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: 16, lineHeight: 1 }}>{f.icon}</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 10, letterSpacing: "-0.01em" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Screenshots Gallery
// ─────────────────────────────────────────
function ScreenshotsSection() {
  return (
    <section id="galeria" className="section-alt" style={{ padding: "80px 0 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: "0.76rem", fontWeight: 700, color: "#F97316", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
          Capturas reales de la app
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#F8FAFC",
            margin: "0 0 12px",
          }}
        >
          Descubre HistoriAR por dentro
        </h2>
        <p style={{ color: "#94A3B8", fontSize: "clamp(0.85rem, 2vw, 0.98rem)", margin: 0 }}>
          Pantallas tomadas directamente de la aplicación en funcionamiento
        </p>
      </div>

      {/* Scrollable row */}
      <div
        id="gallery-scroll-row"
        className="gallery-scroll"
        style={{
          paddingLeft: "max(20px, calc((100vw - 1100px) / 2 + 20px))",
          paddingRight: 40,
        }}
      >
        {SCREENSHOTS.map((s, i) => (
          <div
            key={s.src}
            className={`flex flex-col items-center anim-fade-up delay-${Math.min(i + 1, 7)}`}
            style={{ gap: 14 }}
          >
            <PhoneMockup src={s.src} alt={`HistoriAR — ${s.title}`} sizeClass="phone-gallery" />
            <div style={{ textAlign: "center", maxWidth: 160 }}>
              <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 4px" }}>
                {s.title}
              </p>
              <p style={{ fontSize: "0.73rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p
        style={{
          textAlign: "center",
          marginTop: 16,
          fontSize: "0.72rem",
          color: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <span>←</span> Desliza para ver más <span>→</span>
      </p>
    </section>
  );
}

// ─────────────────────────────────────────
// Installation steps
// ─────────────────────────────────────────
function InstallSection() {
  return (
    <section id="como-instalar" className="section-pad" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "0.76rem", fontWeight: 700, color: "#F97316", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
            Instalación
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F8FAFC",
              margin: "0 0 14px",
            }}
          >
            ¿Cómo instalar HistoriAR?
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "clamp(0.85rem, 2vw, 0.98rem)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Al estar en fase de lanzamiento, la app se distribuye mediante un archivo APK seguro.
            Solo sigue estos 3 pasos:
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {INSTALL_STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`glass-card anim-fade-up delay-${i + 1}`}
              style={{ padding: "24px 22px" }}
            >
              <div className="install-step" style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
                <div className="step-circle">{step.number}</div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 8 }}>
                    {step.icon} {step.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security notice */}
        <div
          style={{
            marginTop: 24,
            padding: "18px 20px",
            borderRadius: 14,
            background: "rgba(249,115,22,0.05)",
            border: "1px solid rgba(249,115,22,0.18)",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>ℹ️</span>
          <div>
            <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 5px" }}>
              Descarga 100% segura
            </p>
            <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>
              El archivo APK se sirve directamente desde nuestro servidor. Android mostrará una advertencia
              estándar para apps fuera de Play Store — es normal en apps beta. Puedes verificar el código
              fuente en nuestro repositorio de GitHub.
            </p>
          </div>
        </div>

        {/* Repeat CTA */}
        <div style={{ textAlign: "center", marginTop: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 12 }}>
            <DownloadBtn id="install-download-btn" large />
            <WebAppBtn id="install-web-app-btn" large />
          </div>
          <p style={{ fontSize: "0.75rem", color: "#64748B", margin: 0 }}>
            Versión {APK_VERSION} · Build {APK_BUILD} · Recomendado Android 11.0+ (8 GB RAM) · ARCore requerido
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Platform Compatibility
// ─────────────────────────────────────────
function PlatformSection() {
  return (
    <section className="section-alt section-pad" style={{ padding: "72px 20px" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#F8FAFC",
              margin: 0,
            }}
          >
            Disponibilidad de plataformas
          </h2>
        </div>

        <div className="platform-grid">
          {/* Android */}
          <div
            className="glass-card"
            style={{ padding: "28px 20px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: 28, height: 28, fill: "#3DDC84" }}
                  aria-hidden="true"
                >
                  <path d="M16.63 4.25l1.32-2.28a.5.5 0 0 0-.18-.68.5.5 0 0 0-.68.18L15.75 3.8A8.8 8.8 0 0 0 12 3a8.8 8.8 0 0 0-3.75.8L6.93 1.47a.5.5 0 0 0-.68-.18.5.5 0 0 0-.18.68l1.32 2.28C4.54 6.2 2.5 9.8 2.5 14h19c0-4.2-2.04-8-4.87-9.75zM8.5 9.5a1 1 0 1 1-1-1 1 1 0 0 1 1 1zm8 0a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
                </svg>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
                  Android
                </h3>
              </div>
              <span className="badge-green">✅ Disponible</span>
            </div>

            {/* Mínimo */}
            <div style={{ textAlign: "left", background: "rgba(255,255,255,0.015)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(251,146,60,0.15)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FB923C", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🟠</span> Especificaciones Mínimas
              </p>
              <ul style={{ fontSize: "0.78rem", color: "#94A3B8", margin: 0, paddingLeft: "16px", lineHeight: "1.6" }}>
                <li><strong>S.O.:</strong> Android 10.0+</li>
                <li><strong>Procesador:</strong> Helio G99 / Snapdragon 680 o 695</li>
                <li><strong>RAM:</strong> 6 GB</li>
                <li><strong>AR:</strong> Soporte de Google ARCore (indispensable)</li>
              </ul>
            </div>

            {/* Recomendado */}
            <div style={{ textAlign: "left", background: "rgba(34,197,94,0.02)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(34,197,94,0.2)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4ade80", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🟢</span> Recomendado (Fluidez Perfecta)
              </p>
              <ul style={{ fontSize: "0.78rem", color: "#94A3B8", margin: 0, paddingLeft: "16px", lineHeight: "1.6" }}>
                <li><strong>S.O.:</strong> Android 11.0+ (ej. Moto Edge 60)</li>
                <li><strong>Procesador:</strong> Dimensity 7000 Series / Snapdragon 7 Series</li>
                <li><strong>RAM:</strong> 8 GB</li>
                <li><strong>Requisitos:</strong> Soporte ARCore obligatorio y Red 5G</li>
              </ul>
            </div>
          </div>

          {/* iOS */}
          <div
            className="glass-card"
            style={{ padding: "28px 20px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: 28, height: 28, fill: "#F8FAFC" }}
                  aria-hidden="true"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
                </svg>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
                  iOS / iPhone
                </h3>
              </div>
              <span className="badge-orange">🔜 Próximamente</span>
            </div>

            {/* Mínimo */}
            <div style={{ textAlign: "left", background: "rgba(255,255,255,0.015)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(251,146,60,0.15)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FB923C", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🟠</span> Especificaciones Mínimas
              </p>
              <ul style={{ fontSize: "0.78rem", color: "#94A3B8", margin: 0, paddingLeft: "16px", lineHeight: "1.6" }}>
                <li><strong>S.O.:</strong> iOS 14.0+</li>
                <li><strong>Procesador:</strong> Apple A12 Bionic (iPhone XR/XS/SE 2da Gen)</li>
                <li><strong>RAM:</strong> 3 GB</li>
                <li><strong>AR:</strong> Soporte ARKit</li>
              </ul>
            </div>

            {/* Recomendado */}
            <div style={{ textAlign: "left", background: "rgba(34,197,94,0.02)", padding: "14px", borderRadius: "12px", border: "1px solid rgba(34,197,94,0.2)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4ade80", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span>🟢</span> Recomendado (Fluidez Perfecta)
              </p>
              <ul style={{ fontSize: "0.78rem", color: "#94A3B8", margin: 0, paddingLeft: "16px", lineHeight: "1.6" }}>
                <li><strong>S.O.:</strong> iOS 15.0+</li>
                <li><strong>Procesador:</strong> Apple A14 Bionic (iPhone 12 en adelante)</li>
                <li><strong>RAM:</strong> 4 GB a 6 GB</li>
                <li><strong>AR:</strong> Soporte ARKit (LiDAR opcional)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Footer
// ─────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(249,115,22,0.1)", padding: "36px 20px", background: "#09091566" }}>
      <div className="footer-grid mx-auto" style={{ maxWidth: 1100 }}>
        <p style={{ fontSize: "0.8rem", color: "#374151", margin: 0 }}>
          © 2026 HistoriAR — Reviviendo el patrimonio cultural con tecnología.
        </p>

        <div className="flex items-center justify-center" style={{ gap: 8 }}>
          <Image
            src="/historiar-logo.png"
            alt="HistoriAR"
            width={22}
            height={22}
            style={{ borderRadius: 6, width: 22, height: 22 }}
          />
          <p style={{ fontSize: "0.8rem", color: "#4B5563", margin: 0, textAlign: "center" }}>
            Creado con ❤️ en Perú por{" "}
            <strong style={{ color: "#94A3B8" }}>Carlos Asparrín</strong>{" "}
            y{" "}
            <strong style={{ color: "#94A3B8" }}>Hector Perez</strong>
          </p>
        </div>

        <div className="flex items-center footer-right" style={{ gap: 16, justifyContent: "flex-end" }}>
          <Link
            id="footer-delete-account-link"
            href="/eliminar-cuenta"
            style={{ fontSize: "0.8rem", color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F97316")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
          >
            Eliminar Cuenta
          </Link>
          <a
            id="footer-github-link"
            href="https://github.com/CarlosAsparrinM/HistoriAR"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.8rem", color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F97316")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
// Page root
// ─────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("historiar-language");
    setLanguage(savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : browserLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("historiar-language", language);
    translatePage(language);
  }, [language]);

  return (
    <>
      <Navbar scrolled={scrolled} language={language} onLanguageChange={setLanguage} />
      <main>
        <HeroSection />
        <ValueSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <InstallSection />
        <PlatformSection />
      </main>
      <Footer />
    </>
  );
}
