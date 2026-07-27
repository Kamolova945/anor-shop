import { ActionIcon, Avatar, Group, Table } from '@mantine/core'
import { RiEditLine, RiDeleteBinLine } from '@remixicon/react'
import type { ICategory } from '../../types/products.ts'

interface CategoriesTableProps {
  categories: ICategory[]
  onEdit: (category: ICategory) => void
  onDelete: (category: ICategory) => void
}

export const CategoriesTable = ({ categories, onEdit, onDelete }: CategoriesTableProps) => {
  return (
    <Table verticalSpacing={'sm'} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Изображение</Table.Th>
          <Table.Th>Название</Table.Th>
          <Table.Th>Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {categories.map((category) => (
          <Table.Tr key={category.id}>
            <Table.Td>
              <Avatar src={category.image} radius={'sm'} size={'md'} />
            </Table.Td>
            <Table.Td>{category.name}</Table.Td>
            <Table.Td>
              <Group gap={'xs'}>
                <ActionIcon variant={'light'} color={'blue'} onClick={() => onEdit(category)}>
                  <RiEditLine size={16} />
                </ActionIcon>
                <ActionIcon variant={'light'} color={'red'} onClick={() => onDelete(category)}>
                  <RiDeleteBinLine size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}