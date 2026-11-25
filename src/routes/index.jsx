import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

// Secondary pages are code-split; the homepage ships in the main bundle.
const page = (load) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/puppies', lazy: page(() => import('../pages/Puppies')) },
      { path: '/puppies/:slug', lazy: page(() => import('../pages/PuppyDetail')) },
      { path: '/gone-home', lazy: page(() => import('../pages/GoneHome')) },
      { path: '/happy-families', lazy: page(() => import('../pages/HappyFamilies')) },
      { path: '/how-it-works', lazy: page(() => import('../pages/HowItWorks')) },
      { path: '/faq', lazy: page(() => import('../pages/Faq')) },
      { path: '/contact', lazy: page(() => import('../pages/Contact')) },
      { path: '*', element: <NotFound /> },
    ],
  },
])
