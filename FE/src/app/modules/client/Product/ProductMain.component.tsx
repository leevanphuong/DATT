import React, { FunctionComponent, useEffect, useState } from 'react'
import {css} from '@emotion/react'
import Pagination from '~/app/component/stack/Pagination'
import { getAllProduct } from '~/app/api/product/Apiproduct'
import { Iproduct } from '~/app/interface/Product'
import { Link } from 'react-router-dom'
interface ProductMainProps  {}

const ProductMain: FunctionComponent<ProductMainProps> = () => {
  const [product, setProduct] = useState<Iproduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllProduct();
      let sortedProducts = [...data];

      if (selectedSortOption === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (selectedSortOption === 'highToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProduct(sortedProducts);
    };

    fetchData();
  }, [selectedSortOption]);

  const itemsPerPage = 24;
  const pageCount = Math.ceil(product.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = product.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className='container' css={cssProduct}>
      <div className="row mt-4">
        <div className="col-12 text-end">
          <select className='select' name="" id="" onChange={(e) => setSelectedSortOption(e.target.value)}>
            <option value="">Sắp xếp</option>
            <option value="lowToHigh">Giá Thấp Nhất</option>
            <option value="highToLow">Giá Cao Nhất</option>
          </select>
        </div>
        <div className="col-9 container mt-4">
          <div className="row justify-content-center">
            {currentItems.map((product: any) => (
              <div key={product._id} className="col-6 col-md-4 col-lg-2 swiper-slide mt-3">
                <div className="card">
                  {product.sale && <p className="sale">{product.sale}%</p>}
                  <Link to={`/detail/${product._id}`}><img src={product.images} alt="..." className="card-img-top img" /></Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-danger">
                      {product.sale
                        ? (product.price - (product.price * product.sale) / 100).toLocaleString("vi", { style: "currency", currency: "VND" })
                        : product.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                    </p>
                    {product.sale && (
                      <p className="card-text">
                        <del>{product?.price?.toLocaleString("vi", { style: "currency", currency: "VND" })}</del>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};


export default ProductMain
const cssProduct = css`
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
  .select{
    width: 150px;
    border-radius: 5px;
    height: 30px;
    border: 1px solid #0D6EFD;
  }
  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
  }
  
  .pagination li {
    display: inline-flex;
    margin-right: 3px;
  }
  
  .pagination li a {
    border-radius: 10px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    text-decoration: none;
  }
  
  .pagination li.active a,
  .pagination li a:hover {
    background-color: gray;
    color: #fff;
    border-color: #007bff;
  }
`