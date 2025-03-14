// 'use client'
import React from 'react'
import NextTopLoader from 'nextjs-toploader'

const AppProgressBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextTopLoader
        color="#4cb85e"
        initialPosition={0.08}
        crawlSpeed={200}
        height={5}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #4cb85e,0 0 5px #4cb85e"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
                <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      {children}
    </>
  )
}

export default AppProgressBar
