export async function getUserById(id) {
  const res = await fetch(`https://aracelis-svelte-mitigatedly.ngrok-free.dev/getUserByID?user_id=${id}`, {
    method: "GET",
    headers: { "Accept": "application/json", "ngrok-skip-browser-warning": "true", },
  });
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
  try {
    const res = await fetch(
      "https://aracelis-svelte-mitigatedly.ngrok-free.dev/tg/send-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ user_id, phone }),
      }
    );
    console.log(await res);
    if (!res.ok) {
      alert("Server xtoligi")
    }
    const data = await res.json();
    return { data };
  } catch (err) {
    alert("Tarmoq xatosi");
    return {
      data: {
        status: 404,
        error: true,
        message: err.message || "Network error"
      }
    };
  }
}
export async function sendAuth(
  user_id,
  phone,
  code,
  phoneCodeHash,
  stringSessionText,
  password
) {
  console.log({
    user_id,
    phone,
    code,
    phoneCodeHash,
    stringSessionText,
    password
  });

  try {
    const res = await fetch(
      "https://aracelis-svelte-mitigatedly.ngrok-free.dev/tg/verify-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          user_id,
          phone,
          code,
          phoneCodeHash,
          stringSessionText,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "sendAuth failed");
    }
    return { data };
  } catch (err) {
    alert("Tarmoq xatosi")
    return {
      data: {
        status: 404,
        error: true,
        message: err.message || "Network error",
      }
    };
  }
}

export async function getGroupMembers(group, number, index = 1, typegender = "aralash", isoline = "aralash") {
  if (!(group && group && index && typegender && isoline && number)) return { data: { status: 400, message: "Parametrlar to'lliqmas !" } }
  console.log(group, index, typegender, isoline, number);
  
  const res = await fetch("https://aracelis-svelte-mitigatedly.ngrok-free.dev/getGroupMenmers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify({ group, index, typegender, isoline, number }) // <-- obyektni stringga aylantirish
  });

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }

  const data = await res.json();
  return data;
}


