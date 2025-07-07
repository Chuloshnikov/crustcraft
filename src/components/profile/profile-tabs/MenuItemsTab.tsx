import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Pizza, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useMenuItems } from '@/lib/hooks/useMenuItems';
import MenuItemCard from './MenuItemCard';
import { toast } from 'sonner';

const MenuItemsTab = () => {
  const {
    menuItems,
    loading,
    error,
    deleteMenuItem,
  } = useMenuItems();

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteMenuItem(id);
        toast.success(`"${name}" deleted successfully`);
      } catch (err) {
        console.error('Failed to delete menu item:', err);
        toast.error('Failed to delete menu item');
      }
    }
  };

  if (loading) {
    return (
      <TabsContent value="menu-items">
        <Card className="shadow-lg border-0">
          <CardContent className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </CardContent>
        </Card>
      </TabsContent>
    );
  }

  if (error) {
    return (
      <TabsContent value="menu-items">
        <Card className="shadow-lg border-0">
          <CardContent className="text-center py-8 text-red-500">
            Error loading menu items: {error}
          </CardContent>
        </Card>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="menu-items">
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Pizza className="h-5 w-5 text-orange-600" />
            Manage Menu Items
          </CardTitle>
          <Link href="/menu-items/new">
            <Button className="cursor-pointer bg-red-500 hover:bg-red-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create new menu item
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              {menuItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No menu items found
                </div>
              ) : (
                menuItems.map((item) => (
                  <MenuItemCard 
                    key={item._id} 
                    item={item} 
                    onDelete={handleDelete} 
                  />
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default MenuItemsTab;