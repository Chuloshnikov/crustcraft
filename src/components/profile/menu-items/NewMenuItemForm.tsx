"use client"

import type React from "react"

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
  Upload,
  Plus,
  Minus,
  Save,
  AlertCircle,
  CheckCircle,
  Pizza,
  DollarSign,
  Tag,
  FileText,
  Camera,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SizeOption {
  name: string
  price: number
}

interface ExtraIngredient {
  name: string
  price: number
}

export function NewMenuItemForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [category, setCategory] = useState("")
  const [sizes, setSizes] = useState<SizeOption[]>([])
  const [extraIngredients, setExtraIngredients] = useState<ExtraIngredient[]>([])

  // Categories from API
  const [categories, setCategories] = useState([
    { _id: "1", name: "Pizza" },
    { _id: "2", name: "Appetizers" },
    { _id: "3", name: "Salads" },
    { _id: "4", name: "Pasta" },
    { _id: "5", name: "Desserts" },
    { _id: "6", name: "Beverages" },
  ])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSize = () => {
    setSizes([...sizes, { name: "", price: 0 }])
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const updateSize = (index: number, field: keyof SizeOption, value: string | number) => {
    const updatedSizes = sizes.map((size, i) =>
      i === index ? { ...size, [field]: field === "price" ? Number(value) : value } : size,
    )
    setSizes(updatedSizes)
  }

  const addExtraIngredient = () => {
    setExtraIngredients([...extraIngredients, { name: "", price: 0 }])
  }

  const removeExtraIngredient = (index: number) => {
    setExtraIngredients(extraIngredients.filter((_, i) => i !== index))
  }

  const updateExtraIngredient = (index: number, field: keyof ExtraIngredient, value: string | number) => {
    const updatedIngredients = extraIngredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: field === "price" ? Number(value) : value } : ingredient,
    )
    setExtraIngredients(updatedIngredients)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Basic validation
      if (!name || !description || !basePrice || !category) {
        throw new Error("Please fill in all required fields")
      }

      if (Number(basePrice) <= 0) {
        throw new Error("Base price must be greater than 0")
      }

      // Simulate successful save
      setIsSuccess(true)
      setTimeout(() => {
        // Redirect to menu items list
        window.location.href = "/admin/menu-items"
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save menu item")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Menu Item Created!</h2>
            <p className="text-gray-600 mb-6">Your new menu item has been successfully added to the menu.</p>
            <Link href="/admin/menu-items">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Back to Menu Items
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin/menu-items">
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
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
              <h1 className="text-4xl font-bold text-gray-900">Create New Menu Item</h1>
            </div>
            <p className="text-gray-600">Add a new delicious item to your menu</p>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Image Upload */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-orange-600" />
                      Item Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {image ? (
                        <div className="relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt="Menu item preview"
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setImage("")}
                            className="absolute top-2 right-2"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-4">Upload an image for your menu item</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload">
                            <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                              Choose Image
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

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
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Margherita Pizza"
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select value={category} onValueChange={setCategory} required>
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
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your delicious menu item..."
                        className="min-h-24 resize-none"
                        required
                      />
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
                          value={basePrice}
                          onChange={(e) => setBasePrice(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
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
                <Button type="button" onClick={addSize} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </CardHeader>
              <CardContent>
                {sizes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No size options added yet</p>
                ) : (
                  <div className="space-y-4">
                    {sizes.map((size, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Size name (e.g., Small, Medium, Large)"
                            value={size.name}
                            onChange={(e) => updateSize(index, "name", e.target.value)}
                          />
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
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeSize(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
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
                <Button type="button" onClick={addExtraIngredient} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
              </CardHeader>
              <CardContent>
                {extraIngredients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No extra ingredients added yet</p>
                ) : (
                  <div className="space-y-4">
                    {extraIngredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Ingredient name (e.g., Extra Cheese, Pepperoni)"
                            value={ingredient.name}
                            onChange={(e) => updateExtraIngredient(index, "name", e.target.value)}
                          />
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
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeExtraIngredient(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/admin/menu-items">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Menu Item
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
