import { css } from '@emotion/react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useProductRedux } from '../redux/hook/useProductReducer';
import { Link, useParams } from 'react-router-dom';
import { useCategoryRedux } from '../redux/hook/useCategoryReducer';
import Pagination from '~/app/component/stack/Pagination';

interface MainCategoryProps {}

const MainCategory: FunctionComponent<MainCategoryProps> = () => {
  const { actions } = useProductRedux();
  const { actions: category } = useCategoryRedux();
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    actions.getAllProduct();
  }, []);

  useEffect(() => {
    category.getOneCate(id);
  }, []);

  const { data: { category: categoryRedux } } = useCategoryRedux();
  console.log(categoryRedux);

  const { data: { products: product } } = useProductRedux();

  const [sortType, setSortType] = useState<string | null>(null);

  const ProductsCate = product
    .filter((item: any) => item.categoryId === id)
    .sort((a: any, b: any) => {
      if (sortType === 'Giá Thấp Nhất') {
        return a.price - b.price;
      } else if (sortType === 'Giá Cao Nhất') {
        return b.price - a.price;
      }
      return 0;
    });
    const itemsPerPage = 24;
    const pageCount = Math.ceil(product.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = product.slice(offset, offset + itemsPerPage);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };
  return (
    <div className='container' css={cssCategory}>
      <div className="row mt-4">
        <h3 className='text-center'>{categoryRedux?.name}</h3>
        <div className="col-12 text-end">
          <select
            className='select'
            name=""
            id=""
            value={sortType || 'default'}
            onChange={handleSortChange}
          >
            <option value="default" disabled hidden>Chọn cách sắp xếp</option>
            <option value="Giá Thấp Nhất">Giá Thấp Nhất</option>
            <option value="Giá Cao Nhất">Giá Cao Nhất</option>
          </select>
        </div>
        <div className="col-9 container mt-4">
          <div className='row'>
            {ProductsCate.map((item: any, index: any) => (
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
      <div className="d-flex justify-content-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MainCategory;

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