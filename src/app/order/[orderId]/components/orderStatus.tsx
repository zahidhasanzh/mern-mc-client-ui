"use client";

import { Step, StepItem, Stepper, useStepper } from "@/components/stepper";
import {
  CheckCheck,
  FileCheck,
  Microwave,
  Package,
  PackageCheck,
} from "lucide-react";

import React, { useEffect } from "react";

const steps = [
  {
    label: "Received",
    icon: FileCheck,
    description: "We are confirming your order",
  },
  {
    label: "Confirmed",
    icon: Package,
    description: "We have started preparing your order",
  },
  { label: "Prepared", icon: Microwave, description: "Ready for the pickup" },
  {
    label: "Out for delivery",
    icon: PackageCheck,
    description: "Driver is on the way",
  },
  { label: "Delivered", icon: CheckCheck, description: "Order completed" },
] satisfies StepItem[];

const StepperChanger = () => {
  const {setStep, nextStep} = useStepper();
  useEffect(() => {
    setInterval(() => {
      nextStep()
    }, 2000)
  }, [])
  return <></>
}

const OrderStatus = () => {
  return (
    <Stepper initialStep={0} steps={steps} variant="circle-alt">
      {steps.map(({ label, icon }) => (
        <Step key={label} icon={icon} checkIcon={icon} label={label}></Step>
      ))}

      <StepperChanger/>
    </Stepper>
  );
};

export default OrderStatus;
