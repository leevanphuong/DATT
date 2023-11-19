import React, { useEffect } from 'react'
import {css} from '@emotion/react'
import { useProductRedux } from '../redux/hook/useProductReducer'
import { useCategoryRedux } from '../redux/hook/useCategoryReducer'
import { Link } from 'react-router-dom'

type Props = {}

const SachQtComponent = (props: Props) => {
  const { actions } = useProductRedux()
  const { actions : category } = useCategoryRedux()

  const id = "653c90064fbe715ce940455b"
  useEffect(() => {
    actions.getAllProduct()
  }, [])
  useEffect(() => {
    category.getOneCate(id)
  }, [])
  const {data: {category: categoryRedux }} = useCategoryRedux()
  const {data: { products: product}} = useProductRedux()
  const ProductsCate = product.filter((item:any) => item.categoryId === id);
  const displayedProducts = ProductsCate.slice(0, 6);
return (
  <div className='container'>
       <div className="row">
            <div className="col-10 my-4 col-md-11">
              <h3>{categoryRedux?.name}</h3>
            </div>
            <div className="col-2 my-4 col-md-1">
            <Link to={`/category/${id}`}><a href="" className="text-decoration-none fw-bold">Xem thêm</a></Link>
            </div>
          </div>
      <div className='row'>
      <div className='col-3 d-none d-md-none d-lg-flex align-items-center'>
          <img src="https://cdn.gramedia.com/uploads/category-list/Banner_Category_Gcom_-_April_2023_2_Novel_Terbaru_6xPgO1D__w204_hauto.png" alt="" />
      </div>
      <div className='col-12 col-md-9'>
          <div className='row' css={SachQtcss}>
          {displayedProducts.map((item:any, index:any) => (
                <div key={item._id} className="col-6 col-md-4 col-lg-2">
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
)
}

export default SachQtComponent
const SachQtcss = css`
  .card {
    position: relative;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
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
  .img{
    padding: 20px 10px;
    height: auto;
    border-radius: 10px;
  }
  @media (min-width: 768px) {
    .imgs {
      display: block; 
    }
  }

  @media (max-width: 767px) {
    .imgs {
      display: none;
    }
  }
`