import { useState } from "react";

import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input"; // npm i input
import { API_HASH, API_ID } from "../funktions/supabase";
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
};

function AddNumber(user_id, fullName, username) {


  const stringSession = new StringSession(""); // fill this later with the value from session.save()
  (async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, API_ID, API_HASH, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    await client.sendMessage("me", { message: "Hello!" });
  })();



  const [step, setStep] = useState(1); // 1-phone | 2-code | 3-2fa
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Telegram Login</h2>
        <p>Usernaeme: {username}</p>
        <p>Full Name: {fullName}</p>
        <p>User ID: {user_id}</p>

        {/* STEP 1: PHONE */}
        {step === 1 && (
          <>
            <label style={styles.label}>Phone number</label>
            <input
              style={styles.input}
              placeholder="+998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button style={styles.button} onClick={() => setStep(2)}>
              Send Code
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
            />
            <button style={styles.button} onClick={() => setStep(3)}>
              Verify
            </button>
          </>
        )}

        {/* STEP 3: 2FA */}
        {step === 3 && (
          <>
            <label style={styles.label}>2FA Password (optional)</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Telegram password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.button}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AddNumber