import { Card, Group, Loader, SimpleGrid, Text, Title } from '@mantine/core'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout.tsx'
import { useProductsStats, useCategories } from '../../hooks/useProducts.ts'

export function DashboardHomePage() {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useProductsStats()
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  const isLoading = statsLoading || categoriesLoading

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader color={'red'} />
      </DashboardLayout>
    )
  }

  if (statsError) {
    return (
      <DashboardLayout>
        <Text c={'red'}>Не удалось загрузить статистику</Text>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Title order={2} mb={'lg'}>
        Главная
      </Title>

      <SimpleGrid cols={3}>
        <Card withBorder radius={'md'} p={'lg'}>
          <Text size={'sm'} c={'dimmed'}>
            Всего товаров
          </Text>
          <Group gap={4} mt={4}>
            <Text fw={700} size={'xl'}>
              {stats?.total ?? 0}
            </Text>
          </Group>
        </Card>

        <Card withBorder radius={'md'} p={'lg'}>
          <Text size={'sm'} c={'dimmed'}>
            Всего категорий
          </Text>
          <Group gap={4} mt={4}>
            <Text fw={700} size={'xl'}>
              {categories?.length ?? 0}
            </Text>
          </Group>
        </Card>

        <Card withBorder radius={'md'} p={'lg'}>
          <Text size={'sm'} c={'dimmed'}>
            Средняя цена
          </Text>
          <Group gap={4} mt={4}>
            <Text fw={700} size={'xl'}>
              ${stats?.averagePrice.toFixed(2) ?? 0}
            </Text>
          </Group>
        </Card>
      </SimpleGrid>
    </DashboardLayout>
  )
}