"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// 1. useSearchParams を使用するロジックを別のコンポーネントに分離
function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!customer_id) return;

    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(customer_id);
      setCustomer(customerData);
    };
    fetchAndSetCustomer();
  }, [customer_id]);

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      {customer && <OneCustomerInfoCard {...customer} />}
      <button onClick={() => router.push("./../../customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

// 2. メインの Page コンポーネントで Suspense 境界を提供
export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="m-4">読み込み中...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
