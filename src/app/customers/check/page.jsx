import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import Link from "next/link";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function CheckPage({ searchParams }) {
  const id = searchParams?.id;

  if (!id) {
    return (
      <>
        <div className="alert alert-success">更新しました</div>
        <div className="alert alert-warning">idが指定されていません</div>
        <Link className="btn btn-outline btn-accent" href="/customers">
          一覧に戻る
        </Link>
      </>
    );
  }

  const customerInfo = await fetchCustomer(id);

  return (
    <>
      <div className="alert alert-success">更新しました</div>

      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>

      <Link className="btn btn-outline btn-accent" href="/customers">
        一覧に戻る
      </Link>
    </>
  );
}
