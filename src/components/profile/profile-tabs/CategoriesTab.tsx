import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { Grid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CategoryItem from './CategoryItem';
import { CategoryTypes } from '../../../../types/types';

const CategoriesTab = ({isAdmin}: {isAdmin: boolean}) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [editCategory, setEditCategory] = useState<CategoryTypes | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => {
        setCategories(categories);
      })
      .catch(() => {
        toast.error('Failed to load categories');
      });
  }

  async function handleCategorySubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!isAdmin) {
      toast("Not an Admin");
    } else {
      const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: CategoryTypes = { name: categoryName };

      if (editCategory) {
        data._id = editCategory._id;
      }

      try {
        const response = await fetch('/api/categories', {
          method: editCategory ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setCategoryName('');
          setEditCategory(null);
          fetchCategories();
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(creationPromise, {
      loading: editCategory
        ? 'Updating category...'
        : 'Creating your new category...',
      success: editCategory ? 'Category updated!' : 'Category created!',
      error: 'Error!',
    });
    }

  }

  async function handleDeleteClick(_id: string | undefined): Promise<void> {
    if (!_id) return;

    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        const response = await fetch('/api/categories?_id=' + _id, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCategories();
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });
  }

  return (
    <TabsContent value="categories">
      <div className="space-y-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid className="h-5 w-5 text-orange-600" />
              Manage Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form to create/update category */}
            <form onSubmit={handleCategorySubmit}>
              <div className="bg-gray-50 p-4 rounded-lg flex gap-3 items-end">
                <Input
                  onChange={e => setCategoryName(e.target.value)}
                  type="text"
                  value={categoryName}
                  placeholder="Category name"
                  className="flex-1 bg-white"
                />
                <Button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-6"
                >
                  {editCategory ? 'Update' : 'Create'}
                </Button>
                {editCategory && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditCategory(null);
                      setCategoryName('');
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>

            {/* Existing Categories */}
            <div className="space-y-3">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <CategoryItem
                    key={category._id}
                    category={category}
                    setEditCategory={setEditCategory}
                    setCategoryName={setCategoryName}
                    handleDeleteClick={handleDeleteClick}
                  />
                ))
              ) : (
                <p className="text-gray-500">No categories found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default CategoriesTab;