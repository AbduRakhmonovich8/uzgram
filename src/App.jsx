import { useEffect, useMemo, useState } from "react";
import AddNumber from "./camponents/AddNumber";
import { getUserById, getActiveNumbers } from "./funktions/forBackend";


export default function App() {
  const [tg, setTg] = useState(window.Telegram?.WebApp);
  const [me, setMe] = useState(null);
  // const [user, setUser] = useState(null);
  const [activeNumbers, setActiveNumbers] = useState([]); // massiv sifatida
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const u = tg?.initDataUnsafe?.user || null;
    setStatus(u ? "Logged in (Telegram WebApp)" : "User topilmadi (initDataUnsafe.user yo‘q)");
    alert(u);

    (async () => {
      try {
        const userData = await getUserById(u?.id); // natija obyekt
        setMe(userData.data);

        // endi userData.data orqali telefonlarni olish
        if (userData.data?.setle_phones) {
          const active = await getActiveNumbers(userData.data.setle_phones);
          // agar getActiveNumbers massiv qaytarsa, to‘g‘ridan-to‘g‘ri saqlaymiz
          setStatus(false);
          setActiveNumbers(active || []);
        }
      } catch (err) {
        console.error("Xatolik:", err);
        setStatus("Xatolik yuz berdi");
      }
    })();
  }, [tg]);

  console.log(me);



  return (
    <>
      {me && !me.isActive && <div style={{ textAlign: "center", marginTop: "50px" }}>🔒 Siz admin orqali faollashtirilishingiz kerak.  {me.username}<br />{me.number || "siz raqamingizni ham botga yuboring sizni raqamingiz bizda mavjudmas"}</div> || !status && me && me?.isActive && <AddNumber
        activeNumbers={activeNumbers}
        me={me}// endi to‘g‘ridan-to‘g‘ri massiv
      />}
    </>
  );
}