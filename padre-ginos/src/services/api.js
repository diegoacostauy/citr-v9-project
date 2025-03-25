export const getPastOrders = async (page) => {
  const res = await fetch(`/api/past-orders?page=${page}`)
  const data = await res.json();
  return data;
}

export const getPastOrder = async (id) => {
  const res = await fetch(`/api/past-order/${id}`)
  const data = await res.json();
  return data;
}

export async function postContact({ name, email, message }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok. Send help!.");
  }

  return res.json();
}
