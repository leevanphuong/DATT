import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/stack/Header'
import Footer from '../component/stack/Footer'

type Props = {}

const DefaultHome = (props: Props) => {
  return (
    <div>
        <div>
          <Header/>
        </div>
        <div>
        <Outlet/>
        </div>
        <div className='mt-5'>
            <Footer/>
        </div>
    </div>
  )
}

export default DefaultHome