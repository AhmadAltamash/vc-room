import React, { ReactNode } from 'react'

const RootLayout = ({ children }: {children: ReactNode}) => {
  return (
    <main>
        navbar
        {children}
        footer
    </main>
  )
}

export default RootLayout
