import {
    FileOutlined,
    UserOutlined,
    OrderedListOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
    CommentOutlined,

} from '@ant-design/icons'
import { SiAdminer } from 'react-icons/si';
import { FaUserEdit } from "react-icons/fa";
export const menuDashBoard = [
    {
        key: '/admin',
        icon: <SiAdminer />,
        label: 'DashBoard'
    },
    {
        key: '/admin/user',
        icon: <UserOutlined />,
        label: 'User'
    },
    {
        key: '/admin/category',
        icon: <FileOutlined />,
        label: 'Category'
    },
    {
        key: '/admin/product',
        icon: <OrderedListOutlined />,
        label: 'Product'
    },
    {
        key: '/admin/author',
        icon: <FaUserEdit />,
        label: 'Author'
    },
    {
        key: '/admin/order',
        icon: <ShoppingCartOutlined />,
        label: 'Order'
    },
    {
        key: '/',
        icon: <HomeOutlined />,
        label: 'home'
    },

]