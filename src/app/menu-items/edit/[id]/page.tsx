import { EditMenuItemForm } from "@/components/profile/menu-items/EditMenuItemForm";



export default function EditItem({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <EditMenuItemForm itemId={params.id} />
    </div>
  )
}
