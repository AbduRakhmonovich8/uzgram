import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumpos from "../components/BreadCrumpos";
import Numbers from "../components/Numbers";
import { getUserById, getActiveNumbers } from "../Functions/forBackend";
import WebApp from "@twa-dev/sdk";
function Layout() {

  const [me, setMe] = useState(null);
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [status, setStatus] = useState("Initializing...");
  // alert("yangilanish v = 33")

  useEffect(() => {
    WebApp.ready();      // 🔑 muhim
    WebApp.expand();

    const u = WebApp.initDataUnsafe?.user || null;
    if (!u) {
      setStatus("Telegram user topilmadi");
    }
    console.log("Telegram user:", u);
    setStatus("Logged in (Telegram WebApp)");

    (async () => {
      try {
        const userData = await getUserById(u?.id); // u.id || 8574151650 || 5672285896
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
    console.log(status);

  }, []);


  return (
    <>
      <nav className="my-8">
        <h1>UzgramDevAbu</h1>
        <div><p>{me?.username}</p><p className="number">{me?.number}</p></div><div style={{ backgroundColor: me?.isActive ? "green" : "red", width: "20px", height: "20px", borderRadius: "50%" }}></div>
      </nav>
      <header>

        {/* USER FAOL EMAS */}
        <BreadCrumpos />{(me && !me.isActive || !me?.number) && (
          <div className="card" style={{ textAlign: "center" }}>
            {me?.isActive || "🔒 Siz admin tomonidan faollashtirilishingiz kerak " + me?.username}
            {Boolean(me?.number) || "📵 Telefon raqamingiz botda mavjud emas"}
          </div>

        )}
        <div className="flex rounded-lg overflow-hidden w-[300px] mx-auto mb-4">
          <NavLink
            to={"/Raqam_Qoshish"}
            className="w-[50%] self-end bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5"
          >
            Raqam Qo‘shish
          </NavLink>
          <NavLink
            to={"/Odam_Qoshish"}
            className="w-[50%] self-end bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5"
          >
            Odam qo'shish
          </NavLink>

        </div>
        {/* USER FAOL */}
        {me && me.isActive && me?.number && (
          <Numbers activeNumbers={activeNumbers} />
        )}
      </header >
      <main>
        <Outlet context={{ me, activeNumbers }} />
      </main>
      <footer className="fixed bottom-0 left-0 w-full bg-white text-center py-2 shadow-md">khudoyberduyev &copy;</footer>
    </>
  );
}

export { Layout };
