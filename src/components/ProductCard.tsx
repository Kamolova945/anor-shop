import { Badge, Box, Button, Text } from '@mantine/core'
import { Link } from 'react-router'
import type { IProduct } from '../types/products.ts'

interface ProductCardProps {
  product: IProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box w={260} bg={'white'} p={'md'} style={{ borderRadius: 12, border: '1px solid #e9e9e9' }}>
      <Box
        w={'100%'}
        h={180}
        bg={product.imageColor}
        style={{ borderRadius: 8, position: 'relative' }}
      >
        <Badge variant={'filled'} color={'orange'} style={{ position: 'absolute', top: 8, left: 8 }}>
          {product.category === 'tshirt' ? 'Одежда' : 'Блокноты'}
        </Badge>
      </Box>

      <Text fw={600} size={'sm'} mt={'sm'}>
        {product.title}
      </Text>

      <Text c={'dimmed'} size={'sm'} mb={'sm'}>
        {product.price.toLocaleString('ru-RU')} сум
      </Text>

      <Button component={Link} to={`/details/${product.id}`} fullWidth color={'red'}>
        Подробнее
      </Button>
    </Box>
  )
}