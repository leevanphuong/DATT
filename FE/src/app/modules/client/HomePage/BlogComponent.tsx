import React from 'react'
import {css} from '@emotion/react'

type Props = {}

const BlogComponent = (props: Props) => {
  return (
    <div className='container'>
        <div className='row' css={blogcss}>
            <h4 className='pb-2'>Blog Poly</h4>
            <div className='col-12 col-md-6'>
                <img className='img' src="https://www.gramedia.com/blog/content/images/2023/10/Screenshot-2023-10-19-171013.png" alt="" />
                <p className='fw-light'>Liên kết địa chỉ</p>
                <a href="" className='text-dark text-decoration-none fw-bold fs-5'>Lợi ích của Tiếp thị liên kết, Kiếm tiền dễ dàng!</a>
                <p className='pt-5'>Ngày 19 tháng 10 năm 2023</p>
            </div>
            <div className='col-12 col-md-6'>
                <div className='row mb-4'>
                    <div className='col-3'>
                        <img className='w-100' src="https://www.gramedia.com/blog/content/images/2023/10/SMAK-Cor-Jesu---1.jpeg" alt="" />
                    </div>
                    <div className='col-9'>
                        <h6 className='fw-bold'>ePerpus giúp tăng cường số hóa các cơ sở học tập SMAK Cor Jesu</h6>
                        <p className='pt-3'>Ngày 18 tháng 10 năm 2023</p>
                    </div>
                </div>
                <div className='row my-4'>
                    <div className='col-3'>
                        <img className='w-100' src="https://www.gramedia.com/blog/content/images/2023/10/marcella-fp-tabi.jpg" alt="" />
                    </div>
                    <div className='col-9'>
                        <h6 className='fw-bold'>#Don'tClick, Một bộ tiểu thuyết kinh dị dành cho tuổi teen khiến bạn nổi da gà!</h6>
                        <p className='pt-3'>Ngày 18 tháng 10 năm 2023</p>
                    </div>
                </div>
                <div className='row my-4'>
                    <div className='col-3'>
                        <img className='w-100' src="https://www.gramedia.com/blog/content/images/2023/04/337656474_1288051968413835_243716816374681031_n-1.jpg" alt="" />
                    </div>
                    <div className='col-9'>
                        <h6 className='fw-bold'>TABI, Những người bạn ảo của phụ nữ của Marchella FP</h6>
                        <p className='pt-3'>Ngày 18 tháng 10 năm 2023</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogComponent
const blogcss = css`
    .img{
        width: 100%;
        height: 350px;
    }
`