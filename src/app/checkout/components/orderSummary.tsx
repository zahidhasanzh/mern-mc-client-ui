import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import React, { useMemo, useState } from "react";


const TAXES_PERCENTAGE = 15
const DELIVERY_CHARGES = 2
const OrderSumary = () => {
  const [discountPercentage, setDiscountPercentage] = useState(0)

  const cart = useAppSelector((state) => state.cart.cartItems);
  const subTotal = React.useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subTotal * discountPercentage) / 100);
  }, [subTotal, discountPercentage])

  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discountAmount;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100)
  }, [subTotal, discountAmount])

  const grandTotal = useMemo(() => {
    return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES
  }, [subTotal, discountAmount, taxesAmount, DELIVERY_CHARGES])

  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">${subTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">${taxesAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">${DELIVERY_CHARGES}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">${discountAmount}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold">${grandTotal}</span>
        </div>
        <div className="flex items-center gap-4">
          <Input
            id="fname"
            type="text"
            className="w-full"
            placeholder="Coupon code"
          />
          <Button variant={"outline"}>Apply</Button>
        </div>

        <div className="text-right mt-6">
          <Button className="cursor-pointer">Place order</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSumary;
