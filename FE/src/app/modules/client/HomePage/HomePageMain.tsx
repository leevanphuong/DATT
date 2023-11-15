import SgkComponent from './SgkComponent'
import TruyentranhComponent from './TruyentranhComponent'
import SachQtComponent from './SachQtComponent'
import BlogComponent from './BlogComponent'
import CategoryComponent from '~/app/modules/client/HomePage/CategoryComponent'
import ForyouComponent from '~/app/modules/client/HomePage/ForyouComponent'
import { Carousel } from 'react-responsive-carousel';
import {css} from '@emotion/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
type Props = {}

const HomePageMain = (props: Props) => {
    const images = [
        { src: 'https://cdn.gramedia.com/uploads/marketing/-Gramedia.com-_Festival_Bulan_Bahasa_Storefront__wauto_h336.jpg', legend: 'Legend 1' },
        { src: 'https://cdn.gramedia.com/uploads/marketing/Promo_Gibah_GPU_-_Oktober_2023_Storefront__wauto_h336.jpg', legend: 'Legend 2' },
        { src: 'https://cdn.gramedia.com/uploads/marketing/Detak_Cerita_-_Mystery__Thriller_Okt_2023_Storefront__wauto_h336.jpg', legend: 'Legend 3' },
        { src: 'https://cdn.gramedia.com/uploads/marketing/Festival_Bulan_Bahasa_-_Diskon_30__Ebooks__wauto_h336.jpg', legend: 'Legend 3' },
        { src: 'https://cdn.gramedia.com/uploads/marketing/Must_Have_Books_Diperpanjang_Storefront__wauto_h336.jpg', legend: 'Legend 3' },
      
      ];
  return (
    <div className='container' css={homeCss}>
        <div className='row'>
        <div className='container'>
        <div className='row my-5'>
            <div className='col-6'>
            <Carousel
            autoPlay={true}
            showThumbs={false}
            showArrows={true}
            showStatus={false}
            infiniteLoop={true}
          >
            {images.map((image, index) => (
             <div key={index} className="image-container">
              <img className="imgbanner" src={image.src} alt={image.legend} />
            </div>
            ))}
            </Carousel>
            </div>
            <div className='col-6'>
              <div className="d-flex flex-column">
                <div className="flex-fill p-2 w-100">
                  <img className='w-100' src="https://cdn.gramedia.com/uploads/marketing/Promo_Teman_Membaca_Oktober_2023_Storefront_mElnCGX__wauto_h164.jpg" alt="" />
                </div>
                <div className="flex-fill p-2 w-100">
                  <img className='w-100' src="https://cdn.gramedia.com/uploads/marketing/Promo_Teman_Membaca_Oktober_2023_Storefront_mElnCGX__wauto_h164.jpg" alt="" />
                </div>
              </div>
            </div>
        </div>
    </div>
    <div>
      <CategoryComponent/>
    </div>
    <div className='mt-4'>
         <ForyouComponent/>     
    </div>
            <div className='col-12'>
                <SgkComponent/>
            </div>
            <div className='col-12 my-3'>
                <TruyentranhComponent/>
            </div>
            <div className='col-12 my-3'>
                <SachQtComponent/>
            </div>
            <div className='col-12 my-3'>
                <BlogComponent/>
            </div>
        </div>
    </div>
  )
}

export default HomePageMain
const homeCss = css`
  .image-container {
    width: 100%;
    height: 100%;
  }

  .imgbanner {
    object-fit: cover;
    width: 100%;
    height: 340px;
  }
`