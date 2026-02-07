import { useEffect, useState } from "react";
import AddNumber from "./camponents/AddNumber";
import { getUserById, getActiveNumbers } from "./funktions/forBackend";

export default function App() {
  const [tg] = useState(window.Telegram?.WebApp);
  const [me, setMe] = useState(null);
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const u = tg?.initDataUnsafe?.user || null;
    if (!u) {
      setStatus("User topilmadi (initDataUnsafe.user yo‘q)");
      return;
    }
    setStatus("Logged in (Telegram WebApp)");
    alert(JSON.stringify(u));

    (async () => {
      try {
        const userData = await getUserById(u.id);
        setMe(userData.data);
        console.log(u);
        alert(u.id)
        

        if (userData.data?.setle_phones) {
          const active = await getActiveNumbers(userData.data.setle_phones);
          setActiveNumbers(active || []);
          setStatus("Active numbers loaded");
        }
      } catch (err) {
        console.error("Xatolik:", err);
        setStatus("Xatolik yuz berdi");
      }
    })();
  }, [tg]);

  console.log({ me, activeNumbers, status });

  return (
    <>
      {me && !me.isActive && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          🔒 Siz admin orqali faollashtirilishingiz kerak. {me.username}
          <br />
          {me.number || "Siz raqamingizni ham botga yuboring, bizda mavjud emas"}
        </div>
      )}

      {me && me.isActive && status === "Active numbers loaded" && (
        <AddNumber
          activeNumbers={activeNumbers}
          me={me}
        />
      )}
    </>
  );

}