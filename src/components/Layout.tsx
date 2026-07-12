import type { ReactNode } from 'react'
import { HeaderComponent } from './HeaderComponent.tsx'

interface LayoutProps {
  children: ReactNode
}


export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  )
}
