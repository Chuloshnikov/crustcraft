"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { AddressFields } from "@/lib/validation";
import { Button } from "@/components/ui/button";

type AddressInputsProps = {
  addressFields: AddressFields;
  setAddressFields: React.Dispatch<React.SetStateAction<AddressFields>>;
  errors?: Partial<Record<keyof AddressFields, string>>;
  addressLoading: boolean;
  changeAddress: () => void;
};

const AddressInputs = ({
  addressFields,
  setAddressFields,
  errors = {},
  addressLoading,
  changeAddress,
}: AddressInputsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressFields((prev: AddressFields) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-1">
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number (e.g. +1234567890)"
          value={addressFields.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
      <div className="space-y-1 sm:col-span-2">
        <Input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={addressFields.streetAddress}
          onChange={handleChange}
        />
        {errors.streetAddress && <p className="text-sm text-red-500">{errors.streetAddress}</p>}
      </div>
      <div className="space-y-1">
        <Input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={addressFields.postalCode}
          onChange={handleChange}
        />
        {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
      </div>
      <div className="space-y-1">
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={addressFields.city}
          onChange={handleChange}
        />
        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
      </div>
      <div className="space-y-1 sm:col-span-2">
        <Input
          type="text"
          name="country"
          placeholder="Country"
          value={addressFields.country}
          onChange={handleChange}
        />
        {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
      </div>
      <Button
        type="button"
        disabled={addressLoading}
        onClick={changeAddress}
        className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
      >
        {addressLoading ? "Changing address" : "Change delivery data"}
      </Button>
    </div>
  );
};

export default AddressInputs;