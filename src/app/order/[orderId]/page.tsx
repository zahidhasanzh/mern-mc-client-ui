import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import OrderStatus from "./components/orderStatus";
import { Button } from "@/components/ui/button";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { cookies } from "next/headers";
import { Order } from "@/lib/types";

const SingleOrder = async ({ params }: { params: { orderId: string } }) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/order/orders/${params.orderId}?fields=address,paymentStatus,paymentMode`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch single order");
  }

  const order: Order = await response.json();

  return (
    <div className="container mt-6 flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Order</CardTitle>
          <CardDescription>Track the order status</CardDescription>
        </CardHeader>

        <CardContent>
          <OrderStatus />
        </CardContent>
      </Card>

      <div className="flex gap-6">
        <Card className="w-1/3 gap-0">
          <CardHeader>
            <CardTitle className="flex items-start text-lg justify-between gap-12">
              Delivery Address
            </CardTitle>
          </CardHeader>
          <Separator className="border border-gray-100 mt-4"/>
          <CardContent className="pt-6">
            <h2 className="font-bold">{order.customerId.firstName + " " + order.customerId.lastName}</h2>
            <p className="mt-2">
              {order.address}
            </p>
          </CardContent>
        </Card>

        <Card className="w-2/3 gap-0">
          <CardHeader>
            <CardTitle className="flex items-start text-lg justify-between gap-12">
              Your order information
            </CardTitle>
          </CardHeader>
          <Separator className="border border-gray-100 mt-4"/>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={20} />
              <h2 className="text-base font-medium">Order reference: </h2>
             {order._id}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Banknote />
              <h2 className="text-base font-medium">Payment status: </h2>
              <span>{order.paymentStatus.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Coins size={20} />
              <h2 className="text-base font-medium">Payment method: </h2>
              <span>{order.paymentMode.toUpperCase()}</span>
            </div>

            <Button variant={"destructive"} className="mt-6">
              Cancel Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleOrder;
