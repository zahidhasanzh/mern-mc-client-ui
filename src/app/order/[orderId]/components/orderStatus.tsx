"use client";

import { Step, StepItem, Stepper } from "@/components/stepper";
import {
  CheckCheck,
  FileCheck,
  Microwave,
  Package,
  PackageCheck,
} from "lucide-react";

import React from "react";

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

const OrderStatus = () => {
  return (
    <Stepper initialStep={3} steps={steps} variant="circle-alt">
      {steps.map(({ label, icon }) => (
        <Step key={label} icon={icon} checkIcon={icon} label={label}></Step>
      ))}
    </Stepper>
  );
};

export default OrderStatus;
