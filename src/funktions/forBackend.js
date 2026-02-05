

export async function getUserById(id) {
  const res = await fetch(`http://10.208.211.51:4000/getUserByID?user_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }  
  const data = await res.json();
  return data;
}

export async function getActiveNumbers(numbers) {
  const res = await fetch("http://10.208.211.51:4000/activeNumbers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ numbers }) // <-- obyektni stringga aylantirish
  });

  if (!res.ok) {
    throw new Error("Server xatolik: " + res.status);
  }

  const data = await res.json();
  return data;
}

