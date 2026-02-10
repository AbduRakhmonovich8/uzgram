import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getGroupMembers } from "../Functions/forBackend.js"
function AddMember() {

  const { setModal, activeNumbers, modal } = useOutletContext();
  const [activeraqamlar1, setActiveRaqamlar] = useState(activeNumbers?.data);

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
  }, []);
  useEffect(() => {
    if (modal.type == "loader") {
      console.log("true");
      setModal({ type: null, message: "sdfhsdjfksdf" })
    }
    console.log("members ozgardi");
    console.log(members);
    if (members?.step == 0) {
      if (members?.status != 200) {
        setModal({ type: "note", message: members.data?.message })
      } else {
        setModal({type:"note",message:"Olingan kantaktlar: "+members.meta.returned+" ta"})
        setStep(1);
      }
    }
    // if (members?.data.step == 1) {
    //   if (auth2.data.status != 200) {
    //     setModal({ type: "note", message: auth2?.data.message })
    //   } else {
    //     setStep(2)
    //     h2Ref.current.innerText = phoneRef.current.value + "\nMuvaffaqiyatli qo‘shildi";
    //   }
    // }





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
  async function handleSubmit2(e) {
    e.preventDefault();

    // const code = codeRef.current?.value;
    // const twoFa = twoFaRef.current?.value;
    // if (auth?.data?.step == 0) {
    //   try {
    //     setAuth2(await sendAuth(
    //       me?.user_id,

    //       code,
    //       auth?.data?.phoneCodeHash,
    //       auth?.data?.sessionString,members     twstep    //     ));
    //   } catch (e) {
    //     console.log("Server bilan xatolik" + e.message);
    //   }
    // } else {
    //   setTimeout(() => {
    //     alert("Qaytadan boshlash")
    //   }, 2500);
    // }
  }
  //3 - final new handle
  function newForm() {
    // phoneRef.current.value = ""
    // codeRef.current.value = ""
    // twoFaRef.current.value = ""
    // h2Ref.current.value = ""
    // setStep(0)
    // setAuth(null)
    // setAuth2(null)
    // newCaptcha();
  }




  console.log(members);
  
  members?.data && members.data.map((elem) => {
    console.log(elem)
  })

  return (
    <>
      <div className="flex w-85 overflow-x-hidden mx-auto mb-30">
        <div
          className={`flex w-255 transition-transform duration-300 ease-in-out
      ${step === 0 ? "translate-x-0" : ""}
      ${step === 1 ? "-translate-x-85" : ""}
      ${step === 2 ? "-translate-x-170" : ""}
    `}
        >
          {/* ================= FORM 1 ================= */}
          <form onSubmit={handleSubmit1} className="bg-white shadow-md rounded-lg p-4 w-85 space-y-3">
            <h2 className="text-lg font-semibold">Telefon raqam</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Odam olinadigan guruh linki</label>
              <input
                ref={groupRef}
                title="Telegram guruh linki"
                pattern="^(?:https?:\/\/)?t\.me\/[a-zA-Z0-9_]{5,32}\/?$"
                type="text"
                required
                placeholder="https://t.me/name"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            {/* ===== GENDER ===== */}
            <div className="flex gap-4">
              <label>
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

              <label>
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

              <label>
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
              <label className="block text-sm font-medium mt-5 mb-1">Hozirgi holatini tanlang:</label>
              <select
                ref={isolineRef}
                required
                defaultValue="all"
                className="w-full border rounded-md px-3 py-2 outline-none"
              >
                <option value="aralash">Aralash</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* ===== INDEX (PAGINATION) ===== */}
            <div>
              <label className="block text-sm font-medium mt-5 mb-1">Qaysi oraliqdan olinadi (index):</label>
              <select
                ref={indexRef}
                required
                defaultValue="1"
                className="w-full border rounded-md px-3 py-2 outline-none"
              >
                <option value="1">1 – 1000</option>
                <option value="2">1001 – 2000</option>
                <option value="3">2001 – 3000</option>
                <option value="4">3001 – 4000</option>
                <option value="5">4001 – 5000</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Index = page. Masalan 2 tanlansa 1000 dan keyingi 1000 ta user olinadi.
              </p>
            </div>
            {/* ===== Active numbers ===== */}

            {activeraqamlar1 && (
              <div>
                <label className="block text-sm font-medium mt-5 mb-1">
                  Odam olishda ishlatadigan akkaunt raqamni tanlang:
                </label>

                <select
                  ref={numberRef}
                  required
                  className="w-full border rounded-md px-3 py-2 outline-none"
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
              <label className="block text-sm font-medium mt-5 mb-1">Captcha</label>

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
                className="mt-2 w-full border rounded-md px-3 py-2 outline-none "
                required
              />
              {capErr && <p className="text-red-500 text-sm mt-1">{capErr}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
              Kod yuborish
            </button>
          </form>

          {/* ================= FORM 2 ================= */}
          <div className="result bg-white shadow-lg rounded-xl p-6 w-85 space-y-4 flex flex-col items-center text-center animate-fadeIn">
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
            <h2 className="text-lg font-semibold">A`zolar muvofaqiyatli olindi</h2>

            {/* MESSAGE */}
            <div>
              <label className="block text-left w-85 text-sm font-medium mb-1">Odam qo'shiladigan guruh linki</label>
              <input
                // ref={groupRef}
                title="Telegram guruh linki"
                pattern="^(?:https?:\/\/)?t\.me\/[a-zA-Z0-9_]{5,32}\/?$"
                type="text"
                required
                placeholder="https://t.me/name"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-left w-85 text-sm font-medium mb-1">Har bir nomerdan nechta odam qoshilsin? </label>
              <input
                // ref={groupRef}
                title="Telegram guruh linki"
                type="number"
                required
                max={40}
                min={1}
                placeholder="1 < x < 40 "
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            {/* OPTIONAL BUTTON */}
            <button
              onClick={newForm}
              className="mt-3 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Qo'shishni boshlash
            </button>


          </div>


        </div>
      </div>
    </>
  );
}

export default AddMember;
