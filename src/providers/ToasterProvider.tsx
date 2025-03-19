'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { Toaster, ToasterProps } from 'sonner'

const ToasterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <React.Fragment>
      {children}

      <Toaster
        richColors
        closeButton
        theme={theme as ToasterProps['theme']}
        toastOptions={{
          className: theme === 'dark' ? '!bg-border !border !border-dark' : '',
        }}
      />
    </React.Fragment>
  )
}

export default ToasterProvider
