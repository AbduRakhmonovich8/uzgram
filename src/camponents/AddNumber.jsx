import { useState } from "react";

const API = "http://172.16.14.51:4000";

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    background: "#020617",
    padding: 24,
    borderRadius: 16,
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    display: "block",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "none",
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
  },
  smallBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #334155",
    background: "transparent",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
    marginTop: 10,
  },
  msg: {
    background: "#0b1220",
    border: "1px solid #1e293b",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  error: {
    color: "#fecaca",
  },
  ok: {
    color: "#bbf7d0",
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #1e293b",
    background: "#0b1220",
    color: "#fff",
    fontSize: 12,
    resize: "none",
  },
};

export default function AddNumber({ user_id, fullName, username }) {
  const [step, setStep] = useState(1); // 1-phone | 2-code | 3-2fa | 4-done
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [session, setSession] = useState("");

  function resetAlerts() {
    setMessage("");
    setErrorMsg("");
  }

  async function sendCode() {
    resetAlerts();
    setLoading(true);

    try {
      const res = await fetch(`${API}/tg/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "send_code_failed");

      setMessage("✅ Kod yuborildi. Telegramdan kelgan kodni kiriting.");
      setStep(2);
    } catch (e) {
      setErrorMsg(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    resetAlerts();
    setLoading(true);

    try {
      const res = await fetch(`${API}/tg/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401 && data.error === "2fa_required") {
        setMessage("🧩 2FA yoqilgan. Parolni kiriting.");
        setStep(3);
        return;
      }

      if (!res.ok) throw new Error(data.error || "verify_code_failed");

      setSession(data.session);
      setMessage("✅ Session yaratildi!");
      setStep(4);

      // Agar xohlasangiz shu yerda supabase’ga saqlaysiz:
      // await addSession(user_id, phone, data.session, false);
    } catch (e) {
      setErrorMsg(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function verify2FA() {
    resetAlerts();
    setLoading(true);

    try {
      const res = await fetch(`${API}/tg/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "verify_2fa_failed");

      setSession(data.session);
      setMessage("✅ Session yaratildi!");
      setStep(4);

      // Agar xohlasangiz shu yerda supabase’ga saqlaysiz:
      // await addSession(user_id, phone, data.session, true);
    } catch (e) {
      setErrorMsg(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function back() {
    resetAlerts();
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(1);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Telegram Login</h2>

        <p>Username: {username || "no"}</p>
        <p>Full Name: {fullName || "no"}</p>
        <p>User ID: {user_id || "no"}</p>

        {(message || errorMsg) && (
          <div style={styles.msg}>
            {message && <div style={styles.ok}>{message}</div>}
            {errorMsg && <div style={styles.error}>{errorMsg}</div>}
          </div>
        )}

        {/* STEP 1: PHONE */}
        {step === 1 && (
          <>
            <label style={styles.label}>Phone number</label>
            <input
              style={styles.input}
              placeholder="+998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
            <button style={styles.button} onClick={sendCode} disabled={loading || !phone}>
              {loading ? "Sending..." : "Send Code"}
            </button>
          </>
        )}

        {/* STEP 2: CODE */}
        {step === 2 && (
          <>
            <label style={styles.label}>Verification code</label>
            <input
              style={styles.input}
              placeholder="12345"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />
            <button style={styles.button} onClick={verifyCode} disabled={loading || !code}>
              {loading ? "Verifying..." : "Verify"}
            </button>

            <button style={styles.smallBtn} onClick={back} disabled={loading}>
              Back
            </button>
          </>
        )}

        {/* STEP 3: 2FA */}
        {step === 3 && (
          <>
            <label style={styles.label}>2FA Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Telegram password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button style={styles.button} onClick={verify2FA} disabled={loading || !password}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <button style={styles.smallBtn} onClick={back} disabled={loading}>
              Back
            </button>
          </>
        )}

        {/* STEP 4: DONE */}
        {step === 4 && (
          <>
            <label style={styles.label}>STRING_SESSION</label>
            <textarea style={styles.textarea} value={session} readOnly />
            <button style={styles.smallBtn} onClick={back}>
              Add another number
            </button>
          </>
        )}
      </div>
    </div>
  );
}
