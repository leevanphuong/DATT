import { Carousel } from 'react-responsive-carousel';
import { css } from '@emotion/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
type Props = {}

const Navbar = (props: Props) => {
  const images = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILNtcEYQn53iPLJS2XblXmCXygxCyOv5Jsw&usqp=CAU', legend: 'Legend 1' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOvAx7U6Z0N5vgNYih5NLsn-0zGklSsNXD5w&usqp=CAU', legend: 'Legend 2' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiAr7-9kCuylQd1LJWKJ9mgZRPAlF-ItWSQ&usqp=CAU', legend: 'Legend 3' },
  
  ];
  return (
    <div className='container'>
        <div className="row">
            <div css={cssPreviewImg} className="col-7">
            <Carousel
            autoPlay={true}
            showThumbs={false}
            showArrows={true}
            showStatus={false}
            infiniteLoop={true}
          >
            {images.map((image, index) => (
              <div key={index} className='w-100'>
                <img className='img' src={image.src} alt={image.legend} />
              </div>
            ))}
            </Carousel>
            </div>
        </div>
    </div>
  )
}

export default Navbar
const cssPreviewImg = css`
  .img{
    width: 600px;
  }

`;