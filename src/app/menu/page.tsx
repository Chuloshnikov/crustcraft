import MenuContent from "@/components/menu/MenuContent";
import MenuHero from "@/components/menu/MenuHero";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <MenuHero />
        <MenuContent />
    </div>
  )
}
