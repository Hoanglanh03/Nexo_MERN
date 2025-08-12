import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '@pages/RootLayout'
import HomePage from '@pages/HomePage'
import { ThemeProvider } from '@emotion/react'
import theme from "./configs/muiConfig.js";

const router = createBrowserRouter ([
  {
    element: <RootLayout/>,
    children : [
      {
        path:"/", 
        element : <HomePage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router = {router}/>
    </ThemeProvider>
  </StrictMode>,
)
