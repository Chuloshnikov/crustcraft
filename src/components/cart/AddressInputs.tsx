import React from "react"
import { Input } from "@/components/ui/input"
import { AddressFields } from "@/lib/validators/address-fields"
import { z } from "zod"

const addressSchema = z.object({
  phone: z.string().refine((val) => !val || /^\+\d{10,15}$/.test(val), { 
    message: "Phone must be in international format (e.g. +1234567890)" 
  }),
  streetAddress: z.string().min(1, "Street address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
})

type AddressInputsProps = {
  addressFields: AddressFields
  setAddressFields: React.Dispatch<React.SetStateAction<AddressFields>>
  errors?: Partial<Record<keyof AddressFields, string>>
}

const AddressInputs = ({
  addressFields,
  setAddressFields,
  errors = {},
}: AddressInputsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressFields((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
    </div>
  )
}

export default AddressInputs