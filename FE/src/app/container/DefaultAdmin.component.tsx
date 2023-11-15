import { Button, Layout, Menu, theme } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { BiBell } from 'react-icons/bi'
import { getAllOrder } from '../api/order/ApiOrder'
import { menuDashBoard } from '../modules/admin/constance/menu-dashboard'
interface DefaultAdminProps {
    prop?: unknown
}

const DefaultAdmin: FunctionComponent<DefaultAdminProps> = () => {
    const { Header, Sider, Content } = Layout
    const [supports, setSupports] = useState([])
    const [orders, setOrders] = useState([])
  
    useEffect(() => {
      getAllOrder().then((res: any) => {
        const newOrder = res.data.filter((item: any) => item.orderStatus === "đang chờ duyệt")
        setOrders(newOrder)
      })
    }, [])
  
  
  
    let navigate = useNavigate()
    const [user, setUser] = useState<any>()
    const id = localStorage.getItem('userID')
    const [collapsed, setCollapsed] = useState(false)
    const {
      token: { colorBgContainer }
    } = theme.useToken()
  
    const handleClickMenuDashboard = (data: any) => {
      navigate(data.key)
    }
    const accessToken = localStorage.getItem('accessToken')
  
    useEffect(() => { }, [accessToken])
    return (
        <div>
             <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='text-center p-3'>
         <h3 className='text-white '>POLYBOOK</h3>
        </div>
        <hr />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={menuDashBoard}
          onSelect={handleClickMenuDashboard}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,

            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <div className='author flex mr-[24px] gap-[24px]'>

            <div className='cart-main relative mt-5'>
              <Link to={'/admin/support'}>
                <HiOutlineMailOpen className='font-bold' />
              </Link>
              {supports?.length >= 0 && accessToken ? <span className='absolute show-count'>{supports?.length}</span> : ''}
            </div>

            <div className='cart-main relative mt-5'>
              <Link to={'/admin/order'}>
                <BiBell className='font-bold' />
              </Link>
              {orders?.length >= 0 && accessToken ? <span className='absolute show-count'>{orders?.length}</span> : ''}
            </div>

            <div className='flex gap-[4px]'>
              <img
                className='author-img h-[36px] m-auto object-cover'
                width={'36px'}
                src='https://cdn1.iconfinder.com/data/icons/flags-36/512/Vietnam_Country_flag-512.png'
              />
              <p className=''>Việt Nam</p>
            </div>
            <div className='border-[1px] h-[40px] m-auto'></div>
            <img
              className='author-img h-[36px] m-auto rounded-[50%] object-cover'
              width={'36px'}
              src='https://banner2.cleanpng.com/20180517/uzq/kisspng-computer-icons-user-profile-male-avatar-5afd8d7b2682b3.7338522715265662671577.jpg'
            />
            <p className='pr-8'>{user?.fullname}</p>
          </div>
        </Header>

        <Content
          style={{
            margin: '0 16px',
            marginBottom: '24px',
            padding: 24,
            minHeight: 280,
            overflowY: 'auto',
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>

      </Layout>
    </Layout>
        </div>
    )
}

export default DefaultAdmin