"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "introduccion", label: "1. Introducción" },
  { id: "responsables", label: "2. Responsables del Tratamiento" },
  { id: "marco-legal", label: "3. Marco Legal Aplicable" },
  { id: "datos-recopilados", label: "4. Datos Recopilados" },
  { id: "permisos", label: "5. Permisos del Dispositivo" },
  { id: "finalidades", label: "6. Finalidades del Tratamiento" },
  { id: "servicios-terceros", label: "7. Servicios de Terceros" },
  { id: "menores", label: "8. Uso por Menores de Edad" },
  { id: "contenido-usuario", label: "9. Contenido del Usuario" },
  { id: "conservacion", label: "10. Conservación y Eliminación" },
  { id: "seguridad", label: "11. Seguridad de la Información" },
  { id: "derechos", label: "12. Derechos del Usuario (ARCO)" },
  { id: "transferencia", label: "13. Compartición de Datos" },
  { id: "transferencias-int", label: "14. Transferencias Internacionales" },
  { id: "cambios", label: "15. Cambios en la Política" },
  { id: "contacto", label: "16. Contacto" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduccion");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div style={{ backgroundColor: "#0D0D1A", minHeight: "100vh", color: "#F8FAFC" }}>
      {/* Navbar */}
      <nav
        className="navbar-base navbar-scrolled"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1200, padding: "0 20px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
            <Image
              src="/logo.png"
              alt="HistoriAR logo"
              width={36}
              height={36}
              style={{ borderRadius: 9, width: 36, height: 36 }}
            />
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
              Histori<span style={{ color: "#F97316" }}>AR</span>
            </span>
          </Link>

          {/* CTA */}
          <div>
            <Link
              href="/"
              className="btn-primary"
              style={{ fontSize: "0.82rem", padding: "10px 22px" }}
            >
              🏠 Volver al Inicio
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto px-5 py-12" style={{ maxWidth: 1200 }}>
        {/* Title Header */}
        <div className="mb-12 text-center anim-fade-up">
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
              marginBottom: 16,
            }}
          >
            DOCUMENTO OFICIAL · v1.1
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            Políticas de <span className="gradient-text">Privacidad</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto" }}>
            En HistoriAR respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
            Conoce cómo recopilamos, tratamos y protegemos tu información.
          </p>
        </div>

        {/* Outer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 320px) 1fr",
            gap: 40,
            alignItems: "start",
          }}
          className="responsive-policy-grid"
        >
          {/* Sidebar Index (Sticky) */}
          <aside
            style={{
              position: "sticky",
              top: 140,
              maxHeight: "calc(100vh - 180px)",
              overflowY: "auto",
              paddingRight: 10,
            }}
            className="policy-sidebar glass-card"
          >
            <div style={{ padding: "24px 20px" }}>
              <h3
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "#F97316",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                Índice de Contenidos
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollTo(section.id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        color: activeSection === section.id ? "#F8FAFC" : "#64748B",
                        fontSize: "0.85rem",
                        fontWeight: activeSection === section.id ? 700 : 500,
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        backgroundColor: activeSection === section.id ? "rgba(249, 115, 22, 0.08)" : "transparent",
                        borderLeft: activeSection === section.id ? "2px solid #F97316" : "2px solid transparent",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== section.id) {
                          e.currentTarget.style.color = "#94A3B8";
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== section.id) {
                          e.currentTarget.style.color = "#64748B";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Pane */}
          <section className="glass-card" style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: 36 }}>
            {/* 1. Introducción */}
            <div id="introduccion" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>01.</span> Introducción
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                La presente Política de Privacidad explica cómo la aplicación móvil <strong>HistoriAR</strong> recopila, utiliza, almacena, protege y, cuando corresponda, comparte los datos personales de sus usuarios.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                HistoriAR es una aplicación móvil educativa desarrollada como proyecto de tesis, orientada a la exploración de monumentos históricos mediante mapas, realidad aumentada, tours, quizzes y contenido cultural interactivo.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                Al utilizar HistoriAR, el usuario declara haber leído y comprendido esta Política de Privacidad. Si no está de acuerdo con sus términos, debe abstenerse de utilizar la aplicación.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 2. Responsables del Tratamiento */}
            <div id="responsables" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>02.</span> Responsables del Tratamiento de Datos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Los responsables del tratamiento de los datos personales recopilados mediante HistoriAR son los creadores del proyecto:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="responsive-2col">
                <div style={{ background: "rgba(255,255,255,0.015)", padding: "16px", borderRadius: 12, border: "1px solid rgba(249,115,22,0.1)" }}>
                  <p style={{ fontWeight: 700, color: "#F8FAFC", margin: "0 0 4px" }}>Carlos Asparrin Martin</p>
                  <p style={{ fontSize: "0.82rem", color: "#F97316", margin: 0 }}>carlos.asparrin@tecsup.edu.pe</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.015)", padding: "16px", borderRadius: 12, border: "1px solid rgba(249,115,22,0.1)" }}>
                  <p style={{ fontWeight: 700, color: "#F8FAFC", margin: "0 0 4px" }}>Hector Perez Vengoa</p>
                  <p style={{ fontSize: "0.82rem", color: "#F97316", margin: 0 }}>hector.perez@tecsup.edu.pe</p>
                </div>
              </div>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.92rem", marginTop: 16 }}>
                Para cualquier consulta relacionada con privacidad, protección de datos personales, eliminación de cuenta o ejercicio de derechos, el usuario puede comunicarse directamente a los correos mencionados arriba.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 3. Marco Legal Applicable */}
            <div id="marco-legal" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>03.</span> Marco Legal Aplicable
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                HistoriAR se rige principalmente por la legislación peruana aplicable en materia de protección de datos personales, incluyendo la <strong>Ley N.° 29733 (Ley de Protección de Datos Personales)</strong>, su reglamento y demás normas complementarias aplicables.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                Asimismo, al proyectarse la publicación de la aplicación en Google Play, HistoriAR busca mantener coherencia con las políticas de privacidad, tratamiento de datos y transparencia exigidas por dicha plataforma para tiendas de aplicaciones oficiales.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 4. Datos Recopilados */}
            <div id="datos-recopilados" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>04.</span> Datos Personales que Recopilamos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 20 }}>
                HistoriAR recopila datos personales y técnicos limitados con fines puramente operativos y de personalización de la experiencia:
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ borderLeft: "3px solid #F97316", paddingLeft: 16 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 6 }}>4.1 Datos de registro y autenticación</h3>
                  <p style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Nombre del usuario, correo electrónico, identificador de cuenta generado por el sistema y token de autenticación. 
                    Si usas <strong>Google Sign-In</strong>, solo obtenemos información básica autorizada (nombre, correo y foto de perfil) y no tenemos acceso a tu contraseña de Google.
                  </p>
                </div>
                
                <div style={{ borderLeft: "3px solid #F97316", paddingLeft: 16 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 6 }}>4.2 Datos de ubicación</h3>
                  <p style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Ubicación precisa o aproximada del dispositivo mientras usas el mapa. Se utiliza exclusivamente para centrar tu posición, calcular monumentos cercanos y estimar rutas.
                    Almacenamos el <strong>distrito inicial de uso</strong> de forma estática únicamente con fines estadísticos globales y personalización local. No rastreamos tu ubicación en segundo plano.
                  </p>
                </div>

                <div style={{ borderLeft: "3px solid #F97316", paddingLeft: 16 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 6 }}>4.3 Datos de uso de la aplicación</h3>
                  <p style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Monumentos visitados dentro de la app, tours iniciados o completados, quizzes realizados, puntajes obtenidos y logros ganados. 
                    Estos datos estructuran tu perfil de gamificación y progreso.
                  </p>
                </div>

                <div style={{ borderLeft: "3px solid #F97316", paddingLeft: 16 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC", marginBottom: 6 }}>4.4 Datos técnicos del dispositivo</h3>
                  <p style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Modelo del dispositivo, sistema operativo, versión de la aplicación móvil e informes de errores. Se recopilan con el fin de optimizar el rendimiento de la Realidad Aumentada (ARCore).
                  </p>
                </div>
              </div>
            </div>

            <div className="divider-orange" />

            {/* 5. Permisos del Dispositivo */}
            <div id="permisos" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>05.</span> Permisos del Dispositivo
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="responsive-3col">
                <div style={{ background: "rgba(255,255,255,0.012)", padding: "20px", borderRadius: 16, border: "1px solid rgba(249,115,22,0.15)", display: "flex", flexDirection: "col", gap: 10 }}>
                  <div style={{ fontSize: "1.8rem", color: "#F97316" }}>📍</div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F8FAFC", margin: 0 }}>Ubicación</h3>
                  <p style={{ fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                    Requerido para posicionarte en el mapa y medir distancias a las huacas históricas cercanas.
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.012)", padding: "20px", borderRadius: 16, border: "1px solid rgba(249,115,22,0.15)", display: "flex", flexDirection: "col", gap: 10 }}>
                  <div style={{ fontSize: "1.8rem", color: "#F97316" }}>📷</div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F8FAFC", margin: 0 }}>Cámara (AR)</h3>
                  <p style={{ fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                    Indispensable para proyectar los modelos 3D en tu entorno. No graba, guarda ni transmite datos visuales.
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.012)", padding: "20px", borderRadius: 16, border: "1px solid rgba(249,115,22,0.15)", display: "flex", flexDirection: "col", gap: 10 }}>
                  <div style={{ fontSize: "1.8rem", color: "#F97316" }}>🌐</div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F8FAFC", margin: 0 }}>Conexión a Internet</h3>
                  <p style={{ fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                    Necesario para sincronizar tu progreso, autenticar tu cuenta y descargar los modelos 3D pesados.
                  </p>
                </div>
              </div>
            </div>

            <div className="divider-orange" />

            {/* 6. Finalidades */}
            <div id="finalidades" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>06.</span> Finalidades del Tratamiento de Datos
              </h2>
              <ul style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.8, paddingLeft: 20 }}>
                <li style={{ marginBottom: 8 }}><strong>Funcionamiento de la app:</strong> Crear tu cuenta, guardar tu perfil, mostrar tu posición e interactuar con la realidad aumentada.</li>
                <li style={{ marginBottom: 8 }}><strong>Personalización:</strong> Ajustar monumentos y tours relevantes basados en tu distrito o historial.</li>
                <li style={{ marginBottom: 8 }}><strong>Seguridad:</strong> Autenticar de manera segura tu sesión, proteger cuentas contra abusos y prevenir accesos maliciosos.</li>
                <li style={{ marginBottom: 8 }}><strong>Mejora del servicio:</strong> Analizar caídas del servidor, depurar incompatibilidades de modelos 3D y optimizar la interfaz.</li>
                <li style={{ marginBottom: 8 }}><strong>Analítica académica:</strong> Integrar resultados globales anonimizados para la tesis y reportes académicos del proyecto. <strong>No vendemos publicidad ni compartimos datos con redes publicitarias.</strong></li>
              </ul>
            </div>

            <div className="divider-orange" />

            {/* 7. Servicios de Terceros */}
            <div id="servicios-terceros" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>07.</span> Servicios de Terceros
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Utilizamos infraestructura tecnológica externa segura para operar correctamente:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "rgba(255,255,255,0.01)", padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 4px" }}>Google Sign-In & Firebase Auth</p>
                  <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: 0 }}>Pasarela técnica para el registro e inicio de sesión seguros (no se usa analíticas de Firebase).</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.01)", padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 4px" }}>Amazon S3 (Simple Storage Service)</p>
                  <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: 0 }}>Servidor seguro donde se alojan las imágenes oficiales y modelos 3D interactivos (.GLB).</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.01)", padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 4px" }}>MongoDB Atlas</p>
                  <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: 0 }}>Servicio en la nube donde se almacena la base de datos de usuarios y progreso cifrado de forma segura.</p>
                </div>
              </div>
            </div>

            <div className="divider-orange" />

            {/* 8. Menores de Edad */}
            <div id="menores" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>08.</span> Uso por Menores de Edad
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                HistoriAR no está diseñada específicamente para menores de edad de forma autónoma. No obstante, su contenido es plenamente apto, cultural y educativo. Recomendamos la supervisión de un adulto, tutor o docente. Si detectas que un menor ha registrado una cuenta sin autorización, puedes contactarnos para eliminarla.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 9. Contenido del Usuario */}
            <div id="contenido-usuario" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>09.</span> Contenido del Usuario
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                HistoriAR es una plataforma de visualización educativa. Los usuarios no pueden publicar contenido público propio (como textos, fotos de monumentos o archivos 3D). Tu progreso técnico, historial de visitas y cuestionarios respondidos se guardan de forma estrictamente privada y personal.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 10. Conservación y Eliminación */}
            <div id="conservacion" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>10.</span> Conservación y Eliminación de Datos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Conservamos tus datos mientras tu cuenta esté activa. Si decides dar de baja tu cuenta, puedes hacerlo en cualquier momento.
              </p>
              
              {/* Deletion Warning Box */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: 14,
                  background: "rgba(239, 68, 68, 0.04)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: -2 }}>⚠️</span>
                <div>
                  <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 6px" }}>
                    Destrucción y Anonimización Inmediata
                  </p>
                  <p style={{ fontSize: "0.84rem", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                    Al pulsar en <strong>"Eliminar cuenta"</strong> en la sección Mi Perfil de la app móvil, el backend destruye inmediatamente tu nombre, correo, foto de perfil y distrito. 
                    Tus logs de cuestionarios e historial se anonimizan de forma irreversible para estadísticas del proyecto de tesis, impidiendo cualquier vinculación con tu identidad.
                  </p>
                </div>
              </div>
            </div>

            <div className="divider-orange" />

            {/* 11. Seguridad */}
            <div id="seguridad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>11.</span> Seguridad de la Información
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 12 }}>
                Aplicamos medidas de seguridad robustas para proteger tus datos personales:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
                <li>Cifrado de contraseñas con algoritmo seguro (hashing con bcrypt).</li>
                <li>Uso de JSON Web Tokens (JWT) para control de sesiones activas.</li>
                <li>Protocolo de comunicación HTTPS seguro.</li>
                <li>Servidores y bases de datos seguras bajo Amazon Web Services y MongoDB Atlas.</li>
              </ul>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.9rem", marginTop: 12 }}>
                Aunque nos esforzamos en proteger tus datos, recuerda que ningún método de almacenamiento en internet es 100% infalible.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 12. Derechos ARCO */}
            <div id="derechos" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>12.</span> Derechos del Usuario (ARCO)
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                De acuerdo con la Ley N.° 29733 de la República del Perú, tienes los siguientes derechos sobre tus datos:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="responsive-2col">
                <div style={{ background: "rgba(255,255,255,0.01)", padding: 14, borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#F8FAFC", margin: "0 0 4px" }}>🔓 Acceso y Rectificación</p>
                  <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>Consultar qué datos tenemos sobre ti y corregir campos desactualizados o inexactos.</p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.01)", padding: 14, borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#F8FAFC", margin: "0 0 4px" }}>❌ Cancelación y Oposición</p>
                  <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>Solicitar la eliminación completa de tus datos personales u oponerte a tratamientos específicos.</p>
                </div>
              </div>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.9rem", marginTop: 16 }}>
                Puedes ejercer cualquiera de estos derechos escribiendo formalmente a los correos de contacto indicados al final.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 13. Compartición */}
            <div id="transferencia" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>13.</span> Transferencia o Compartición de Datos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                HistoriAR <strong>no vende, alquila, comercializa ni transfiere</strong> datos personales de sus usuarios bajo ninguna circunstancia comercial. Solo compartimos la información necesaria para el hosting técnico y bases de datos con nuestros proveedores autorizados, o en caso de órdenes legales requeridas por autoridades competentes.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 14. Transferencias Internacionales */}
            <div id="transferencias-int" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>14.</span> Transferencias Internacionales
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Al utilizar infraestructura en la nube global (como AWS para almacenamiento de modelos 3D y MongoDB Atlas para base de datos), algunos datos técnicos o anonimizados pueden alojarse en centros de datos ubicados fuera de la República del Perú. Estos proveedores operan bajo estrictas directrices de seguridad de nivel industrial.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 15. Cambios en la Política */}
            <div id="cambios" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>15.</span> Cambios en esta Política
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Nos reservamos el derecho de modificar esta política para reflejar cambios en la aplicación móvil, adaptaciones legales o especificaciones técnicas de la Google Play Store. Las actualizaciones se publicarán en esta página o se informarán mediante alertas dentro de la aplicación móvil. El uso continuado implica la conformidad.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 16. Contacto */}
            <div id="contacto" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>16.</span> Contacto
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Si tienes preguntas sobre esta política o deseas solicitar el borrado de tu cuenta, puedes contactarnos:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1.1rem" }}>✉️</span>
                  <a href="mailto:carlos.asparrin@tecsup.edu.pe" style={{ color: "#F97316", textDecoration: "none", fontSize: "0.92rem", fontWeight: 600 }}>
                    carlos.asparrin@tecsup.edu.pe
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1.1rem" }}>✉️</span>
                  <a href="mailto:hector.perez@tecsup.edu.pe" style={{ color: "#F97316", textDecoration: "none", fontSize: "0.92rem", fontWeight: 600 }}>
                    hector.perez@tecsup.edu.pe
                  </a>
                </div>
              </div>
              <p style={{ fontSize: "0.78rem", color: "#64748B", marginTop: 24, fontStyle: "italic" }}>
                Última actualización: Mayo de 2026.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(249,115,22,0.1)", padding: "36px 20px", background: "#09091566", marginTop: 60 }}>
        <div className="footer-grid mx-auto" style={{ maxWidth: 1100 }}>
          <p style={{ fontSize: "0.8rem", color: "#374151", margin: 0 }}>
            © 2026 HistoriAR — Reviviendo el patrimonio cultural con tecnología.
          </p>

          <div className="flex items-center justify-center" style={{ gap: 8 }}>
            <Image
              src="/logo.png"
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
              id="footer-home-link"
              href="/"
              style={{ fontSize: "0.8rem", color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F97316")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
            >
              Inicio
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
    </div>
  );
}
