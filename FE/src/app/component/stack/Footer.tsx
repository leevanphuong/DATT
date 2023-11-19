import React, { FunctionComponent } from 'react'
import {css} from '@emotion/react'
import InputComponent from '../parts/InputComponent'
import ButtonComponent from '../parts/ButtonComponent'

interface FooterProps {}

const Footer:FunctionComponent<FooterProps> = () => {
  return (
    <div className='' css={footerCss}> 
        <div className='email'>
           <div className='container'>
           <div className="row py-3">
            <div className='col-12 col-md-6'>
                <h5>
                Sự ngạc nhiên đặc biệt của chúng tôi dành riêng cho bạn
                </h5>
            </div>
            <div className="col-6 col-md-4">
                <InputComponent placeholder="nhập email của bạn ..." classes="form-control" />
            </div>
            <div className="col-6 col-md-2">
                <ButtonComponent classes='btn rounded-4 border-dark-subtle bg-info text-white'>Nhập</ButtonComponent>
            </div>
            </div>
           </div>
           </div>
            <div className='container'>
            <div className='row mt-3'>
                <div className='col-3'>
                <ul className="list-unstyled">
                    <li className="text-info fw-bold fs-6 pb-3">Sản phẩm PolyBook</li>
                    <li>Liên kết PolyBook</li>
                    <li>Đối tác PolyBook</li>
                    </ul>
                </div>
                <div className='col-3'>
                <ul className="list-unstyled">
                    <li className="text-info fw-bold fs-6 pb-3">Mua Sắm</li>
                    <li>Cửa hàng</li>
                    <li>Sự chi trả</li>
                    <li>Vận chuyển</li>
                    </ul>
                </div>
                <div className='col-3'>
                <ul className="list-unstyled">
                    <li className="text-info fw-bold fs-6 pb-3">Về học thuật</li>
                    <li>Về chúng tôi</li>
                    <li>Sự hợp tác</li>
                    </ul>
                </div>
                <div className='col-3'>
                <ul className="list-unstyled">
                    <li className="text-info fw-bold fs-6 pb-3">Khác</li>
                    <li>Các điều khoản và điều kiện</li>
                    <li>Chính sách và quyền riêng tư</li>
                    <li>Góp ý</li>
                    <li>Trợ Giúp</li>
                    </ul>
                </div>
            </div>
            </div>
       <div className='row'>
            <div className="col-12 my-5 text-center">
                <h4  className='text-body-tertiary'>Hiệu sách trực tuyến lớn nhất, đầy đủ nhất và đáng tin cậy nhất ở Việt Nam</h4>
            </div>
       </div>
    </div>
  )
}

export default Footer
const footerCss = css`
    .email{
        background-color:#CCDFEF;
    }
`