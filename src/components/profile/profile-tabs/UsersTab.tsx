import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { useAllUsers } from '@/lib/hooks/useGetAllUsers';
import { Loader2, Users } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import UserCard from './UserCard';

const UsersTab = () => {
   const {
      allUsers,
      loading,
      error,
      deleteUser,
    } = useAllUsers();
    console.log('All Users:', allUsers);

    const handleDelete = async (id: string, firstName: string, lastName: string) => {
      if (confirm(`Are you sure you want to delete "${firstName} ${lastName}"?`)) {
        try {
          await deleteUser(id);
          toast.success(`"${firstName} ${lastName}" deleted successfully`);
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
    <TabsContent value="users">
            <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    Manage Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Users List */}
                    <div className="space-y-3">
                     {allUsers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No menu items found
                        </div>
                      ) : (
                        allUsers.map((item) => (
                          <UserCard 
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
  )
}

export default UsersTab;