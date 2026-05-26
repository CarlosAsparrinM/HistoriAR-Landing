"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "aceptacion", label: "1. Aceptación de los Términos" },
  { id: "descripcion", label: "2. Descripción del Servicio" },
  { id: "naturaleza", label: "3. Naturaleza del Proyecto" },
  { id: "usuarios", label: "4. Usuarios" },
  { id: "cuenta", label: "5. Cuenta de Usuario" },
  { id: "uso-permitido", label: "6. Uso Permitido" },
  { id: "uso-prohibido", label: "7. Uso Prohibido" },
  { id: "ar-mapas", label: "8. Ubicación y AR" },
  { id: "contenido", label: "9. Contenido de HistoriAR" },
  { id: "propiedad-intelectual", label: "10. Propiedad Intelectual" },
  { id: "contenido-usuario", label: "11. Contenido del Usuario" },
  { id: "gratuidad", label: "12. Gratuidad y Terceros" },
  { id: "privacidad", label: "13. Privacidad" },
  { id: "disponibilidad", label: "14. Disponibilidad" },
  { id: "limitacion-responsabilidad", label: "15. Limitación de Responsabilidad" },
  { id: "suspension", label: "16. Suspensión o Cancelación" },
  { id: "eliminacion", label: "17. Eliminación de Cuenta" },
  { id: "cambios", label: "18. Cambios en los Términos" },
  { id: "ley-aplicable", label: "19. Ley Aplicable y Jurisdicción" },
  { id: "contacto", label: "20. Contacto" },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("aceptacion");

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
              src="/historiar-logo.png"
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
            Términos y <span className="gradient-text">Condiciones</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto" }}>
            Por favor, lee detalladamente los términos que rigen el uso de la aplicación móvil HistoriAR y sus servicios web asociados.
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
            {/* 1. Aceptación */}
            <div id="aceptacion" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>01.</span> Aceptación de los Términos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Al descargar, instalar, registrarse o utilizar la aplicación móvil <strong>HistoriAR</strong>, el usuario acepta de manera íntegra estos Términos y Condiciones.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                Si el usuario no está de acuerdo con alguna disposición de este documento, debe abstenerse inmediatamente de utilizar la aplicación.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                Estos Términos se aplican al uso de la aplicación, sus funcionalidades, contenidos, servidores, recursos multimedia y cualquier otra herramienta vinculada a HistoriAR.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 2. Descripción */}
            <div id="descripcion" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>02.</span> Descripción del Servicio
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 14 }}>
                HistoriAR es una aplicación móvil educativa desarrollada como proyecto de tesis. Su finalidad es permitir que los usuarios exploren monumentos históricos y arqueológicos mediante herramientas digitales interactivas como:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.92rem", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
                <li>Mapas interactivos con geolocalización de monumentos.</li>
                <li>Fichas de información histórica y cultural de las huacas de Lima.</li>
                <li>Realidad aumentada (AR) para proyectar reconstrucciones 3D detalladas.</li>
                <li>Tours educativos guiados e interactivos y cuestionarios (quizzes) de autoevaluación.</li>
                <li>Sistema de progreso mediante logros y perfiles personales.</li>
              </ul>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.92rem", marginTop: 14 }}>
                HistoriAR tiene exclusivamente fines educativos y de exploración. No sustituye las recomendaciones oficiales de turismo, navegación ni la información patrimonial oficial emitida por las autoridades gubernamentales.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 3. Naturaleza del Proyecto */}
            <div id="naturaleza" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>03.</span> Naturaleza del Proyecto
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                HistoriAR es un proyecto de tesis desarrollado por <strong>Carlos Asparrin Martin</strong> y <strong>Hector Perez Vengoa</strong> para fines académicos en la institución <strong>Tecsup</strong>.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                La aplicación se encuentra en etapa de mejora continua, académica y experimental. Por ello, los autores se reservan el derecho de modificar, limitar, suspender o actualizar las funcionalidades conforme evolucione el proyecto académico.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 4. Usuarios */}
            <div id="usuarios" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>04.</span> Usuarios
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                La aplicación está dirigida a personas de todas las edades interesadas en la historia y la tecnología. Si bien el contenido es apto para menores de edad por su carácter educativo, se aconseja que el uso sea supervisado por un adulto o tutor responsable.
              </p>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginTop: 12 }}>
                El usuario se compromete a proporcionar datos de registro verídicos y exactos para garantizar el correcto guardado de su perfil y progreso.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 5. Cuenta de Usuario */}
            <div id="cuenta" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>05.</span> Cuenta de Usuario
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 12 }}>
                Para habilitar las funciones de quizzes y guardar puntuaciones, el usuario requiere registrarse mediante:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.92rem", paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
                <li>Registro clásico de correo electrónico y contraseña.</li>
                <li>Google Sign-In para un acceso rápido y seguro.</li>
              </ul>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.92rem", marginTop: 12 }}>
                El usuario es el único responsable de salvaguardar sus credenciales de acceso. HistoriAR no asumirá responsabilidad alguna por pérdidas o accesos no autorizados debidos a descuidos, contraseñas débiles o revelación voluntaria de credenciales a terceros.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 6. Uso Permitido */}
            <div id="uso-permitido" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>06.</span> Uso Permitido de la Aplicación
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 12 }}>
                El usuario se compromete a usar HistoriAR de buena fe para fines personales y educativos, lo que incluye:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.92rem", paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
                <li>Visualizar los modelos 3D y monumentos mediante la realidad aumentada.</li>
                <li>Seguir las rutas temáticas de los tours.</li>
                <li>Participar de manera interactiva en los cuestionarios educativos.</li>
                <li>Revisar su progreso y medallas obtenidas.</li>
              </ul>
            </div>

            <div className="divider-orange" />

            {/* 7. Uso Prohibido */}
            <div id="uso-prohibido" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>07.</span> Uso Prohibido
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 12 }}>
                Queda terminantemente prohibido incurrir en las siguientes conductas:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.92rem", paddingLeft: 20, margin: 0, lineHeight: 1.75 }}>
                <li style={{ marginBottom: 6 }}>Intentar vulnerar la seguridad de la infraestructura, API, backend o base de datos.</li>
                <li style={{ marginBottom: 6 }}>Extraer u obtener masivamente la base de datos de preguntas o recursos de la aplicación.</li>
                <li style={{ marginBottom: 6 }}>Realizar ingeniería inversa o manipulación maliciosa de los archivos de la app.</li>
                <li style={{ marginBottom: 6 }}>Comercializar u ofrecer los modelos 3D personalizados, textos históricos y logotipos de HistoriAR en canales externos sin el consentimiento escrito de los autores.</li>
                <li style={{ marginBottom: 6 }}>Suplantar la identidad de otros usuarios.</li>
              </ul>
              <p style={{ color: "#94A3B8", fontSize: "0.9rem", marginTop: 12 }}>
                La violación de estas prohibiciones dará lugar a la suspensión de la cuenta de usuario de manera inmediata y, en caso necesario, a la interposición de acciones legales.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 8. Ubicación y AR (Responsabilidad FÍSICA) */}
            <div id="ar-mapas" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>08.</span> Ubicación, Mapas y Realidad Aumentada
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                El mapa interactivo y el posicionamiento de los monumentos dependen de los sensores GPS del dispositivo y la red móvil. HistoriAR no garantiza una exactitud milimétrica de posicionamiento. Los modelos en 3D son recreaciones digitales diseñadas con fines didácticos e ilustrativos.
              </p>

              {/* Physical Security Alert */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: 14,
                  background: "rgba(249, 115, 22, 0.04)",
                  border: "1px solid rgba(249, 115, 22, 0.25)",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: -2 }}>🛑</span>
                <div>
                  <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 6px" }}>
                    Seguridad en el Entorno Real
                  </p>
                  <p style={{ fontSize: "0.84rem", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                    <strong>El usuario es el único responsable de usar la aplicación atendiendo a su seguridad física.</strong> 
                    Dado que la Realidad Aumentada requiere enfocar la cámara y desplazarse, debes estar alerta a obstáculos en el terreno, tráfico, desniveles y normas de los sitios arqueológicos o de la vía pública. 
                    HistoriAR no se responsabiliza por accidentes, lesiones o daños materiales debidos a distracciones durante el uso de la aplicación.
                  </p>
                </div>
              </div>
            </div>

            <div className="divider-orange" />

            {/* 9. Contenido */}
            <div id="contenido" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>09.</span> Contenido de HistoriAR
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                La información de los monumentos históricos se ha redactado recopilando datos de fuentes oficiales e investigaciones históricas validadas. No obstante, HistoriAR no garantiza la ausencia total de errores tipográficos o imprecisiones menores en los textos pedagógicos.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 10. Propiedad Intelectual */}
            <div id="propiedad-intelectual" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>10.</span> Propiedad Intelectual
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                El diseño de interfaces, la lógica de programación, el logotipo, los cuestionarios interactivos, los textos explicativos y los modelos 3D optimizados para AR pertenecen legítimamente a los autores del proyecto o se utilizan con licencias libres/públicas. Descargar la aplicación no otorga ningún derecho de propiedad ni derecho comercial sobre estos recursos.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 11. Contenido del Usuario */}
            <div id="contenido-usuario" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>11.</span> Contenido del Usuario
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Los usuarios de HistoriAR no pueden cargar contenidos visibles públicamente (como foros o imágenes). Todo dato derivado de su interacción (visitas, quizzes respondidos y logros) se guarda únicamente para estructurar su perfil privado y personal.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 12. Gratuidad y Terceros */}
            <div id="gratuidad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>12.</span> Gratividad y Servicios de Terceros
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                La aplicación HistoriAR es <strong>100% gratuita y libre de publicidad</strong>. Para su correcta operatividad técnica se integra con plataformas externas líderes:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.92rem", paddingLeft: 20, margin: 0, lineHeight: 1.75 }}>
                <li><strong>Firebase & Google Sign-In:</strong> Servicios de registro de cuentas seguros.</li>
                <li><strong>Amazon S3 (Simple Storage Service):</strong> Nube para descarga fluida de archivos 3D (.glb).</li>
                <li><strong>MongoDB Atlas:</strong> Base de datos relacional para guardar medallas y progreso.</li>
              </ul>
              <p style={{ color: "#94A3B8", fontSize: "0.9rem", marginTop: 12 }}>
                La operatividad de estas plataformas externas se rige bajo los propios términos de servicio de cada respectivo proveedor.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 13. Privacidad */}
            <div id="privacidad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>13.</span> Privacidad y Datos Personales
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                El tratamiento de tu información privada se detalla en nuestra <Link href="/politica-de-privacidad" style={{ color: "#F97316", fontWeight: 600, textDecoration: "none" }}>Política de Privacidad</Link>, la cual forma parte complementaria e indisoluble del acuerdo global de uso de HistoriAR.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 14. Disponibilidad */}
            <div id="disponibilidad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>14.</span> Disponibilidad del Servicio
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Procuramos proveer el servicio de manera fluida, no obstante, al ser una aplicación académica experimental, no garantizamos una disponibilidad continua e ininterrumpida de los servidores. El servicio puede detenerse temporalmente debido a mantenimientos técnicos, fallos de red o actualizaciones de infraestructura.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 15. Limitación de Responsabilidad */}
            <div id="limitacion-responsabilidad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>15.</span> Limitación de Responsabilidad
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 12 }}>
                En la medida permitida por las leyes peruanas, los creadores no serán responsables de:
              </p>
              <ul style={{ color: "#94A3B8", fontSize: "0.9rem", paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
                <li>Pérdidas de avances técnicos por fallas en servidores de bases de datos.</li>
                <li>Accidentes en la vía pública o museos derivados de la distracción con la pantalla del celular.</li>
                <li>Incompatibilidad de hardware con la tecnología ARCore en terminales móviles no homologados.</li>
              </ul>
            </div>

            <div className="divider-orange" />

            {/* 16. Suspensión */}
            <div id="suspension" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>16.</span> Suspensión o Cancelación de Cuenta
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Nos reservamos la facultad de suspender temporal o permanentemente el acceso a cualquier cuenta de usuario que cometa acciones maliciosas o fraudulentas, vulnere la seguridad técnica de los servidores, o incumpla las cláusulas de estos Términos.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 17. Eliminación */}
            <div id="eliminacion" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>17.</span> Eliminación de Cuenta y Datos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Cuentas con la total libertad de eliminar tu cuenta y destruir tu perfil de manera automática en el momento que consideres oportuno:
              </p>
              
              <div
                style={{
                  padding: "20px",
                  borderRadius: 14,
                  background: "rgba(34, 197, 94, 0.03)",
                  border: "1px solid rgba(34, 197, 94, 0.22)",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: -2 }}>⚙️</span>
                <div>
                  <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#F8FAFC", margin: "0 0 6px" }}>
                    Cómo eliminar tu cuenta en 1 paso
                  </p>
                  <p style={{ fontSize: "0.84rem", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                    Dirígete a la pestaña <strong>"Mi Perfil"</strong> dentro de la aplicación móvil y pulsa en el botón destructivo <strong>"Eliminar cuenta"</strong>. 
                    El servidor procesará la solicitud al instante, cerrará tu sesión de forma automática y procederá al borrado de tus datos personales identificativos de manera irreversible.
                  </p>
                </div>
              </div>
            </div>

            <div className="divider-orange" />

            {/* 18. Cambios */}
            <div id="cambios" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>18.</span> Cambios en los Términos
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Podemos modificar estos términos en cualquier momento con el objeto de adaptarlos a mejoras de hardware, actualizaciones del motor de AR o cambios regulatorios. Las modificaciones se publicarán en esta misma URL. El acceso continuo tras los cambios implicará su aceptación.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 19. Ley Applicable */}
            <div id="ley-aplicable" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>19.</span> Ley Aplicable y Jurisdicción
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem" }}>
                Estos Términos y Condiciones se interpretarán y regirán conforme a las leyes de la <strong>República del Perú</strong>. Ante cualquier discrepancia, ambas partes acuerdan someterse en primera instancia a procesos de negociación amistosa y conciliación directa.
              </p>
            </div>

            <div className="divider-orange" />

            {/* 20. Contacto */}
            <div id="contacto" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#F97316" }}>20.</span> Contacto
              </h2>
              <p style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: 16 }}>
                Por cualquier duda o aclaración sobre estos términos de servicio, puedes dirigirte a los autores:
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
