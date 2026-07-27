import { useState } from 'react'
import { Alert, Button, Center, Flex, Loader, Text, Title } from '@mantine/core'
import { RiAddLine } from '@remixicon/react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout.tsx'
import { CategoriesTable } from '../../components/dashboard/CategoriesTable.tsx'
import { CategoryFormModal } from '../../components/dashboard/CategoryFormModal.tsx'
import { ConfirmDeleteModal } from '../../components/dashboard/ConfirmDeleteModal.tsx'
import { useCategories, useDeleteCategory } from '../../hooks/useProducts.ts'
import type { ICategory } from '../../types/products.ts'

export function DashboardCategoriesPage() {
  const { data: categories, isLoading, isError, error } = useCategories()

  const [formOpened, setFormOpened] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)

  const [deleteOpened, setDeleteOpened] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(null)

  const deleteCategory = useDeleteCategory()

  const openCreateForm = () => {
    setEditingCategory(null)
    setFormOpened(true)
  }

  const openEditForm = (category: ICategory) => {
    setEditingCategory(category)
    setFormOpened(true)
  }

  const openDeleteModal = (category: ICategory) => {
    setCategoryToDelete(category)
    setDeleteOpened(true)
  }

  const confirmDelete = () => {
    if (!categoryToDelete) return
    deleteCategory.mutate(categoryToDelete.id, {
      onSuccess: () => setDeleteOpened(false),
    })
  }

  return (
    <DashboardLayout>
      <Flex justify={'space-between'} align={'center'} mb={'lg'}>
        <Title order={2}>Категории</Title>
        <Button leftSection={<RiAddLine size={16} />} color={'red'} onClick={openCreateForm}>
          Добавить категорию
        </Button>
      </Flex>

      {isLoading ? (
        <Center h={200}>
          <Loader color={'red'} />
        </Center>
      ) : isError ? (
        <Alert color={'red'} title={'Не удалось загрузить категории'}>
          {error.message}
        </Alert>
      ) : !categories || categories.length === 0 ? (
        <Text c={'dimmed'}>Категорий пока нет</Text>
      ) : (
        <CategoriesTable
          categories={categories}
          onEdit={openEditForm}
          onDelete={openDeleteModal}
        />
      )}

      <CategoryFormModal
        opened={formOpened}
        onClose={() => setFormOpened(false)}
        category={editingCategory}
      />

      <ConfirmDeleteModal
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
        onConfirm={confirmDelete}
        title={categoryToDelete?.name ?? ''}
        isPending={deleteCategory.isPending}
      />
    </DashboardLayout>
  )
}