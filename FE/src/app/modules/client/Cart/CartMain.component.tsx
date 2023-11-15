import React, { FunctionComponent, useEffect, useState } from 'react'
import {css} from '@emotion/react'
import ButtonComponent from '~/app/component/parts/ButtonComponent'
import { useProductRedux } from '../redux/hook/useProductReducer'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getAllCart, removeCart } from '~/app/api/cart/CartApi';
import { Icart } from '~/app/interface/Cart';
interface CartMainProps {}

const CartMain: FunctionComponent<CartMainProps> = () => {
  const navigate = useNavigate();
  const { actions } = useProductRedux();
  const [cart, setCart] = useState<Icart[]>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    getAllCart().then(({ data }) => setCart(data));
  }, []);
  useEffect(() => {
    if (cart.length === 0) {
      actions.getAllProduct();
    }
  }, [actions, cart]);

  const { data: { products } } = useProductRedux();

  useEffect(() => {
    const filtered = products.map((product: any) => {
      const cartItem: any = cart.find((item: any) => item.productID === product._id);
      return cartItem ? { ...product, cartID: cartItem._id } : null;
    }).filter(Boolean);
  
    setFilteredProducts(filtered);
  }, [products, cart]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleCheckboxChange = (productId: string) => {
    if (!isPurchasing) {
      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = prevSelectedItems.includes(productId)
          ? prevSelectedItems.filter((id) => id !== productId)
          : [...prevSelectedItems, productId];
        localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
        return updatedSelectedItems;
      });
    }
  };

  const handlePurchase = () => {
    if (selectedItems.length > 0) {
      navigate('/payment');
    } else {
      message.error('Vui lòng chọn ít nhất một sản phẩm trước khi mua hàng.');
    }
  }
  const handleRemoveFromCart = (cartId:any) => {
    const user = localStorage.getItem("userID")
    const checkUser = cart.filter((item:any)=> item.userID === user)
    if(checkUser){
      const check = confirm("Bạn có muốn xóa");
      if (check) {
        removeCart(cartId)
          message.success("Xóa sản phẩm thành công")
          getAllCart().then(({ data }) => setCart(data));
      }
    }
    else{
      message.error("Bạn không xóa được")
    }
  };


  const calculateTotal = (): { total: number; totalDiscount: number } => {
    let total = 0;
    let totalDiscount = 0;
  
    selectedItems.forEach((itemId) => {
      const selectedItem: any  = filteredProducts.find((item: any) => item._id === itemId);
  
      if (selectedItem) {
        // Use the sale price if available, otherwise use the regular price
        const itemPrice = selectedItem.sale
          ? selectedItem.price - ((selectedItem.price ?? 0) * (selectedItem.sale ?? 0) / 100)
          : selectedItem.price ?? 0;
  
        total += itemPrice;
        totalDiscount += selectedItem.sale ? selectedItem.price - itemPrice : 0;
      }
    });
  
    return { total, totalDiscount };
  };
  const { total, totalDiscount } = calculateTotal();
    return (
      <div className="container mt-4" css={Cartcss}>
      <h2>Giỏ Hàng</h2>
      <div className="row">
        <div className="col-8">
          {filteredProducts.length === 0 && (
            <p className='text-center fs-3'>Không có sản phẩm trong giỏ hàng.</p>
          )}

          {filteredProducts.length > 0 && (
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col" className="col-1"></th>
                  <th scope="col" className="col-2">
                    Ảnh
                  </th>
                  <th scope="col" className="col-3">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="col-3">
                    Đơn giá
                  </th>
                  <th scope="col" className="col-3">
                    Số lượng
                  </th>
                  <th scope="col" className="col-3">
                    Thành tiền
                  </th>
                  <th scope="col" className="col-3">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item: any) => (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </td>
                    <td>
                      <img className="img" src={item?.images} alt="" />
                    </td>
                    <td>{item?.name}</td>
                    <td> {item?.sale ? (
                    (item?.price - (item?.price * item?.sale / 100))
                        .toLocaleString("vi", { style: "currency", currency: "VND" })
                    ) : (
                      item?.price?.toLocaleString("vi", { style: "currency", currency: "VND" })
                    )}</td>
                    <td>1</td>
                    <td> {item?.sale ? (
                    (item?.price - (item?.price * item?.sale / 100))
                        .toLocaleString("vi", { style: "currency", currency: "VND" })
                    ) : (
                      item?.price?.toLocaleString("vi", { style: "currency", currency: "VND" })
                    )}</td>
                    <td>
                      <button
                        className="btn w-full btn-danger"
                        onClick={() => handleRemoveFromCart(item?.cartID)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-4 text-center">
        <div className="bg-light w-75 mx-auto p-3 mb-3">
                <h4>Tổng tiền:</h4>
                <p>{total.toLocaleString()} VND</p>
                <h6>Số tiền tiết kiệm được</h6>
                <p>{totalDiscount.toLocaleString()} VND</p>
              </div>
          <ButtonComponent classes="btn btn-dark w-50" onClick={handlePurchase}>
            Mua hàng
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default CartMain
const Cartcss = css`
    .img{
        width: 50px;
    }
`