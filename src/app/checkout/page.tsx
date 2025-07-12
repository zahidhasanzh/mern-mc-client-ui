
import { getSession } from "@/lib/session";


import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

export default async function Checkout({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) {
  const seesion = await getSession();

  const sParams = new URLSearchParams({
    restaurantId: searchParams.restaurantId,
  })
   const existingQueryString = sParams.toString()

  sParams.append(`return-to`, `/checkout?${existingQueryString}`)

  if (!seesion) {
    redirect(`/login?${sParams}`);
  }
  return (
    <CustomerForm/>
  );
}
