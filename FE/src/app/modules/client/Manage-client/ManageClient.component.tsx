import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllOrder, getOneOrder } from '~/app/api/order/ApiOrder';
import { useProductRedux } from '../redux/hook/useProductReducer';
import { deleteOrder } from '../../admin/order/service/orderService';
import { message } from 'antd';
import { BsListTask } from 'react-icons/bs';

interface ManageClientProps {}

const ManageClient:FunctionComponent<ManageClientProps> = () => {
    const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index:any) => {
    setSelectedItem(index);
  };
        const [order, setOrder] = useState([]);
        const userId = localStorage.getItem("userID");

        useEffect(() => {
        getAllOrder().then(({ data }) => {
            const userOrders = data.filter((order:any) => order.user === userId);
            setOrder(userOrders);
        }).catch(error => {
            console.error('Error fetching orders:', error);
        });
        }, [userId]);
        const getProduct = order.map((orderItem: any) => {
            return orderItem.productOrder.map((productItem: any) => {
              return productItem.productId;
            });
          }).flat();
          
          const { actions } = useProductRedux();
          
          useEffect(() => {
            actions.getAllProduct();
          }, []);
          
          const { data: { products: productArray } } = useProductRedux();
          const matchingIds = productArray.filter((product: any) => getProduct.some(productId => productId === product._id));
          const removeOrder = async (id: any) => {
            try {
              const orderResponse = await getOneOrder(id);
              const order = orderResponse.data;
              if (order.status === 'Đang chờ duyệt') {
                await deleteOrder(id);
                message.success('Xóa thành công');
              } else {
                message.error('Không thể xóa đơn hàng đã được duyệt hoặc đã xử lý.');
              }
            } catch (error) {
              console.error('Error removing order:', error);
              message.error('Đã có lỗi xảy ra khi xóa đơn hàng.');
            }
          };
          const [isCollapsed, setIsCollapsed] = useState(true);

          const handleToggle = () => {
            setIsCollapsed(!isCollapsed);
          }
  return (
    <div className='container mt-5'>
        <div className='row'>
        <div className="col-12 col-md-3 mt-4 d-md-none d-lg-none">
            <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#sidebarCollapse"
                aria-expanded="false"
                aria-controls="sidebarCollapse"
                onClick={handleToggle}
            >
                <BsListTask />
            </button>
            <div className={`collapse ${isCollapsed ? '' : 'show'}`} id="sidebarCollapse">
                <ul className="list-group list-group-flush">
                <Link style={{ textDecoration: "none" }} to={"/manage-info"}>
                    <li className='list-group-item'>
                    Thông tin tài khoản
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage"}>
                    <li className='list-group-item'>
                    Quản lý đơn hàng
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage-product"}>
                    <li className='list-group-item'>
                    Sản phẩm đã lưu
                    </li>
                </Link>
                </ul>
            </div>
        </div>
        <div className="col-12 col-md-3 mt-4 d-none d-md-flex d-lg-flex">
            <div id="sidebarCollapse">
                <ul className="list-group list-group-flush">
                <Link style={{ textDecoration: "none" }} to={"/manage-info"}>
                    <li className='list-group-item'>
                    Thông tin tài khoản
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage"}>
                    <li className='list-group-item'>
                    Quản lý đơn hàng
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage-product"}>
                    <li className='list-group-item'>
                    Sản phẩm đã lưu
                    </li>
                </Link>
                </ul>
            </div>
        </div>
            <div className='col-12 col-md-9 mt-4'>
                <h3>Quản lý đơn hàng</h3>
                {order.length >=1 ?(<table className="table text-center">
                    <thead >
                        <tr>
                            <th scope="col" className="col-1">#</th>
                            <th scope="col" className="col-3">Trạng thái đơn hàng</th>
                            <th scope="col" className="col-3">Sản phẩm</th>
                            <th scope="col" className="col-3">Tổng tiền</th>
                            <th scope="col" className="col-3">Hành động</th>

                        </tr>
                    </thead>
                    <tbody>
                      {order.map((item:any,index)=>(
                          <tr key={item?._id}>
                          <td>{index++}</td>
                          <td>{item?.status}</td>
                          <td>
                          {
                           matchingIds.map((item:any)=>(
                            <p>{item?.name}</p>
                           ))
                          }
                          </td>
                          <td>
                            {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            }).format(item?.totalPrice)}
                        </td>
                          <td>
                              <button className='btn btn-danger' onClick={()=>removeOrder(item?._id)}>Hủy đơn hàng </button>
                          </td>
                          </tr>
                      ))}
                    </tbody>
                </table>) :(
                  <div className='text-center'>
                    <h5>Chưa có sản phẩm trong giỏ hàng</h5>
                  </div>
                )}
            </div>
        </div>

    </div>
  )
}

export default ManageClient