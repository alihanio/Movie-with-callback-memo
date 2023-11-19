import React from 'react'
import Menu from '../Menu'
import { Outlet } from 'react-router'

const MenuLayout = () => {
  return (
    <>
      <Menu/>
      <Outlet/>
    </>
  )
}

export default MenuLayout


