import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { sendPhone, sendAuth } from "../Functions/forBackend";

function AddNumber() {
  const { me } = useOutletContext();

  // STEP (slider uchun)
  const [step, setStep] = useState(true);

  // TELEFON & AUTH
  const [phone, setPhone] = useState("");
  const [auth, setAuth] = useState(null);

  // CAPTCHA STATE
  const [capA, setCapA] = useState(0);
  const [capB, setCapB] = useState(0);
  const [capAns, setCapAns] = useState("");
  const [capErr, setCapErr] = useState("");

  // REFS
  const phoneRef = useRef(null);
  const codeRef = useRef(null);
  const twoFaRef = useRef(null);

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
    setStep(false);

    const res = await sendPhone(me?.user_id, phoneValue);
    setAuth(res);
  }

  // 2-FORM SUBMIT (CODE + 2FA)
  async function handleSubmit2(e) {
    e.preventDefault();

    const code = codeRef.current?.value || "";
    const twoFa = twoFaRef.current?.value || "";

    const res = await sendAuth(
      me?.user_id,
      phone,
      code,
      auth?.phoneCodeHash,
      auth?.sessionString,
      twoFa
    );

    alert("✅ Session saqlandi: " + res?.session);
  }

  return (
    <>
      <div className="flex w-[340px] overflow-x-hidden mx-auto">
        <div
          className={`flex w-[680px] transition-transform duration-300 ease-in-out ${!step ? "-translate-x-[340px]" : ""
            }`}
        >
          {/* ================= FORM 1 ================= */}
          <form
            onSubmit={handleSubmit1}
            className="bg-white shadow-md rounded-lg p-4 w-[340px] space-y-3"
          >
            <h2 className="text-lg font-semibold">Telefon raqam</h2>

            <div>
              <label className="block text-sm font-medium mb-1">
                Telefon raqam
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Captcha
              </label>

              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-gray-200 rounded font-mono">
                  {capA} + {capB} = ?
                </div>

                <button
                  type="button"
                  onClick={newCaptcha}
                  className="text-blue-600 text-sm"
                  title="Yangi captcha"
                >
                  ↻
                </button>
              </div>

              <input
                type="number"
                value={capAns}
                onChange={(e) => setCapAns(e.target.value)}
                placeholder="Javob"
                className="mt-2 w-full border rounded-md px-3 py-2 outline-none"
                required
              />

              {capErr && (
                <p className="text-red-500 text-sm mt-1">{capErr}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Kod yuborish
            </button>
          </form>

          {/* ================= FORM 2 ================= */}
          <form
            onSubmit={handleSubmit2}
            className="bg-white shadow-md rounded-lg p-4 w-[340px] space-y-3"
          >
            <h2 className="text-center text-lg font-semibold">Tasdiqlash kodi {phone} naqamga jo'natildi</h2>

            <div>
              <label className="block text-sm font-medium mb-1">
                Telegram kodi
              </label>
              <input
                ref={codeRef}
                type="text"
                required
                placeholder="12345"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                2 bosqichli parol (agar bo‘lsa)
              </label>
              <input
                ref={twoFaRef}
                type="password"
                placeholder="Parol"
                className="w-full border rounded-md px-3 py-2 outline-none"
              />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md" onClick={() => { setStep(true), newCaptcha() }}>
              Edit Number
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Tasdiqlash
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNumber;
