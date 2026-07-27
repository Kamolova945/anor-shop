import { ActionIcon, Avatar, Group, Table } from '@mantine/core'
import { RiEditLine, RiDeleteBinLine } from '@remixicon/react'
import type { IProduct } from '../../types/products.ts'

interface ProductsTableProps {
  products: IProduct[]
  onEdit: (product: IProduct) => void
  onDelete: (product: IProduct) => void
  onRowHover?: (product: IProduct) => void
}

export const ProductsTable = ({ products, onEdit, onDelete, onRowHover }: ProductsTableProps) => {
  return (
    <Table verticalSpacing={'sm'} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Фото</Table.Th>
          <Table.Th>Название</Table.Th>
          <Table.Th>Категория</Table.Th>
          <Table.Th>Цена</Table.Th>
          <Table.Th>Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((product) => (
          <Table.Tr key={product.id} onMouseEnter={() => onRowHover?.(product)}>
            <Table.Td>
              <Avatar src={product.images?.[0]} radius={'sm'} size={'md'} />
            </Table.Td>
            <Table.Td>{product.title}</Table.Td>
            <Table.Td>{product.category?.name}</Table.Td>
            <Table.Td>${product.price}</Table.Td>
            <Table.Td>
              <Group gap={'xs'}>
                <ActionIcon variant={'light'} color={'blue'} onClick={() => onEdit(product)}>
                  <RiEditLine size={16} />
                </ActionIcon>
                <ActionIcon variant={'light'} color={'red'} onClick={() => onDelete(product)}>
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