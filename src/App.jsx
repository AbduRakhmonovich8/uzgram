import { useEffect, useMemo, useState } from "react";
import "dotenv/config";
import AddNumber from "./camponents/AddNumber";



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



  return (
    <AddNumber user_id={tg.id} fullName={(tg.first_name || "" + " " + tg.last_name || "")} useName={tg.username} />
  );
}
