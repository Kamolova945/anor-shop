import { Badge, Box, Button, Image, Text } from '@mantine/core'
import { Link } from 'react-router'
import type { IProduct } from '../types/products.ts'

interface ProductCardProps {
  product: IProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box w={260} bg={'white'} p={'md'} style={{ borderRadius: 12, border: '1px solid #e9e9e9' }}>
      <Box style={{ borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
        <Image
          src={product.images?.[0]}
          h={180}
          alt={product.title}
          fallbackSrc={'https://placehold.co/600x400?text=No+image'}
        />
        <Badge variant={'filled'} color={'orange'} style={{ position: 'absolute', top: 8, left: 8 }}>
          {product.category?.name}
        </Badge>
      </Box>

      <Text fw={600} size={'sm'} mt={'sm'} lineClamp={1}>
        {product.title}
      </Text>

      <Text c={'dimmed'} size={'sm'} mb={'sm'}>
        ${product.price}
      </Text>

      <Button component={Link} to={`/details/${product.id}`} fullWidth color={'red'}>
        Подробнее
      </Button>
    </Box>
  )
}