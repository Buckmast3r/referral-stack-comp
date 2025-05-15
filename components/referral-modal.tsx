"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const categories = [
  "Tech",
  "Finance",
  "Crypto",
  "Productivity",
  "E-commerce",
  "Travel",
  "Entertainment",
  "Education",
  "Health",
  "Other",
]

const logoColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Teal", value: "bg-teal-400" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Gray", value: "bg-gray-500" },
]

export default function ReferralModal({ isOpen, onClose, onSave, title, referral = null }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Tech",
    url: "https://refstack.me/",
    logoColor: "bg-blue-500",
    status: "active",
  })

  // Initialize form with referral data if editing
  useEffect(() => {
    if (referral) {
      setFormData({
        id: referral.id,
        name: referral.name,
        category: referral.category,
        url: referral.url,
        logoColor: referral.logoColor,
        status: referral.status,
        clicks: referral.clicks,
        conversions: referral.conversions,
        dateCreated: referral.dateCreated,
      })
    } else {
      setFormData({
        name: "",
        category: "Tech",
        url: "https://refstack.me/",
        logoColor: "bg-blue-500",
        status: "active",
      })
    }
  }, [referral, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (checked) => {
    setFormData((prev) => ({ ...prev, status: checked ? "active" : "inactive" }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-blue-950/90 backdrop-blur-md border-blue-800/50 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Referral Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Dropbox"
              required
              className="bg-blue-950/40 border-blue-800/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger className="bg-blue-950/40 border-blue-800/50 text-white focus:ring-blue-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-blue-950 border-blue-800/50">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-white hover:bg-blue-900/50 focus:bg-blue-900/50 focus:text-white"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Referral URL</Label>
            <Input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://refstack.me/your-link"
              required
              className="bg-blue-950/40 border-blue-800/50 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoColor">Logo Color</Label>
            <Select value={formData.logoColor} onValueChange={(value) => handleSelectChange("logoColor", value)}>
              <SelectTrigger className="bg-blue-950/40 border-blue-800/50 text-white focus:ring-blue-500">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent className="bg-blue-950 border-blue-800/50">
                {logoColors.map((color) => (
                  <SelectItem
                    key={color.value}
                    value={color.value}
                    className="text-white hover:bg-blue-900/50 focus:bg-blue-900/50 focus:text-white"
                  >
                    <div className="flex items-center">
                      <div className={`${color.value} w-4 h-4 rounded-full mr-2`}></div>
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status" className="cursor-pointer">
              Active Status
            </Label>
            <Switch id="status" checked={formData.status === "active"} onCheckedChange={handleStatusChange} />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-blue-800/50 text-white hover:bg-blue-900/30"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-500/50"
            >
              {referral ? "Update Referral" : "Create Referral"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
