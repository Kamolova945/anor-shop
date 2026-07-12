import type { ReactNode } from 'react'
import { HeaderComponent } from './HeaderComponent.tsx'
import { FooterComponent } from './FooterComponent.tsx'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </>
  )
}