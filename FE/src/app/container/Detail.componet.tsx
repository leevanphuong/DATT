import React, { FunctionComponent, useEffect, useState } from 'react'
import Header from '../component/stack/Header'
import {css} from '@emotion/react'
import ButtonComponent from '../component/parts/ButtonComponent'
import Footer from '../component/stack/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProductRedux } from '../modules/client/redux/hook/useProductReducer'
import { useAuthorRedux } from '../modules/client/redux/hook/useAuthorReducer'
import { message } from 'antd'
import { addCart } from '../api/cart/CartApi'
interface DetailProps{}

const Detail:FunctionComponent<DetailProps> = () => {

    const { actions } = useProductRedux()
    const { actions: authorActions } = useAuthorRedux()
    const { id }:any = useParams()
    useEffect(() => {
      actions.getOneProduct(id)
    }, [])
    useEffect(() => {
        actions.getAllProduct()
      }, [])
    const {data: {products: productRelate}} = useProductRedux()
    const {data: { product: productDetail }} = useProductRedux()
    const idAuthor = productDetail.AuthorID
    const shuffledProducts = productRelate.slice().sort(() => 0.5 - Math.random()).slice(0, 6);
    const relatedProducts = productRelate.filter((item:any) => item.AuthorID === idAuthor && item._id !== id);
    const displayedProducts = relatedProducts.slice(0, 6);
    useEffect(() => {
        authorActions.getOneAuthor(idAuthor)
      }, [])
    const {data:{authors: author}} = useAuthorRedux()


    const [isSaved, setIsSaved] = useState(false);
  
    useEffect(() => {
      const savedProductsStr = localStorage.getItem("Idproduct");
      if (savedProductsStr) {
        const savedProducts = JSON.parse(savedProductsStr);
        setIsSaved(savedProducts.includes(id));
      }
    }, []);
  
    const handleSave = () => {
      const savedProductsStr = localStorage.getItem("Idproduct");
      let updatedProducts: string[] = [];
  
      if (savedProductsStr) {
        const savedProducts = JSON.parse(savedProductsStr);
        if (savedProducts.includes(id)) {
          updatedProducts = savedProducts.filter((product:any) => product !== id);
          setIsSaved(false);
          message.success("Bỏ lưu sản phẩm")
        } else {
          updatedProducts = [...savedProducts, id];
          setIsSaved(true);
          message.success("Lưu sản phẩm thành công")
        }
      } else {
        updatedProducts = [id];
        setIsSaved(true);
      }
  
      localStorage.setItem("Idproduct", JSON.stringify(updatedProducts));
    };
    const checkUer = localStorage.getItem("accessToken")
    const handleClicktoCart = async (idProduct: any) => {
      if(checkUer){
        try {
          const Iduser = localStorage.getItem("userID")
          await addCart({ userID: Iduser, productID: idProduct });
          message.success('Sản phẩm đã được thêm vào giỏ hàng.');
        } catch (error) {
          message.error('Sản phẩm đã có trong giỏ hàng.');
        }
      }
      else{
        message.warning("Bạn cần đăng nhập để mua hàng")
      }
    };
  return (
    <div className='' css={mainDetail}>
       <div className='container'>
       <div>
          <Header/>
        </div>
        <div className='row maindetail mx-auto'>
        <div className="col-12 col-md-2 shadow p-3 border h-75 rounded-2 me-3">
            <img className="img" src={productDetail?.images} alt="" />
        </div>
        <div className="col-12 col-md-12 col-lg-7 my-2 me-4">
            <p className="fw-normal">{author?.name}</p>
            <h4>{productDetail?.name}</h4>
            <p className='price text-danger fw-bold fs-5'>{productDetail?.sale ? (
                    (productDetail?.price - (productDetail?.price * productDetail?.sale / 100))
                        .toLocaleString("vi", { style: "currency", currency: "VND" })
                    ) : (
                    productDetail?.price?.toLocaleString("vi", { style: "currency", currency: "VND" })
                    )}</p>
                <div className="d-flex align-items-center mb-5">
                {productDetail?.sale && (
                        <p className="card-text">
                        <del>
                            {productDetail?.price?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                            })}{" "}
                        </del>
                        </p>
                    )}
                  {productDetail?.sale && (
                    <b className="saledetail ms-3">{productDetail.sale}%</b>
                    )}
                </div>
            <div className='row mb-4'>
                <div className='col-12 col-md-6'>
                    <ButtonComponent classes='btn bg-danger text-white' onClick={()=>handleClicktoCart(productDetail?._id)} >Thêm vào giỏ hàng</ButtonComponent>  
                    <ButtonComponent classes='btn bg-warning text-white mx-3' onClick={handleSave}>
                    {isSaved ? 'Đã lưu' : 'Lưu'}
                    </ButtonComponent> 
                </div> 
            </div>
                <b>Chi Tiết</b>
                <div className='list mt-3 d-flex'>
                <table className="mx-3 table table-striped">
                        <thead>
                            <tr>
                            <th className="fw-bold">Số trang</th>
                            <td>{productDetail?.page}</td>
                            </tr>
                            <tr>
                            <th className="fw-bold">Ngôn ngữ</th>
                            <td>{productDetail?.language}</td>
                            </tr>
                            <tr>
                            <th className="fw-bold">Nhà xuất bản</th>
                            <td>{author?.name}</td>
                            </tr>
                        </thead>
                        </table>
                        <table className="mx-3 table table-striped">
                            <thead>
                                <tr>
                                <th className="fw-bold">Nặng</th>
                                <td>{productDetail?.heavy}</td>
                                </tr>
                                <tr>
                                <th className="fw-bold">Rộng</th>
                                <td>{productDetail?.wide}</td>
                                </tr>
                                <tr>
                                <th className="fw-bold">Dài</th>
                                <td>{productDetail?.long}</td>
                                </tr>
                            </thead>
                            </table>
                </div>
            <div className='desc mt-4'>
                <b>Mô tả</b>
                <p className='pt-3'>
                {productDetail?.description}
                </p>
            </div>
        </div>
        <div className="col-12 col-md-2">
            <ButtonComponent classes='btn style shadow btn-light'>Vui Lòng Chọn Định Dạng</ButtonComponent>
        </div>
        </div>
        <div className='same mt-5'>
            <div className='row'>
           <div className='col-9 container'>
           <h3 className='py-4'>Có liên quan</h3>
                <div className='row'> 
                {displayedProducts.map((item:any, index:any) => (
                <div key={item._id} className="col-6 col-md-4 col-lg-2 mt-3">
                 <div className="card">
                {item.sale && <p className="sale">{item.sale}%</p>}
                <Link to={`/detail/${item._id}`}><img src={item.images} alt="..." className="card-img-top img" /></Link>
                   <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                     <p className="card-text text-danger">
                    {item.sale
                         ? (
                            item.price - (item.price * item.sale / 100)
                           ).toLocaleString("vi", { style: "currency", currency: "VND" })
                        : item.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                     </p>
                    {item.sale && (
                       <p className="card-text">
                         <del>
                        {item?.price?.toLocaleString("vi", {
                             style: "currency",
                             currency: "VND",
                           })}{" "}
                         </del>
                       </p>
                     )}
                   </div>
                 </div>
               </div>
                ))}
                </div>
           </div>
          
            </div>
        </div>
        <div className='more my-5'>
            <div className='row'>
           <div className='col-9 container'>
           <h3 className='py-4'>Sản phẩm khác</h3>
                <div className='row'> 
                {shuffledProducts.map((item:any, index:any) => (
               <div key={item._id} className="col-6 col-md-4 col-lg-2 mt-3">
                 <div className="card">
                {item.sale && <p className="sale">{item.sale}%</p>}
                <Link to={`/detail/${item._id}`}><img src={item.images} alt="..." className="card-img-top img" /></Link>
                   <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                     <p className="card-text text-danger">
                    {item.sale
                         ? (
                            item.price - (item.price * item.sale / 100)
                           ).toLocaleString("vi", { style: "currency", currency: "VND" })
                        : item.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                     </p>
                    {item.sale && (
                       <p className="card-text">
                         <del>
                        {item?.price?.toLocaleString("vi", {
                             style: "currency",
                             currency: "VND",
                           })}{" "}
                         </del>
                       </p>
                     )}
                   </div>
                 </div>
               </div>
                ))}
                </div>
           </div>
          
            </div>
        </div>
       </div>
        <div className='mt-3'>
            <Footer/>
        </div>
    </div>
  )
}

export default Detail
const mainDetail =css`
 .maindetail{
    width: 90%;
    margin-top: 30px;
 }
 .saledetail{
    background-color: #FAD5DA;
    color: red;
    width: 40px;
    border-radius: 5px;
    text-align: center;
    font-size: 13px;
 }
 .img{
    width: 100%;
    pading: 5px;
  }
  .style{
    color: #3581BF;
  }
  .card {
    position: relative;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }

  .sale {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    background-color: #FAD5DA;
    padding: 5px;
    border-radius: 10px;
    color:red;
    font-weight: 500;
  }
  .card {
    height: 100%;
    position: relative;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    max-height: 500px; 
    }
    
`