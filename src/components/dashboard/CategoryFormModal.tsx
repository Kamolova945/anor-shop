import { useEffect } from 'react'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCreateCategory, useUpdateCategory } from '../../hooks/useProducts.ts'
import type { ICategory, ICategoryFormValues } from '../../types/products.ts'

interface CategoryFormModalProps {
  opened: boolean
  onClose: () => void
  category?: ICategory | null
}

const emptyValues: ICategoryFormValues = {
  name: '',
  image: 'https://placehold.co/400',
}

export const CategoryFormModal = ({ opened, onClose, category }: CategoryFormModalProps) => {
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()

  const isEditing = Boolean(category)
  const isPending = createCategory.isPending || updateCategory.isPending

  const form = useForm<ICategoryFormValues>({
    initialValues: emptyValues,
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Минимум 2 символа' : null),
      image: (v) => (/^https?:\/\//.test(v) ? null : 'Укажите корректную ссылку на изображение'),
    },
  })

  useEffect(() => {
    if (opened) {
      form.setValues(category ? { name: category.name, image: category.image } : emptyValues)
    }
    
  }, [opened, category])

  const handleSubmit = (values: ICategoryFormValues) => {
    const mutation = isEditing
      ? updateCategory.mutateAsync({ id: category!.id, data: values })
      : createCategory.mutateAsync(values)

    mutation.then(() => {
      onClose()
      form.reset()
    })
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? 'Редактировать категорию' : 'Новая категория'}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label={'Название'} {...form.getInputProps('name')} />
        <TextInput label={'Ссылка на изображение'} mt={'sm'} {...form.getInputProps('image')} />

        <Group justify={'flex-end'} mt={'lg'}>
          <Button variant={'default'} onClick={onClose}>
            Отмена
          </Button>
          <Button type={'submit'} color={'red'} loading={isPending}>
            {isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </Group>
      </form>
    </Modal>
  )
}