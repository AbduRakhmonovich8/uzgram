import { useEffect, useMemo, useState } from "react";

const API_BASE = "127.0.0.1:3001";
// Agar backend bo‘lsa: "http://localhost:3001" yoki "https://your-backend.com"

function getTg() {
  return window.Telegram?.WebApp || null;
}

export default function App() {
  const tg = useMemo(() => getTg(), []);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Initializing...");
  const [contacts, setContacts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!tg) {
      setStatus("Telegram WebApp topilmadi. Bu app Telegram ichida ochilishi kerak.");
      return;
    }

    tg.expand();

    const u = tg.initDataUnsafe?.user || null;
    setUser(u);
    alert(JSON.stringify(u))

    setStatus(u ? "Logged in (Telegram WebApp)" : "User topilmadi (initDataUnsafe.user yo‘q)");
  }, [tg]);



  // Demo contacts (backend bo‘lmasa ham ko‘rsatadi)
  function loadDemoContacts() {
    setErr("");
    setContacts([
      { id: 1, name: "Ali", username: "ali_01" },
      { id: 2, name: "Vali", username: null },
      { id: 3, name: "Sardor", username: "sardor_dev" },
    ]);
    setStatus("Demo contacts loaded");
  }

  // Backend’dan olishga tayyor (keyin server yozilganda ishlaydi)
  async function loadContactsFromBackend() {
    setErr("");
    setStatus("Loading contacts from backend...");

    if (!API_BASE) {
      setErr("API_BASE bo‘sh. Avval backend domenini App.jsx ichida yozing.");
      setStatus("Error");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        headers: {
          // Telegram’dan kelgan initData (backend tekshiradi)
          "X-Telegram-InitData": tg?.initData || "",
        },
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Failed to load contacts");

      setContacts(
        (data.contacts || []).map((c) => ({
          id: c.id,
          name: [c.firstName, c.lastName].filter(Boolean).join(" ").trim() || "No name",
          username: c.username || null,
        }))
      );

      setStatus(`Loaded ${data.contacts?.length || 0} contacts`);
    } catch (e) {
      setErr(e.message);
      setStatus("Error");
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: "Arial, sans-serif" }}>
      <h2>Telegram Mini App (React)</h2>

      <div style={{ marginBottom: 12 }}>
        <div><b>Status:</b> {status}</div>

        {user ? (
          <div style={{ marginTop: 10, padding: 10, border: "1px solid #ddd", borderRadius: 8 }}>
            <div><b>Name:</b> {user.first_name} {user.last_name || ""}</div>
            <div><b>Username:</b> {user.username ? `@${user.username}` : "(none)"}</div>
            <div><b>User ID:</b> {user.id}</div>
          </div>
        ) : (
          <div style={{ marginTop: 10 }}>
            Telegram ichida ochilmasa user ko‘rinmaydi.
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={loadDemoContacts} style={btnStyle}>
          Load demo contacts
        </button>

        <button onClick={loadContactsFromBackend} style={btnStyle}>
          Load contacts (backend)
        </button>
      </div>

      {err && (
        <div style={{ marginTop: 12, color: "crimson" }}>
          <b>Error:</b> {err}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h3>Contacts</h3>

        {contacts.length === 0 ? (
          <div>Kontaktlar hali yuklanmagan.</div>
        ) : (
          <ul>
            {contacts.map((c) => (
              <li key={c.id}>
                <b>{c.name}</b> {c.username ? `(@${c.username})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  cursor: "pointer",
  background: "white",
};
