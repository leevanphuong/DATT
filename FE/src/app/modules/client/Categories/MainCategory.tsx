import {css} from '@emotion/react'
import React, { FunctionComponent, useEffect } from 'react'
import { useProductRedux } from '../redux/hook/useProductReducer'
import { Link, useParams } from 'react-router-dom'
import { useCategoryRedux } from '../redux/hook/useCategoryReducer'

interface MainCategoryeProps {}

const MainCategory:FunctionComponent<MainCategoryeProps> = () => {
  const { actions } = useProductRedux()
  const { actions : category } = useCategoryRedux()

  const {id}= useParams()
  useEffect(() => {
    actions.getAllProduct()
  }, [])
  useEffect(() => {
    category.getOneCate(id)
  }, [])
  const {data: {category: categoryRedux }} = useCategoryRedux()
  console.log(categoryRedux)
  const {data: { products: product}} = useProductRedux()
  const ProductsCate = product.filter((item:any) => item.categoryId === id);
  return (
    <div className='container' css={cssCategory}>
       <div className="row mt-4">
          <h3 className='text-center'>{categoryRedux?.name}</h3>
          <div className="col-12 text-end">
         <select className='select' name="" id="">
            <option value="Muộn Nhất">Muộn Nhất</option>
            <option value="Phổ Biến Nhất">Phổ Biến Nhất</option>
            <option value="Giá Thấp Nhất">Giá Thấp Nhất</option>
            <option value="Giá Cao Nhất">Giá Cao Nhất</option>
          </select>
        </div>
          <div className="col-9 container mt-4">
            <div className='row'>
            {ProductsCate.map((item:any, index:any) => (
                <div key={item._id} className="col-2">
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

export default MainCategory
const cssCategory = css`
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
  .img{
    padding: 20px 10px;
    height: auto;
    border-radius: 10px;
  }
  .select{
    width: 150px;
    border-radius: 5px;
    height: 30px;
    border: 1px solid #0D6EFD;
  };
  .card {
    height: 100%;
    position: relative;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    max-height: 500px; 
    }
`