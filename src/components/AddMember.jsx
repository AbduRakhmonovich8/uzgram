import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getGroupMembers, addUserToGroup } from "../Functions/forBackend.js"
function AddMember() {

  const { setModal, activeNumbers, modal } = useOutletContext();
  const [activeraqamlar1, setActiveRaqamlar] = useState(activeNumbers?.data);
  const [activeCurrentNumbers, setActiveCurrentNumbers] = useState([])
  const [addedUser, setAddedUser] = useState([]);


  useEffect(() => {
    setActiveRaqamlar(activeNumbers?.data)
  }, [activeNumbers?.data])

  // STEP (slider uchun)
  const [step, setStep] = useState(0);

  // TELEFON & AUTH
  const [members, setMembers] = useState(null);
  // REFS
  const [gender, setGender] = useState("aralash");
  const groupRef = useRef(null);
  const isolineRef = useRef(null);
  const indexRef = useRef(null);
  const numberRef = useRef(null);
  const groupRef1 = useRef(null);
  const perAccauntRef = useRef(null);


  // CAPTCHA STATE
  const [capA, setCapA] = useState(0);
  const [capB, setCapB] = useState(0);
  const [capAns, setCapAns] = useState("");
  const [capErr, setCapErr] = useState("");

  // CAPTCHA YARATISH
  function newCaptcha() {
    setCapA(Math.floor(Math.random() * 9) + 1);
    setCapB(Math.floor(Math.random() * 9) + 1);
    setCapAns("");
    setCapErr("");
  }
  // birinchi renderda captcha chiqsin
  useEffect(() => {
    newCaptcha();
    let arr = []
    if (activeraqamlar1) {
      for (const element of activeraqamlar1) {
        if (element.status == "active") {
          arr.push(element?.session_sring); // e'tibor: string yozilishi
        }
      }
      setActiveCurrentNumbers(arr)
    }
  }, [activeraqamlar1]);



  useEffect(() => {
    if (modal.type == "loader") {
      setModal({ type: null, message: "sdfhsdjfksdf" })
    }
    console.log("members ozgardi");
    if (members?.step == 0) {
      if (members?.status != 200) {
        setModal({ type: "note", message: members.data?.message })
      } else {
        setModal({ type: "note", message: "Olingan kantaktlar: " + members.meta.returned + " ta" })
        setStep(1);
      }
    }
  }, [members]);

  // 1-FORM SUBMIT (PHONE + CAPTCHA)
  async function handleSubmit1(e) {
    e.preventDefault();
    // CAPTCHA TEKSHIRISH
    if (Number(capAns) !== capA + capB) {
      setCapErr("❌ Captcha noto‘g‘ri. Qayta urinib ko‘ring.");
      newCaptcha();
      return;
    }

    const group = groupRef.current.value || "";
    const isoline = isolineRef.current.value || ""
    const index = indexRef.current.value || ""
    const number = numberRef.current.value || ""

    setModal({ type: "loader", message: "sdfhsdjfksdf" })
    try {
      const member1 = setMembers(await getGroupMembers(group, number, index, gender, isoline));
      console.log(member1);
      // setMembers(member1?.data)

    } catch (err) {
      console.error("Server error:", err);
      setCapErr("Server bilan bog'liq xato — qayta urinib ko‘ring.");
    }
  }




  // 2-FORM SUBMIT (CODE + 2FA)
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function handleSubmit2(e) {
    e.preventDefault();

    const group1 = groupRef1.current.value || "";
    const maxnumber = Number(perAccauntRef.current.value || 0);

    if (!members?.data?.length) return;
    if (!activeCurrentNumbers?.length) return;

    const baseDelay = activeCurrentNumbers.length > 1 ? 4000 : 8000;

    setStep(2);

    const alreadyAddedCount = addedUser.filter(x => x?.added === true).length;
    const canAdd = Math.max(0, maxnumber - alreadyAddedCount);

    const list = members.data.slice(0, canAdd);

    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      const session = activeCurrentNumbers[i % activeCurrentNumbers.length];

      const answare = await addUserToGroup(
        group1,
        value.user_id,
        value.accessHash,
        session,
        value.firstname,
        value.user_name
      );

      setAddedUser(prev => [...prev, answare]);
      setModal({ type: "note", message: `${answare.name}: ${answare.message}` });

      // ✅ haqiqiy kutish
      await sleep(baseDelay);
    }
  }


  return (
    <>

      <div className="flex w-85 overflow-x-hidden mx-auto">
        <div
          className={`flex w-255 transition-transform duration-300 ease-in-out
      ${step == 0 ? "translate-x-0" : ""}
      ${step == 1 ? "-translate-x-85" : ""}
      ${step == 2 ? "-translate-x-170" : ""}
    `}
        >
          {/* ================= FORM 1 ================= */}

          <form onSubmit={handleSubmit1} className="shadow-md rounded-lg p-4 w-85 space-y-3">
            <h2 className="text-lg text-white font-semibold">Telefon raqam</h2>

            <div>
              <label className="block text-white text-sm text-white font-medium mb-1">Odam olinadigan guruh linki</label>
              <input
                ref={groupRef}
                title="Telegram guruh linki"
                pattern="^(?:https?:\/\/)?t\.me\/[a-zA-Z0-9_]{5,32}\/?$"
                type="text"
                required
                placeholder="https://t.me/name"
                className="w-full text-white border-white text-white border rounded-md px-3 py-2 outline-none"
              />
            </div>

            {/* ===== GENDER ===== */}
            <div className="flex gap-4">
              <label className="text-white">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  value="erkak"
                  checked={gender === "erkak"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Erkak
              </label>

              <label className="text-white">
                <input
                  className="mr-1"

                  type="radio"
                  name="gender"
                  value="ayol"
                  checked={gender === "ayol"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Ayol
              </label>

              <label className="text-white">
                <input
                  className="mr-1"

                  type="radio"
                  name="gender"
                  value="aralash"
                  checked={gender === "aralash"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Aralash
              </label>
            </div>

            {/* ===== ONLINE / OFFLINE / ALL ===== */}
            <div>
              <label className="block text-white text-sm font-medium mt-5 mb-1">Hozirgi holatini tanlang:</label>
              <select
                ref={isolineRef}
                required
                defaultValue="all"
                className="w-full text-white border rounded-md px-3 py-2 outline-none"
              >
                <option value="aralash">Aralash</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* ===== INDEX (PAGINATION) ===== */}
            <div>
              <label className="block text-white text-sm font-medium mt-5 mb-1">Qaysi oraliqdan olinadi (index):</label>
              <select
                ref={indexRef}
                required
                defaultValue="1"
                className="w-full text-white backga border rounded-md px-3 py-2 outline-none"
              >
                <option className="text-black" value="1">1 – 100</option>
                <option className="text-black" value="2">101 – 200</option>
                <option className="text-black" value="3">201 – 300</option>
                <option className="text-black" value="4">301 – 400</option>
                <option className="text-black" value="5">401 – 500</option>
              </select>
              <p className="text-xs text-white text-gray-500 mt-1">
                Index = page. Masalan 2 tanlansa 1000 dan keyingi 1000 ta user olinadi.
              </p>
            </div>
            {/* ===== Active numbers ===== */}

            {activeraqamlar1 && (
              <div>
                <label className="block text-white text-sm font-medium mt-5 mb-1">
                  Odam olishda ishlatadigan akkaunt raqamni tanlang:
                </label>

                <select
                  ref={numberRef}
                  required
                  className="w-full text-white border rounded-md px-3 py-2 outline-none"
                >
                  {activeraqamlar1.map((opt, index) =>
                    opt.status === "active" ? (
                      <option key={index} value={opt.number}>
                        {opt.number}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
            )}

            {/* ===== CAPTCHA ===== */}
            <div>
              <label className="block text-white text-sm font-medium mt-5 mb-1">Captcha</label>

              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-gray-200 rounded font-mono">
                  {capA} + {capB} = ?
                </div>

                <button type="button" onClick={newCaptcha} className="text-blue-600 text-xl" title="Yangi captcha">
                  ↻
                </button>
              </div>

              <input
                type="number"
                value={capAns}
                onChange={(e) => setCapAns(e.target.value)}
                placeholder="Javob"
                className="mt-2 w-full text-white border rounded-md px-3 py-2 outline-none "
                required
              />
              {capErr && <p className="text-red-500 text-sm mt-1">{capErr}</p>}
            </div>

            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
              Odamlarni olish
            </button>
          </form>

          {/* ================= FORM 2 ================= */}
          <div className="result rounded-xl p-6 w-85 space-y-4 flex flex-col items-center text-center animate-fadeIn">
            {/* SUCCESS ICON */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="w-9 h-9 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-lg text-white font-semibold">A`zolar muvofaqiyatli olindi</h2>
            <p>{activeCurrentNumbers?.length * 45} tagacha a'zo qoshishingiz mumkin !</p>

            {/* MESSAGE */}
            <div>
              <label className="block text-white text-left w-85 text-sm text-white font-medium mb-1">Odam qo'shiladigan guruh linki</label>
              <input
                ref={groupRef1}
                title="Telegram guruh linki"
                pattern="^(?:https?:\/\/)?t\.me\/[a-zA-Z0-9_]{5,32}\/?$"
                type="text"
                required
                placeholder="https://t.me/name"
                className="w-full text-white border rounded-md px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-white text-left w-85 text-sm text-white font-medium mb-1">Har bir nomerdan nechta odam qoshilsin? </label>
              <input
                ref={perAccauntRef}
                title="Telegram guruh linki"
                type="number"
                required
                max={activeCurrentNumbers.length * 45}
                min={1}
                placeholder={"1 < x < " + activeCurrentNumbers.length * 45}
                className="w-full text-white border rounded-md px-3 py-2 outline-none"
              />
            </div>
            <button
              onClick={() => { setStep(0); setMembers([]) }}
              className="z-5 mt-3 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Orqaga
            </button>
            <button
              onClick={handleSubmit2}
              className="z-5 mt-3 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Qo'shishni boshlash
            </button>
            <div className="overflow-hidden">
              <h1 className="z-0 bold">{members?.data?.length} ta a'zo olindi</h1>
              <ul>
                {members?.data?.map((elem, index) => {
                  return (<>
                    <li className="text-white" key={index}> {elem.firstname.length > 15 ? elem.firstname.slice(0, 15) + "..." : elem.firstname}</li>
                  </>)
                })}
              </ul>
            </div>
          </div>

          <div className="result  rounded-xl p-6 w-85 space-y-4 flex flex-col items-center text-center animate-fadeIn">
            {/* SUCCESS ICON */}
            {/* MESSAGE */}
            <button
              onClick={() => { setMembers([]); setStep(0); setAddedUser([]) }}
              className="mt-3 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Qo'shishni toxtatish
            </button>
            <h2 className="text-lg text-white font-semibold">A`zolar qoshilishi jarayoni !
            </h2>
            <div className="overflow-hidden">
              {addedUser && addedUser.map((e) => {
                return <p className="text-white"> {e.name.length > 15 ? e.name.slice(0, 15) + "..." : e.name}: {e.message}</p>
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddMember;
