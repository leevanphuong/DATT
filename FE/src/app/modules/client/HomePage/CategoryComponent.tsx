import React, { FunctionComponent, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { getAllCate } from '~/app/api/category/Apicategory';
import { Icate } from '~/app/interface/Category';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useProductRedux } from '../redux/hook/useProductReducer';
interface CategoryComponentProps {
  props?: any;
}

const CategoryComponent: FunctionComponent<CategoryComponentProps> = () => {
  const [cates, setcate] = useState<Icate[]>([]);
  useEffect(() => {
    //lấy tất cả các danh mục
    getAllCate().then(({ data }) => setcate(data));
  }, []);
  return (
    <div className='container'>
      <div className='row' css={cssCate}>
      {cates.map((cate) => (
            <div className='col-2' key={cate._id}>
                {cate.images && cate.images[0] && (
                <div>
                    <Link to={`/category/${cate._id}`}><img className='img mx-auto d-block' src={cate.images[0]} alt={cate.name} /></Link>
                    <p className='title'>{cate.name}</p>
                </div>
                )}
            </div>
            ))}
      </div>
    </div>
  )
}

export default CategoryComponent;
const cssCate = css `
    .img{
        width: 100px;
        height: 140px;
    }
    .title{
        padding: 10px;
        text-align: center;
    }
`