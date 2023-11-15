import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllOrder, getOneOrder } from '~/app/api/order/ApiOrder';
import { useProductRedux } from '../redux/hook/useProductReducer';
import { deleteOrder } from '../../admin/order/service/orderService';
import { message } from 'antd';

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
          
  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className="col-3">
                <ul className="list-group list-group-flush">
                    <Link style={{textDecoration:"none"}} to={"/manage-info"}>
                    <li 
                    className={`list-group-item ${selectedItem === 0 ? 'active' : ''}`}
                    style={{
                        backgroundColor: selectedItem === 0 ? '#CED4DA' : '#fff',
                    }}
                    onClick={() => handleItemClick(0)}
                    >
                    Thông tin tài khoản
                    </li>
                    </Link>
                    <Link style={{textDecoration:"none"}}  to={"/manage"}>
                    <li
                    className={`list-group-item ${selectedItem === 1 ? 'active' : ''}`}
                    style={{
                        backgroundColor: selectedItem === 1 ? '#CED4DA' : '#fff',
                        textDecoration:"none"
                    }}
                    onClick={() => handleItemClick(1)}
                    >
                    Quản lý đơn hàng
                    </li>
                    </Link>
                    <Link style={{textDecoration:"none"}} to={"/manage-product"}>
                    <li 
                    className={`list-group-item ${selectedItem === 0 ? 'active' : ''}`}
                    style={{
                        backgroundColor: selectedItem === 0 ? '#CED4DA' : '#fff',
                    }}
                    onClick={() => handleItemClick(0)}
                    >
                    Sản phẩm đã lưu
                    </li>
                    </Link>
                </ul>
            </div>
            <div className='col-9'>
                <h3>Quản lý đơn hàng</h3>
                <table className="table text-center">
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
                </table>
            </div>
        </div>

    </div>
  )
}

export default ManageClient