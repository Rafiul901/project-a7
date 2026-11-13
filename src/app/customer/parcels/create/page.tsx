
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createParcelSchema,
  type CreateParcelFormValues,
} from "@/lib/validations/parcel.validation";

import { useCreateParcel } from "@/hooks/use-parcels";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  "Receiver Information",
  "Delivery Addresses",
  "Parcel Details",
];

export default function CreateParcelPage() {
  const [currentStep, setCurrentStep] = useState(0);
const createParcelMutation = useCreateParcel();

const form = useForm<CreateParcelFormValues>({
  resolver: zodResolver(createParcelSchema),
  defaultValues: {
    receiverName: "",
    receiverPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: 0,
    deliveryFee: 0,
  },
});
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Send a Parcel
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete the steps below to book your delivery.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Step {currentStep + 1} of {steps.length}
            </CardTitle>
            <CardDescription>
              {steps[currentStep]}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-8 flex gap-2">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    index <= currentStep
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>


<form
  onSubmit={form.handleSubmit((values) => {
    createParcelMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
        setCurrentStep(0);
      },
    });
  })}
  className="space-y-6"
>
  {currentStep === 0 && (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Receiver Information
      </h3>

      <div className="space-y-2">
        <Label htmlFor="receiverName">Receiver Name</Label>
        <Input
          id="receiverName"
          placeholder="Enter receiver's full name"
          {...form.register("receiverName")}
        />
        {form.formState.errors.receiverName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.receiverName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="receiverPhone">Receiver Phone</Label>
        <Input
          id="receiverPhone"
          placeholder="01XXXXXXXXX"
          {...form.register("receiverPhone")}
        />
        {form.formState.errors.receiverPhone && (
          <p className="text-sm text-destructive">
            {form.formState.errors.receiverPhone.message}
          </p>
        )}
      </div>
    </div>
  )}

  {currentStep === 1 && (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Pickup & Delivery Addresses
      </h3>

      <div className="space-y-2">
        <Label htmlFor="pickupAddress">Pickup Address</Label>
        <Input
          id="pickupAddress"
          placeholder="Enter pickup address"
          {...form.register("pickupAddress")}
        />
        {form.formState.errors.pickupAddress && (
          <p className="text-sm text-destructive">
            {form.formState.errors.pickupAddress.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryAddress">Delivery Address</Label>
        <Input
          id="deliveryAddress"
          placeholder="Enter delivery address"
          {...form.register("deliveryAddress")}
        />
        {form.formState.errors.deliveryAddress && (
          <p className="text-sm text-destructive">
            {form.formState.errors.deliveryAddress.message}
          </p>
        )}
      </div>
    </div>
  )}

  {currentStep === 2 && (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Parcel Details
      </h3>

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (KG)</Label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          min="0.1"
          {...form.register("weight", { valueAsNumber: true })}
        />
        {form.formState.errors.weight && (
          <p className="text-sm text-destructive">
            {form.formState.errors.weight.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryFee">Delivery Fee (BDT)</Label>
        <Input
          id="deliveryFee"
          type="number"
          min="1"
          step="1"
          {...form.register("deliveryFee", { valueAsNumber: true })}
        />
        {form.formState.errors.deliveryFee && (
          <p className="text-sm text-destructive">
            {form.formState.errors.deliveryFee.message}
          </p>
        )}
      </div>
    </div>
  )}

  <div className="flex justify-between pt-4">
    <Button
      type="button"
      variant="outline"
      disabled={currentStep === 0}
      onClick={() => setCurrentStep((previous) => previous - 1)}
    >
      Previous
    </Button>

    {currentStep < steps.length - 1 ? (
      <Button
        type="button"
        onClick={async () => {
          const fields = [
            ["receiverName", "receiverPhone"],
            ["pickupAddress", "deliveryAddress"],
          ] as const;

          const isValid = await form.trigger(fields[currentStep]);

          if (isValid) {
            setCurrentStep((previous) => previous + 1);
          }
        }}
      >
        Next
      </Button>
    ) : (
      <Button
        type="submit"
        disabled={createParcelMutation.isPending}
      >
        {createParcelMutation.isPending
          ? "Creating Parcel..."
          : "Create Parcel"}
      </Button>
    )}
  </div>
</form>



          </CardContent>
        </Card>
      </div>
    </div>
  );
}
