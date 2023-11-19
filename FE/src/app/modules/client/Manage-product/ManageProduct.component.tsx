import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useProductRedux } from '../redux/hook/useProductReducer';
import {css} from '@emotion/react'
import { message } from 'antd';
import { BsListTask } from 'react-icons/bs';

interface ManageProductProps {}

const ManageProduct:FunctionComponent<ManageProductProps> = () => {
    const getId = localStorage.getItem("Idproduct");
    const { actions } = useProductRedux();
    
    useEffect(() => {
      actions.getAllProduct();
    }, []);
    
    const { data: { products: product } } = useProductRedux();
    
    const [newProductArray, setNewProductArray] = useState<any[]>([]);
    
    useEffect(() => {
      if (getId) {
        const idArray = JSON.parse(getId);
        const uniqueIds = [...new Set(idArray)];
    
        const filteredProducts = uniqueIds.map((id) => {
          const isIdExist = product.find((item:any) => item._id === id);
          if (isIdExist) {
            return isIdExist
          }
          return null;
        });
    
        setNewProductArray(filteredProducts); 
    
       }
    }, [getId, product, actions]);
    const handleRemoveFromLocalStorage = (id: string) => {
        const getId = localStorage.getItem("Idproduct");
        if (getId) {
          const idArray = JSON.parse(getId);
          const updatedIds = idArray.filter((itemId: string) => itemId !== id);
          localStorage.setItem("Idproduct", JSON.stringify(updatedIds));
          actions.getAllProduct();
          message.success("Bỏ lưu sản phẩm")
        }
      };
      const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className='container mt-5' css={cssManageproduct}>
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
                <h3>Sản phẩm đã lưu</h3>
                { newProductArray.length>= 1 ?(
                       <table className="table text-center">
                       <thead >
                           <tr>
                               <th scope="col" className="col-1">#</th>
                               <th scope="col" className="col-3">Sản phẩm</th>
                               <th scope="col" className="col-3">Hình ảnh</th>
                               <th scope="col" className="col-3">Giá</th>
                               <th scope="col" className="col-3">Hành động</th>
   
                           </tr>
                       </thead>
                       <tbody>
                        {
                           newProductArray.map((item:any,index:any)=>(
                               <tr key={item?._id}>
                               <td>{index++}</td>
                               <td>{item?.name}</td>
                               <td><Link to={`/detail/${item?._id}`}><img src={item?.images} alt="..." className="card-img-top img" /></Link></td>
                               <td>{item?.price?.toLocaleString("vi", { style: "currency", currency: "VND" })}</td>
                               <td>
                               <button className='btn btn-secondary' onClick={() => handleRemoveFromLocalStorage(item?._id)}>
                                   Bỏ lưu
                               </button>
                               </td>
                               </tr>
                           ))
                        }
                       </tbody>
                   </table>
                ): (
                    <p className='fs-4'>Không có sản phẩm nào !</p>
                )     
                }
            </div>
        </div>

    </div>
  )
}

export default ManageProduct
const cssManageproduct=css`
    .img{
        width: 50px;
        height: auto;
    }
`