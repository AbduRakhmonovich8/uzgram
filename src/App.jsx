import { useEffect, useState } from "react";
import AddNumber from "./camponents/AddNumber";
import { getUserById, getActiveNumbers } from "./funktions/forBackend";
import WebApp from "@twa-dev/sdk";

export default function App() {

  const [me, setMe] = useState(null);
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [status, setStatus] = useState("Initializing...");

  alert("yangilanish v = 2")

  useEffect(() => {
    WebApp.ready();      // 🔑 muhim
    WebApp.expand();

    const u = WebApp.initDataUnsafe?.user || null;
    if (!u) {
      setStatus("Telegram user topilmadi");
      return;
    }

    console.log("Telegram user:", u);
    setStatus("Logged in (Telegram WebApp)");

    (async () => {
      try {
        const userData = await getUserById(u.id);
        setMe(userData.data);

        if (userData.data?.setle_phones?.length) {
          const active = await getActiveNumbers(userData.data.setle_phones);
          setActiveNumbers(active || []);
          setStatus("Active numbers loaded");
        } else {
          setStatus("Userda raqamlar mavjud emas");
        }
      } catch (err) {
        console.error("Backend xatolik:", err);
        setStatus("Server bilan bog‘lanishda xatolik");
      }
    })();
  }, []);

  console.log({ me, activeNumbers, status });

  return (
    <>
      {/* USER FAOL EMAS */}
      {me && !me.isActive && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          🔒 Siz admin tomonidan faollashtirilishingiz kerak
          <br />
          Username: {me.username}
          <br />
          {me.number || "📵 Telefon raqamingiz botda mavjud emas"}
        </div>
      )}

      {/* USER FAOL */}
      {me && me.isActive && status === "Active numbers loaded" && (
        <AddNumber activeNumbers={activeNumbers} me={me} />
      )}

      {/* STATUS */}
      {!me && <p style={{ textAlign: "center" }}>{status}</p>}
    </>
  );
}
