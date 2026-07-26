import { createBrowserRouter } from 'react-router'
import { HomePage } from '../pages/HomePage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { ProductsPage } from '../pages/ProductsPage.tsx'
import { DetailsPage } from '../pages/DetailsPage.tsx'
import { AboutUsPage } from '../pages/AboutUsPage.tsx'
import { ContactUsPage } from '../pages/ContactUsPage.tsx'
import { LoginPage } from '../pages/LoginPage.tsx'
import { ProfilePage } from '../pages/ProfilePage.tsx'
import { ProtectedRoute } from '../components/auth/ProtectedRoute.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/details/:id',
    element: <DetailsPage />,
  },
  {
    path: '/about',
    element: <AboutUsPage />,
  },
  {
    path: '/contacts',
    element: <ContactUsPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])