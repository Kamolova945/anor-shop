import { Button, Group, Modal, Text } from '@mantine/core'

interface ConfirmDeleteModalProps {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  isPending?: boolean
}

export const ConfirmDeleteModal = ({
  opened,
  onClose,
  onConfirm,
  title,
  isPending,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title={'Подтверждение'} centered>
      <Text mb={'lg'}>
        Удалить «{title}»? Это действие нельзя отменить.
      </Text>
      <Group justify={'flex-end'}>
        <Button variant={'default'} onClick={onClose}>
          Отмена
        </Button>
        <Button color={'red'} loading={isPending} onClick={onConfirm}>
          Удалить
        </Button>
      </Group>
    </Modal>
  )
}