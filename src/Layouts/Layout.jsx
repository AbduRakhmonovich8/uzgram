import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumpos from "../components/BreadCrumpos";
import Numbers from "../components/Numbers";
import { getUserById, getActiveNumbers } from "../Functions/forBackend";
import WebApp from "@twa-dev/sdk";
import Overlay from "../components/Overlay";
import CounterSSE from "../components/hhhhhhhhh"
function Layout() {

  const [me, setMe] = useState(null);
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [tg, setTg] = useState("")
  const [modal, setModal] = useState({ type: "loader", messege: "" }) //node loader overlay


  useEffect(() => {
    WebApp.ready();      // 🔑 muhim
    WebApp.expand();

    const u = WebApp.initDataUnsafe?.user || null;
    setTg(u.id)  // u.id || 8574151650 || 5672285896
    if (!u) {
      // setModal({ type: "loader", message: "Iltimos telegram orqali oching" });
    } else {
      console.log("Logged in (Telegram WebApp)");
    }
    (async () => {
      try {
        const userData = await getUserById(tg);
        setMe(userData?.data);
        userData?.data && setModal({ type: null, messege: "" })

        if (userData.data?.setle_phones?.length) {
          const active = await getActiveNumbers(userData.data.setle_phones);
          setActiveNumbers(active || []);
        } else {
          console.log("Userda raqamlar mavjud emas");
        }
      } catch (err) {
        console.error("Backend xatolik:", err);
        setModal({ type: "note", message: "Server bilan bog‘lanishda xatolik" });
      }
    })();
  }, [tg]);
  useEffect(() => {
    if (modal.type === "note") {
      const timer = setTimeout(() => {
        setModal({ type: null, message: "" });
      }, 2500); // 2.5 soniya

      return () => clearTimeout(timer);
    }
  }, [modal.type]);
  return (
    <>
      <Overlay modal={modal} />
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
        {/* USER FAOL */}
        {me && me.isActive && me?.number && (
          <Numbers activeNumbers={activeNumbers} />
        )}
        {!me?.isActive || <div className="flex rounded-lg overflow-hidden w-75 mx-auto mb-4">
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

        </div>}

      </header >
      <main className="card mt-8">
        {
          (me?.isActive && <Outlet context={{ me, activeNumbers, setModal, modal }} />) || <p className="text-center">Bu dasturdan active bo'lsangiz foydalana olasiz !</p>
        }

      </main>
      <CounterSSE />

      <footer className="fixed bottom-0 left-0 w-full bg-white text-center py-2 shadow-md">khudoyberduyev &copy;</footer>
    </>
  );
}

export { Layout };
