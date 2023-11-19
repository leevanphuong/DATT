import {FunctionComponent, useState} from 'react'
import InputComponent from '../parts/InputComponent'
import {css} from '@emotion/react'
import ButtonComponent from '../parts/ButtonComponent'
import {BsSearch} from 'react-icons/bs'
import {GiShoppingBag} from 'react-icons/gi'
import {BiSolidUser} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'

interface HeaderProps{
    props?: any
}

const Header:FunctionComponent<HeaderProps> = () => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const navigate = useNavigate()
  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('accessToken')
      navigate('/signin')
    } else {
      navigate('/')
    }
  }
  const getUser = localStorage.getItem('checkAuth')
  
  return (
   <div css={cssHeader}>
     <div className='container mt-2 header'>
      <div className='row'>
        <div className='col-7 col-md-4'>
          <Link style={{textDecoration:"none"}}  to={"/"}><h1 className='logo'>POLYBOOK</h1></Link>
        </div>
        <div className="col-md-5 d-none d-md-flex position-relative d-flex align-items-center justify-content-center">
          <div className="input-group">
            <InputComponent classes="form-control border-primary rounded-4 " placeholder="Tìm kiếm..." />
            <ButtonComponent classes="btn border border-0 position-absolute top-50 end-0 translate-middle-y ms-n1">
              <i><BsSearch/></i>
            </ButtonComponent>
          </div>
        </div>
        {isLoggedIn ? (
            <div className="col-5 col-md-3 d-flex align-items-center justify-content-center">
              <div className="mr-5 item-menu">
                <div className='title'>
                      <div>
                        <span className='px-5 text-dark'>
                        <Link to={'/manage'}>
                          <ButtonComponent classes="btn border border-0">
                            <i className=''><BiSolidUser/></i>
                          </ButtonComponent>
                        </Link>
                          <ul className='links'>
                            <li>
                              <button className='w-100'>
                                <Link style={{textDecoration:"none"}} to={'/manage'}>
                                <p className="font-weight-normal text-10 py-2">
                                  <AiOutlineSetting /> Quản lý{' '}
                                </p>
                                </Link>
                                {getUser === 'ADMIN' && (  
                                        <Link style={{ textDecoration: "none" }} to={'/admin'}>
                                            <p className="font-weight-normal text-10 py-2">
                                                <AiOutlineSetting /> Admin
                                            </p>
                                        </Link>
                                    )}
                                <p className=' font-weight-normal text-10 py-2' onClick={handleLoginLogout}>
                                  {' '}
                                  <HiOutlineLogout />
                                  Đăng xuất
                                </p>
                              </button>
                            </li>
                          </ul>
                        </span>
                      </div>
                </div>
              </div>
              <div className="ml-5 titles item-menu">
                <Link to={'/cart'}>
                  <ButtonComponent classes="btn border border-0">
                    <i className='shopping'><GiShoppingBag/></i>
                  </ButtonComponent>
                </Link>
              </div>
            </div>
        ) : (
            <div className="col-5 col-md-3 d-flex align-items-center justify-content-center">
              <div className="mr-5">
                <Link to={'/signin'}>
                  <ButtonComponent classes="btn me-2 btn-dark border border-0">
                    Đăng nhập
                  </ButtonComponent>
                </Link>
              </div>
              <div className="ml-5">
                <Link to={'/signup'}>
                  <ButtonComponent classes="btn btn-dark border border-0">
                    Đăng ký
                  </ButtonComponent>
                </Link>
              </div>
            </div>
          )}
      </div> 
    </div>
   </div>
  )
}

export default Header
const cssHeader = css`
  .logo{
    color: #0060ae
  }
  .navbar{
    height: 500px;
  }
  .title {
    cursor: pointer;
    position: relative;
    top: 0px;
  }
  @media (max-width: 767px){
    .title {
      top: 10px;
    }
  }
  .titles{
    top: 30px;
  }
  .links {
    font-size: 16px;
    list-style: none;
    background-color: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 2px;
    z-index: 1;
    visibility: hidden;
  }
  .links svg {
    display: inline-block;
    margin-right: 8px;
  }
  .links p:hover {
    background-color: rgba(39, 39, 42, 0.12);
    border-radius: 8px;
  }
  .item-menu:hover .links,
  .links:hover {
    visibility: visible;
  }
  .item-menu {
    display: flex;
    padding: 8px 16px;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    justify-content: flex-end;
    margin: 0 4px;
    .icon {
      margin-right: 4px;
      font-size: 22px;
    }
    .title {
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      position: relative;
    }
  }
  .item-menu:hover {
    background-color: rgba(39, 39, 42, 0.12);
    border: 1px solid rgba(39, 39, 42, 0.11);
  }
  .hr-height {
    width: 1px;
    border: 1px solid rgba(39, 39, 42, 0.12);
    margin: 0 4px;
  }

`