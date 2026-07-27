import { useEffect, useState } from 'react'
import { Button, Flex, NumberInput, TextInput } from '@mantine/core'
import { RiSearchLine, RiCloseLine } from '@remixicon/react'
import { useCategories } from '../hooks/useProducts.ts'
import { useSearchRequestParams } from '../hooks/useSearchRequestParms.ts'
import type { TProductParams } from '../types/products.ts'

export const ProductFilter = () => {
  const { searchParams, setSearchParams } = useSearchRequestParams<TProductParams>()

  const { data: categories } = useCategories()

  const activeCategory = searchParams.categoryId ?? ''

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')
  const [priceMin, setPriceMin] = useState<string | number>(searchParams.price_min ?? '')
  const [priceMax, setPriceMax] = useState<string | number>(searchParams.price_max ?? '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ key: 'search', value: searchValue })
    }, 400)

    return () => clearTimeout(timeout)
  }, [searchValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ key: 'price_min', value: priceMin })
    }, 400)

    return () => clearTimeout(timeout)
  }, [priceMin])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ key: 'price_max', value: priceMax })
    }, 400)

    return () => clearTimeout(timeout)
  }, [priceMax])

  const onCategoryClick = (categoryId: string) => {
    setSearchParams({ key: 'categoryId', value: categoryId })
  }

  const onResetClick = () => {
    setSearchValue('')
    setPriceMin('')
    setPriceMax('')
    setSearchParams({ key: 'categoryId', value: '' })
    setSearchParams({ key: 'search', value: '' })
    setSearchParams({ key: 'price_min', value: '' })
    setSearchParams({ key: 'price_max', value: '' })
  }

  return (
    <Flex justify={'center'} gap={'md'} wrap={'wrap'} align={'flex-end'}>
      <Button
        radius={'xl'}
        variant={activeCategory === '' ? 'filled' : 'default'}
        color={'red'}
        onClick={() => onCategoryClick('')}
      >
        Все
      </Button>

      {categories?.map((category) => (
        <Button
          key={category.id}
          radius={'xl'}
          variant={activeCategory === String(category.id) ? 'filled' : 'default'}
          color={'red'}
          title={category.name}
          maw={160}
          onClick={() => onCategoryClick(String(category.id))}
          styles={{
            label: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        >
          {category.name}
        </Button>
      ))}

      <TextInput
        w={220}
        radius={'xl'}
        placeholder={'Поиск по названию'}
        leftSection={<RiSearchLine size={16} />}
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />

      <NumberInput
        w={110}
        radius={'xl'}
        placeholder={'Цена от'}
        value={priceMin}
        onChange={setPriceMin}
        min={0}
      />

      <NumberInput
        w={110}
        radius={'xl'}
        placeholder={'Цена до'}
        value={priceMax}
        onChange={setPriceMax}
        min={0}
      />

      <Button
        radius={'xl'}
        variant={'subtle'}
        color={'gray'}
        leftSection={<RiCloseLine size={16} />}
        onClick={onResetClick}
      >
        Сбросить
      </Button>
    </Flex>
  )
}