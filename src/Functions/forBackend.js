export async function getUserById(id) {
  const res = await fetch(`https://aracelis-svelte-mitigatedly.ngrok-free.dev/getUserByID?user_id=${id}`, {
    method: "GET",
    headers: { "Accept": "application/json", "ngrok-skip-browser-warning": "true", },
  });

  console.log(await res);

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }
  const data = await res.json();
  return data;
}

export async function getActiveNumbers(numbers) {
  const res = await fetch("https://aracelis-svelte-mitigatedly.ngrok-free.dev/activeNumbers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify({ numbers }) // <-- obyektni stringga aylantirish
  });

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }

  const data = await res.json();
  return data;
}

export async function sendPhone(user_id, phone) {
  const res = await fetch("https://aracelis-svelte-mitigatedly.ngrok-free.dev/tg/send-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify({ phone, user_id }) // <-- obyektni stringga aylantirish
  });

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }

  const data = await res.json();
  return data;
}
export async function sendAuth(user_id, phone, code, phoneCodeHash, stringSessionText, password) {
  const res = await fetch("https://aracelis-svelte-mitigatedly.ngrok-free.dev/tg/verify-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify({ user_id, phone, code, phoneCodeHash, stringSessionText, password }) // <-- obyektni stringga aylantirish
  });

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }

  const data = await res.json();
  return data;
}


