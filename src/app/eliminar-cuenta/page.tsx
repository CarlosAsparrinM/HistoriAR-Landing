"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";

// ─────────────────────────────────────────
// Google Identity Services type declarations
// ─────────────────────────────────────────
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
              locale?: string;
            }
          ) => void;
        };
      };
    };
  }
}

// ─────────────────────────────────────────
// Config
// ─────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

type Status = "idle" | "loading" | "success" | "error";

// ─────────────────────────────────────────
// Deletion page
// ─────────────────────────────────────────
export default function DeleteAccountPage() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [method, setMethod] = useState<"credentials" | "google" | null>(null);

  // Confirmation modal
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);

  // Google button ref
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // ── Google callback ──
  const handleGoogleResponse = useCallback(
    (response: { credential: string }) => {
      const idToken = response.credential;
      setMethod("google");
      setPendingAction(() => () => executeGoogleDeletion(idToken));
    },
    []
  );

  // ── Load Google Identity Services script ──
  const isGoogleInitialized = useRef(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || isGoogleInitialized.current) return;

    function initGoogle() {
      if (!window.google || !googleBtnRef.current || isGoogleInitialized.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "filled_black",
        size: "large",
        width: 320,
        text: "continue_with",
        shape: "pill",
        locale: "es",
      });

      isGoogleInitialized.current = true;
    }

    if (window.google) {
      initGoogle();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    
    if (existingScript) {
      existingScript.addEventListener("load", initGoogle);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.head.appendChild(script);
  }, [handleGoogleResponse]);

  // ── Credential submit ──
  function handleCredentialSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Por favor, ingresa tu correo y contraseña.");
      setStatus("error");
      return;
    }

    setMethod("credentials");
    setPendingAction(() => () => executeCredentialDeletion(email, password));
  }

  // ── Execute deletion with email + password ──
  async function executeCredentialDeletion(em: string, pw: string) {
    setStatus("loading");
    setErrorMsg("");

    try {
      // Step 1: Login
      const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em, password: pw }),
      });

      if (!loginRes.ok) {
        const body = await loginRes.json().catch(() => null);
        throw new Error(
          body?.message ?? "Credenciales inválidas. Verifica tu correo y contraseña."
        );
      }

      const { token } = await loginRes.json();

      // Step 2: Delete
      const delRes = await fetch(`${API_BASE}/api/users/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!delRes.ok) {
        const body = await delRes.json().catch(() => null);
        throw new Error(body?.message ?? "No se pudo eliminar la cuenta.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    }
  }

  // ── Execute deletion with Google idToken ──
  async function executeGoogleDeletion(idToken: string) {
    setStatus("loading");
    setErrorMsg("");

    try {
      // Step 1: Login via Google
      const loginRes = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!loginRes.ok) {
        const body = await loginRes.json().catch(() => null);
        throw new Error(
          body?.message ?? "No se pudo autenticar con Google. Intenta de nuevo."
        );
      }

      const { token } = await loginRes.json();

      // Step 2: Delete
      const delRes = await fetch(`${API_BASE}/api/users/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!delRes.ok) {
        const body = await delRes.json().catch(() => null);
        throw new Error(body?.message ?? "No se pudo eliminar la cuenta.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    }
  }

  // ── Confirmation handlers ──
  function confirmDeletion() {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }

  function cancelDeletion() {
    setPendingAction(null);
    setMethod(null);
  }

  // ── Reset ──
  function handleReset() {
    setStatus("idle");
    setErrorMsg("");
    setEmail("");
    setPassword("");
    setMethod(null);
    setPendingAction(null);
  }

  // ────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#0D0D1A", minHeight: "100vh", color: "#F8FAFC" }}>
      {/* ── Navbar ── */}
      <nav
        className="navbar-base navbar-scrolled"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1200, padding: "0 20px" }}
        >
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

      {/* ── Main ── */}
      <main className="mx-auto px-5 py-12" style={{ maxWidth: 720 }}>
        {/* Header */}
        <div className="mb-12 text-center anim-fade-up">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              fontSize: "0.74rem",
              fontWeight: 700,
              color: "#F87171",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            ACCIÓN IRREVERSIBLE
          </span>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            Eliminar <span className="gradient-text">Cuenta y Datos</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", maxWidth: 560, margin: "0 auto" }}>
            Si deseas eliminar tu cuenta de HistoriAR y todos los datos personales asociados,
            autentícate utilizando el mismo método con el que creaste tu cuenta.
          </p>
        </div>

        {/* ── Success State ── */}
        {status === "success" && (
          <div className="glass-card anim-fade-up" style={{ padding: "40px 28px", textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(34, 197, 94, 0.12)",
                border: "2px solid rgba(34, 197, 94, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "2rem",
              }}
            >
              ✅
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#4ade80", marginBottom: 12 }}>
              Cuenta eliminada exitosamente
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "0.92rem", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 24px" }}>
              Tu cuenta ha sido marcada como eliminada. Tus datos personales (nombre, correo,
              foto de perfil, contraseña y distrito) han sido destruidos de forma irreversible.
              Los registros de actividad han sido anonimizados para fines estadísticos de la tesis.
            </p>
            <Link href="/" className="btn-primary" style={{ fontSize: "0.9rem" }}>
              Volver al Inicio
            </Link>
          </div>
        )}

        {/* ── Confirmation Modal ── */}
        {pendingAction && status !== "success" && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              animation: "fadeIn 0.2s ease both",
            }}
          >
            <div
              className="glass-card"
              style={{
                maxWidth: 440,
                width: "100%",
                padding: "32px 28px",
                textAlign: "center",
                background: "rgba(13, 13, 26, 0.96)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "2px solid rgba(239, 68, 68, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "1.5rem",
                }}
              >
                ⚠️
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#F8FAFC", marginBottom: 10 }}>
                ¿Estás seguro?
              </h3>
              <p style={{ color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 24 }}>
                Esta acción es <strong style={{ color: "#F87171" }}>permanente e irreversible</strong>.
                Se eliminarán tu nombre, correo electrónico, foto de perfil, contraseña y distrito.
                Tu historial de actividad será anonimizado.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={cancelDeletion}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#94A3B8",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeletion}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #EF4444, #DC2626)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    boxShadow: "0 8px 30px rgba(239, 68, 68, 0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  Sí, eliminar mi cuenta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Form (idle / loading / error) ── */}
        {status !== "success" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Method 1: Credentials */}
            <div className="glass-card anim-fade-up delay-1" style={{ padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: "1.5rem" }}>🔑</span>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
                  Eliminar con Correo y Contraseña
                </h2>
              </div>
              <p style={{ color: "#64748B", fontSize: "0.82rem", marginBottom: 20, lineHeight: 1.6 }}>
                Usa este método si creaste tu cuenta con correo electrónico y contraseña.
              </p>

              <form onSubmit={handleCredentialSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Email */}
                <div>
                  <label
                    htmlFor="delete-email"
                    style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94A3B8", marginBottom: 6 }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="delete-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: 14,
                      border: "1px solid rgba(249, 115, 22, 0.2)",
                      background: "rgba(255, 255, 255, 0.03)",
                      color: "#F8FAFC",
                      fontSize: "0.92rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.2)")}
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="delete-password"
                    style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94A3B8", marginBottom: 6 }}
                  >
                    Contraseña
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="delete-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={status === "loading"}
                      style={{
                        width: "100%",
                        padding: "13px 48px 13px 16px",
                        borderRadius: 14,
                        border: "1px solid rgba(249, 115, 22, 0.2)",
                        background: "rgba(255, 255, 255, 0.03)",
                        color: "#F8FAFC",
                        fontSize: "0.92rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.2)")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "#64748B",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        padding: 0,
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    marginTop: 6,
                    padding: "14px 28px",
                    borderRadius: 999,
                    background:
                      status === "loading" && method === "credentials"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "linear-gradient(135deg, #EF4444, #DC2626)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    boxShadow: "0 8px 30px rgba(239, 68, 68, 0.25)",
                    transition: "all 0.22s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: status === "loading" && method !== "credentials" ? 0.5 : 1,
                  }}
                >
                  {status === "loading" && method === "credentials" ? (
                    <>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Procesando…
                    </>
                  ) : (
                    <>🗑️ Eliminar mi cuenta</>
                  )}
                </button>
              </form>
            </div>

            {/* Separator */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div className="divider-orange" style={{ flex: 1 }} />
              <span style={{ color: "#4B5563", fontSize: "0.8rem", fontWeight: 600, flexShrink: 0 }}>
                O TAMBIÉN
              </span>
              <div className="divider-orange" style={{ flex: 1 }} />
            </div>

            {/* Method 2: Google */}
            <div className="glass-card anim-fade-up delay-2" style={{ padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, flexShrink: 0 }}>
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
                  Eliminar con Google
                </h2>
              </div>
              <p style={{ color: "#64748B", fontSize: "0.82rem", marginBottom: 20, lineHeight: 1.6 }}>
                Usa este método si creaste tu cuenta iniciando sesión con tu cuenta de Google.
              </p>

              {/* Google rendered button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  opacity: status === "loading" && method === "google" ? 0.4 : 1,
                  pointerEvents: status === "loading" ? "none" : "auto",
                  transition: "opacity 0.2s",
                }}
              >
                <div ref={googleBtnRef} id="google-signin-btn" />
              </div>

              {status === "loading" && method === "google" && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: "#94A3B8",
                    fontSize: "0.85rem",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Procesando eliminación…
                </div>
              )}

              {!GOOGLE_CLIENT_ID && (
                <p style={{ color: "#F87171", fontSize: "0.78rem", marginTop: 12, textAlign: "center" }}>
                  ⚠️ Google Client ID no configurado. Contacta al administrador.
                </p>
              )}
            </div>

            {/* Error Message */}
            {status === "error" && errorMsg && (
              <div
                className="anim-fade-up"
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(239, 68, 68, 0.06)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>❌</span>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#F87171", margin: "0 0 4px" }}>
                    Error en el proceso
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 10px", lineHeight: 1.5 }}>
                    {errorMsg}
                  </p>
                  <button
                    onClick={handleReset}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 999,
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#94A3B8",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Intentar de nuevo
                  </button>
                </div>
              </div>
            )}

            {/* Data Info Section */}
            <div className="glass-card anim-fade-up delay-3" style={{ padding: "28px 24px" }}>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#F8FAFC",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                📋 ¿Qué sucede con tus datos?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Deleted data */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: 12,
                    background: "rgba(239, 68, 68, 0.04)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "#F87171",
                      margin: "0 0 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    🗑️ Datos eliminados de forma permanente
                  </p>
                  <ul
                    style={{
                      fontSize: "0.8rem",
                      color: "#94A3B8",
                      margin: 0,
                      paddingLeft: 16,
                      lineHeight: 1.7,
                    }}
                  >
                    <li>Nombre de usuario</li>
                    <li>Correo electrónico</li>
                    <li>Contraseña (hash)</li>
                    <li>Foto de perfil / avatar</li>
                    <li>Distrito registrado</li>
                  </ul>
                </div>

                {/* Anonymized data */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: 12,
                    background: "rgba(249, 115, 22, 0.04)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "#FB923C",
                      margin: "0 0 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    🔒 Datos anonimizados (no vinculables a tu identidad)
                  </p>
                  <ul
                    style={{
                      fontSize: "0.8rem",
                      color: "#94A3B8",
                      margin: 0,
                      paddingLeft: 16,
                      lineHeight: 1.7,
                    }}
                  >
                    <li>Historial de monumentos visitados</li>
                    <li>Respuestas de quizzes educativos</li>
                    <li>Puntajes y logros obtenidos</li>
                  </ul>
                  <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: 8, marginBottom: 0, lineHeight: 1.5 }}>
                    Estos registros se conservan sin datos identificables, exclusivamente para fines
                    estadísticos del proyecto de tesis académica.
                  </p>
                </div>
              </div>
            </div>

            {/* Also via app */}
            <div
              style={{
                padding: "18px 20px",
                borderRadius: 14,
                background: "rgba(34, 197, 94, 0.04)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>📱</span>
              <div>
                <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#4ade80", margin: "0 0 4px" }}>
                  También puedes eliminar tu cuenta desde la app
                </p>
                <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                  Abre HistoriAR → Mi Perfil → pulsa{" "}
                  <strong style={{ color: "#94A3B8" }}>&quot;Eliminar cuenta&quot;</strong>. El proceso es
                  instantáneo e idéntico.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(249,115,22,0.1)",
          padding: "36px 20px",
          background: "#09091566",
          marginTop: 60,
        }}
      >
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

      {/* Spinner keyframe */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
