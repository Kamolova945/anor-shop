import { useEffect } from 'react'
import { Button, Group, Modal, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCategories, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts.ts'
import type { IProduct, IProductFormValues } from '../../types/products.ts'

interface ProductFormModalProps {
  opened: boolean
  onClose: () => void
  product?: IProduct | null
}

const emptyValues: IProductFormValues = {
  title: '',
  price: 0,
  description: '',
  categoryId: 0,
  images: ['https://placehold.co/400'],
}

export const ProductFormModal = ({ opened, onClose, product }: ProductFormModalProps) => {
  const { data: categories } = useCategories()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const isEditing = Boolean(product)
  const isPending = createProduct.isPending || updateProduct.isPending

  const form = useForm<IProductFormValues>({
    initialValues: emptyValues,
    validate: {
      title: (v) => (v.trim().length < 2 ? 'Минимум 2 символа' : null),
      price: (v) => (v <= 0 ? 'Цена должна быть больше 0' : null),
      categoryId: (v) => (v ? null : 'Выберите категорию'),
      description: (v) => (v.trim().length < 5 ? 'Минимум 5 символов' : null),
    },
  })

  
  
  useEffect(() => {
    if (opened) {
      form.setValues(
        product
          ? {
              title: product.title,
              price: product.price,
              description: product.description,
              categoryId: product.category.id,
              images: product.images,
            }
          : emptyValues,
      )
    }
   
  }, [opened, product])

  const handleSubmit = (values: IProductFormValues) => {
    const payload = {
      title: values.title,
      price: values.price,
      description: values.description,
      categoryId: values.categoryId,
      images: values.images,
    }

    const mutation = isEditing
      ? updateProduct.mutateAsync({ id: product!.id, data: payload })
      : createProduct.mutateAsync(payload)

    mutation.then(() => {
      onClose()
      form.reset()
    })
  }

  return (
    <Modal opened={opened} onClose={onClose} title={isEditing ? 'Редактировать товар' : 'Новый товар'} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label={'Название'} {...form.getInputProps('title')} />

        <NumberInput label={'Цена'} mt={'sm'} min={0} {...form.getInputProps('price')} />

        <Select
          label={'Категория'}
          mt={'sm'}
          data={categories?.map((c) => ({ value: String(c.id), label: c.name })) ?? []}
          value={form.values.categoryId ? String(form.values.categoryId) : null}
          onChange={(value) => form.setFieldValue('categoryId', Number(value))}
          error={form.errors.categoryId}
        />

        <Textarea label={'Описание'} mt={'sm'} minRows={3} {...form.getInputProps('description')} />

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