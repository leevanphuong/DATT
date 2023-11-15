import React, { FunctionComponent, useState, useEffect } from 'react'
import {css} from '@emotion/react'
import { Iproduct } from '~/app/interface/Product';
import { getNumberProduct } from '~/app/api/product/Apiproduct';
import { Link } from 'react-router-dom';

interface ForyouComponenrProps {}
const ForyouComponent:FunctionComponent<ForyouComponenrProps> = () => {
  const [product, setProduct] = useState<Iproduct[]>([]);
useEffect(() => {
  getNumberProduct().then(({ data }) => setProduct(data));
}, []);
  return (
    <div className='container' css={cssForyou}>
      <div className='row'>
        <div className='row'>
          <div className="row">
              <div className="col-11 my-4">
                <h3>Dành cho bạn</h3>
              </div>
              <div className="col-1 my-4">
              <Link to={"/products"}><a href="" className="text-decoration-none fw-bold">Xem thêm</a></Link>
              </div>
            </div>
          </div>  
          {product.map((product: any) => (
            <div key={product._id} className="swiper-slide col-2">
              <div className="card">
                {product.sale && <p className="sale">{product.sale}%</p>}
                <Link to={`/detail/${product._id}`}><img src={product.images} alt="..." className="card-img-top img" /></Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-danger">
                    {product.sale
                      ? (
                          product.price - (product.price * product.sale / 100)
                        ).toLocaleString("vi", { style: "currency", currency: "VND" })
                      : product.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                  </p>
                  {product.sale && (
                    <p className="card-text">
                      <del>
                        {product?.price?.toLocaleString("vi", {
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
  )
}

export default ForyouComponent
const cssForyou = css`
  .card {
    height: 100%;
    position: relative;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    max-height: 500px; 
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
`