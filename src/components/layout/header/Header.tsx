import React from 'react'
import Search from './Search'

const Header = () => {
  return (
    <header className="flex justify-between p-[20] bg-dark text-white">
      {/* <header className="flex justify-between p-[20]"> */}
      <div className="flex gap-[20]">
        <p>Catalog</p>
        <Search />
      </div>

      <p className="flex">Logo</p>

      <div className="flex gap-[20]">
        <p>Social</p>
        <p>Account</p>
        <p>Cart</p>
      </div>
    </header>
  )
}

export default Header
