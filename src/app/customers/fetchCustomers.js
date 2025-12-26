export default async function fetchCustomers() {
  const base = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const url = `${base}/allcustomers`;

  console.log("API base:", base);
  console.log("FETCH URL:", url);

  const res = await fetch(url, { cache: "no-cache" });

  console.log("FETCH STATUS:", res.status);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  return res.json();
}