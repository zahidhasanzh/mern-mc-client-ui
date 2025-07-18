import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { CouponTypeData } from "@/lib/types";
import { getItemTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";

const TAXES_PERCENTAGE = 15;
const DELIVERY_CHARGES = 2;

const OrderSumary = ({handleCouponCodeChange}: {handleCouponCodeChange: (code:string) => void}) => {
  const searchParam = useSearchParams();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const couponCodeRef = useRef<HTMLInputElement>(null);

  const cart = useAppSelector((state) => state.cart.cartItems);

  const subTotal = React.useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subTotal * discountPercentage) / 100);
  }, [subTotal, discountPercentage]);

  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discountAmount;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
  }, [subTotal, discountAmount]);

  const grandWithDiscountTotal = useMemo(() => {
    return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
  }, [subTotal, discountAmount, taxesAmount, DELIVERY_CHARGES]);

  const grandWithoutDiscountTotal = useMemo(() => {
    return subTotal + taxesAmount + DELIVERY_CHARGES;
  }, [subTotal, taxesAmount, DELIVERY_CHARGES]);

  const { mutate, isPending} = useMutation({
    mutationKey: ["couponCode"],
    mutationFn: async () => {
      if (!couponCodeRef.current) {
        return;
      }
      const restaurantId = searchParam.get("restaurantId");
      if (!restaurantId) {
        return;
      }
      const data: CouponTypeData = {
        code: couponCodeRef.current.value,
        tenantId: restaurantId,
      };
      return await verifyCoupon(data).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.valid) {
        setDiscountError("");
        handleCouponCodeChange(couponCodeRef.current ? couponCodeRef.current.value : '')
        setDiscountPercentage(data.discount);
        return;
      }
      setDiscountError("Coupon is invalid");
      handleCouponCodeChange("")
      setDiscountPercentage(0);
    },
    onError: (error: AxiosError<{ errors: { msg: string }[] }>) => {
      const message =
        error?.response?.data?.errors?.[0]?.msg || "Something went wrong";
      setDiscountError(message);
      setDiscountPercentage(0);
    },
  });
  const handleCouponValidation = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate();
  };

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
          <span className="font-bold flex flex-col items-end">
            <span
              className={discountPercentage ? "line-through text-gray-400" : ""}
            >
              {" "}
              ${grandWithoutDiscountTotal}
            </span>
            {discountPercentage ? (
              <span className="text-green-700">${grandWithDiscountTotal}</span>
            ) : null}
          </span>
        </div>
        {discountError && <div className="text-red-500">{discountError}</div>}
        {/* {isError && (
          <div className="text-red-500">
            {
              (
                error as AxiosError<{
                  errors: { msg: string }[];
                }>
              )?.response?.data?.errors?.[0]?.msg
            }
          </div>
        )} */}
        <div className="flex items-center gap-4">
          <Input
            id="coupon"
            type="code"
            className="w-full"
            placeholder="Coupon code"
            ref={couponCodeRef}
          />
          <Button onClick={handleCouponValidation} variant={"outline"}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                <span>Wait...</span>
              </span>
            ) : (
              "Apply"
            )}
          </Button>
        </div>

        <div className="text-right mt-6">
          <Button className="cursor-pointer">Place order</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSumary;
