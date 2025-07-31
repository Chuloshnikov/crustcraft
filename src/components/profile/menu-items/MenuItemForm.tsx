"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Plus,
  Minus,
  Save,
  AlertCircle,
  CheckCircle,
  Pizza,
  DollarSign,
  Tag,
  FileText,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MenuItemFormData, MenuItemSchema } from "@/lib/validation"
import MenuItemImageUpload from "./MenuItemImageUpload"


interface SizeOption {
  name: string
  price: number
}

interface ExtraIngredient {
  name: string
  price: number
}

interface Category {
  _id: string
  name: string
}

interface MenuItemFormProps {
  mode: "create" | "edit"
  itemId?: string
  initialData?: {
    image?: string
    name?: string
    description?: string
    basePrice?: string
    category?: string
    sizes?: SizeOption[]
    extraIngredients?: ExtraIngredient[]
  }
  categories?: Category[]
  onSuccessRedirect?: string
}

export function MenuItemForm({
  mode = "create",
  itemId = "",
  initialData = {},
  categories = [],
  onSuccessRedirect = "/profile",
}: MenuItemFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(MenuItemSchema),
    defaultValues: {
      image: initialData.image || null,
      name: initialData.name || "",
      description: initialData.description || "",
      basePrice: initialData.basePrice ? parseFloat(initialData.basePrice) : 0,
      category: initialData.category || "",
      sizes: initialData.sizes || [],
      extraIngredients: initialData.extraIngredients || [],
    },
  })

  const formValues = watch()

  const addSize = () => {
    const currentSizes = formValues.sizes || []
    setValue("sizes", [...currentSizes, { name: "", price: 0 }])
  }

  const removeSize = (index: number) => {
    const currentSizes = formValues.sizes || []
    setValue("sizes", currentSizes.filter((_, i) => i !== index))
  }

  const updateSize = (index: number, field: keyof SizeOption, value: string | number) => {
    const currentSizes = formValues.sizes || []
    const updatedSizes = currentSizes.map((size, i) =>
      i === index ? { ...size, [field]: field === "price" ? Number(value) : value } : size
    )
    setValue("sizes", updatedSizes)
  }

  const addExtraIngredient = () => {
    const currentIngredients = formValues.extraIngredients || []
    setValue("extraIngredients", [...currentIngredients, { name: "", price: 0 }])
  }

  const removeExtraIngredient = (index: number) => {
    const currentIngredients = formValues.extraIngredients || []
    setValue("extraIngredients", currentIngredients.filter((_, i) => i !== index))
  }

  const updateExtraIngredient = (index: number, field: keyof ExtraIngredient, value: string | number) => {
    const currentIngredients = formValues.extraIngredients || []
    const updatedIngredients = currentIngredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: field === "price" ? Number(value) : value } : ingredient
    )
    setValue("extraIngredients", updatedIngredients)
  }


  async function handleFormSubmit(data: MenuItemFormData) {
    setIsLoading(true)
    setError("")

    try {
      const savingPromise = new Promise<void>(async (resolve, reject) => {
        try {
          const response = await fetch("/api/menu-items", {
            method: mode === "create" ? "POST" : "PUT",
            body: JSON.stringify({ ...data, itemId }),
            headers: { "Content-Type": "application/json" },
          })

          if (response.ok) {
            resolve()
          } else {
            const errorData = await response.json()
            reject(new Error(errorData.message || "Failed to save menu item"))
          }
        } catch (err) {
          reject(err)
        }
      })

      toast.promise(savingPromise, {
        loading: "Saving menu item...",
        success: "Menu item saved successfully!",
        error: (err) => err.message || "Error saving menu item",
      })

      setIsSuccess(true)
      setTimeout(() => {
        redirect(onSuccessRedirect)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save menu item")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const deletePromise = fetch(`/api/menu-items?id=${itemId}`, {
        method: "DELETE",
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete menu item")
        }
      })

      toast.promise(deletePromise, {
        loading: "Deleting menu item...",
        success: "Menu item deleted successfully!",
        error: "Failed to delete menu item",
      })

      setIsSuccess(true)
      setTimeout(() => {
        redirect(onSuccessRedirect)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete menu item")
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }
  console.log(formValues.image);
  console.log(formValues.name);

  if (isSuccess) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isDeleting ? "Menu Item Deleted!" : mode === "create" ? "Menu Item Created!" : "Menu Item Updated!"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isDeleting
                ? "The menu item has been successfully removed from your menu."
                : mode === "create"
                ? "Your new menu item has been successfully added to the menu."
                : "Your menu item has been successfully updated."}
            </p>
            <Link href={onSuccessRedirect}>
              <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Back to Menu Items
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const formTitle = mode === "create" ? "Create New Menu Item" : "Edit Menu Item"
  const formDescription = mode === "create" ? "Add a new delicious item to your menu" : "Update your menu item details"
  const submitButtonText = mode === "create" ? "Create Menu Item" : "Update Menu Item"

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href={onSuccessRedirect}>
              <Button variant="outline" className="cursor-pointer border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu Items
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <Pizza className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{formTitle}</h1>
            </div>
            <p className="text-gray-600">{formDescription}</p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Image Upload */}
              <MenuItemImageUpload 
              image={formValues.image || null} 
              setValue={setValue}  
              />

              {/* Basic Information */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Item Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="e.g., Margherita Pizza"
                          className="h-12"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formValues.category}
                          onValueChange={(value) => setValue("category", value)}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Describe your delicious menu item..."
                        className="min-h-24 resize-none"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="basePrice">
                        Base Price ($) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="basePrice"
                          type="number"
                          step="0.01"
                          min="0"
                          {...register("basePrice", { valueAsNumber: true })}
                          placeholder="0.00"
                          className="pl-10 h-12"
                        />
                      </div>
                      {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice.message}</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Size Options */}
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-orange-600" />
                  Size Options
                </CardTitle>
                <Button className="cursor-pointer" type="button" onClick={addSize} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </CardHeader>
              <CardContent>
                {formValues.sizes?.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No size options added yet</p>
                ) : (
                  <div className="space-y-4">
                    {formValues.sizes?.map((size, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Size name (e.g., Small, Medium, Large)"
                            value={size.name}
                            onChange={(e) => updateSize(index, "name", e.target.value)}
                          />
                          {errors.sizes?.[index]?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.sizes[index]?.name?.message}</p>
                          )}
                        </div>
                        <div className="w-32">
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={size.price}
                              onChange={(e) => updateSize(index, "price", e.target.value)}
                              className="pl-8"
                            />
                          </div>
                          {errors.sizes?.[index]?.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.sizes[index]?.price?.message}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeSize(index)}
                          variant="outline"
                          size="sm"
                          className="cursor-pointer text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Extra Ingredients */}
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-orange-600" />
                  Extra Ingredients
                </CardTitle>
                <Button className="cursor-pointer" type="button" onClick={addExtraIngredient} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
              </CardHeader>
              <CardContent>
                {formValues.extraIngredients?.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No extra ingredients added yet</p>
                ) : (
                  <div className="space-y-4">
                    {formValues.extraIngredients?.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Ingredient name (e.g., Extra Cheese, Pepperoni)"
                            value={ingredient.name}
                            onChange={(e) => updateExtraIngredient(index, "name", e.target.value)}
                          />
                          {errors.extraIngredients?.[index]?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.extraIngredients[index]?.name?.message}</p>
                          )}
                        </div>
                        <div className="w-32">
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={ingredient.price}
                              onChange={(e) => updateExtraIngredient(index, "price", e.target.value)}
                              className="pl-8"
                            />
                          </div>
                          {errors.extraIngredients?.[index]?.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.extraIngredients[index]?.price?.message}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeExtraIngredient(index)}
                          variant="outline"
                          size="sm"
                          className="cursor-pointer text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              {/* Delete Button (only for edit mode) */}
              <div>
                {mode === "edit" && (
                  <>
                    {!showDeleteConfirm ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="cursor-pointer border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Item
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Are you sure?</span>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-4">
                <Link href={onSuccessRedirect}>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {submitButtonText}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}