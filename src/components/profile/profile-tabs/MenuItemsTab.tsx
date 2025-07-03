import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Pizza, Plus } from 'lucide-react';
import React from 'react'

const MenuItemsTab = () => {
  return (
    <TabsContent value="menu-items">
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Pizza className="h-5 w-5 text-orange-600" />
                    Manage Menu Items
                  </CardTitle>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create new menu item
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Menu Items List */}
                    <div className="grid gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                          <div>
                            <h3 className="font-semibold">Margherita Pizza</h3>
                            <p className="text-sm text-gray-600">$18.99 • Pizza Category</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                          <div>
                            <h3 className="font-semibold">Pepperoni Pizza</h3>
                            <p className="text-sm text-gray-600">$22.99 • Pizza Category</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
            </Card>
    </TabsContent>
  )
}

export default MenuItemsTab;