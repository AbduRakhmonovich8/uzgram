import { useEffect, useMemo, useState } from "react";

export default function App() {
  const tg = window.Telegram?.WebApp;

  // useMemo orqali foydalanuvchi obyektini olish
  const user = useMemo(() => {
    return tg?.initDataUnsafe?.user || null;
  }, [tg]);

  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    if (user) {
      setStatus(`Logged in (Telegram ID: ${user.id})`);
      console.log("Telegram ID:", user.id);
      console.log("Username:", user.username);
    } else {
      setStatus("User topilmadi (initDataUnsafe.user yo‘q)");
    }
  }, [user]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>Status: {status}</h3>
      {user && (
        <p>
          👤 {user.first_name} {user.last_name} <br />
          🆔 Telegram ID: <b>{user.id}</b> <br />
          @{user.username || "username mavjud emas"}
        </p>
      )}
    </div>
  );
}








// import { useEffect, useState } from "react";
// import AddNumber from "./camponents/AddNumber";
// import { getUserById, getActiveNumbers } from "./funktions/forBackend";

// export default function App() {
//   const [tg] = useState();
//   const [me, setMe] = useState(null);
//   const [activeNumbers, setActiveNumbers] = useState([]);
//   const [status, setStatus] = useState("Initializing...");

//   useEffect(() => {
//     let u
//     try {
//       u = window.Telegram?.WebApp?.initDataUnsafe?.user || null;
//     } catch (e) {
//       alert(e.messege)
//     }
//     setStatus("Logged in (Telegram WebApp)");
//     alert(JSON.stringify(u));

//     (async () => {
//       try {
//         alert(u?.id)
//         const userData = await getUserById(u.id);
//         setMe(userData.data);
//         console.log(u);
//         if (userData.data?.setle_phones) {
//           const active = await getActiveNumbers(userData.data.setle_phones);
//           setActiveNumbers(active || []);
//           setStatus("Active numbers loaded");
//         }
//       } catch (err) {
//         console.error("Xatolik:", err);
//         setStatus("Xatolik yuz berdi");
//       }
//     })();
//   }, [tg]);

//   console.log({ me, activeNumbers, status });

//   return (
//     <>
//       {me && !me.isActive && (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           🔒 Siz admin orqali faollashtirilishingiz kerak. {me.username}
//           <br />
//           {me.number || "Siz raqamingizni ham botga yuboring, bizda mavjud emas"}
//         </div>
//       )}

//       {me && me.isActive && status === "Active numbers loaded" && (
//         <AddNumber
//           activeNumbers={activeNumbers}
//           me={me}
//         />
//       )}
//     </>
//   );

// }