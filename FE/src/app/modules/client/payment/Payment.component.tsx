import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getOneAuth } from '~/app/api/auth/ApiAuth';
import { useProductRedux } from '../redux/hook/useProductReducer';
import { addOrder } from '~/app/api/order/ApiOrder';
import { getAllCart, removeCart } from '~/app/api/cart/CartApi';
import { Icart } from '~/app/interface/Cart';
type Props = {}
type FieldType = {
    name?: string; 
    phoneNumber?: string;
    district?: string,
    commune?: string,
    locationDetail?: string,
    city?: String,
    user: string,
  };
const Payment = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
        const idUser = localStorage.getItem('userID');
        const response = await getOneAuth(idUser); 
        form.setFieldsValue(response.data);
    };
    fetchUserData();
  }, []);
  const { actions : getProduct } = useProductRedux();
  const [cart, setCart] = useState<Icart[]>([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    getAllCart().then(({ data }) => setCart(data));
  }, []);
  useEffect(() => {
    if (cart.length === 0) {
      getProduct.getAllProduct();
    }
  }, [getProduct, cart]);

  const { data: { products } } = useProductRedux();
  useEffect(() => {
    const filtered = products.map((product: any) => {
      const cartItem: any = cart.find((item: any) => item.productID === product._id);
      return cartItem ? { ...product, cartID: cartItem._id } : null;
    }).filter(Boolean);
    setFilteredProducts(filtered);
  }, [products, cart]);
  const onFinish = (data: FieldType) => {
    const selectedProducts :any = localStorage.getItem("selectedItems");
    const productOrderArray = JSON.parse(selectedProducts || '[]');
  
    const orderData = {
      ...data,
      productOrder: productOrderArray.map((productId: any) => ({ productId })),
      totalPrice: totalAmount
    };
  
    addOrder(orderData).then(
      (res) => {
        if (res) {
          message.success('Mua hàng thành công');
          setTimeout(() => {
            navigate('/');
          }, 2000);
          filteredProducts.map((item: any) =>removeCart(item.cartID));
        }
      },
      (err) => {
        message.error(err.response.data);
      }
    );
  };
      const onFinishFailed = (errorInfo: any) => {
        message.error("Kiểm tra lại các trường")
      };
      const [cities, setCities] = useState<any[]>([]);
      const [districts, setDistricts] = useState<any[]>([]);
      const [communes, setCommunes] = useState<any[]>([]);
      const [selectedCity, setSelectedCity] = useState<string>('');
      const [selectedDistrict, setSelectedDistrict] = useState<string>('');
      const [selectedCommune, setSelectedCommune] = useState<string>('');
    
      const loadCities = async () => {
        const response = await fetch('https://provinces.open-api.vn/api/');
        const data = await response.json();
        setCities(data);
      };
    
      const loadDistricts = async (cityName: string) => {
        const selectedCity = cities.find((city) => city.name === cityName);
        if (selectedCity) {
          const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`);
          const data = await response.json();
          setDistricts(data.districts);
        }
      };
    
      const loadCommunes = async (districtName: string) => {
        const selectedDistrict = districts.find((district) => district.name === districtName);
        if (selectedDistrict) {
          const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
          const data = await response.json();
          setCommunes(data.wards);
        }
      };
    
      useEffect(() => {
        loadCities();
      }, []);
    
      useEffect(() => {
        if (selectedCity) {
          loadDistricts(selectedCity);
          setSelectedDistrict('');
          setSelectedCommune('');
        }
      }, [selectedCity]);
    
      useEffect(() => {
        if (selectedDistrict) {
          loadCommunes(selectedDistrict);
          setSelectedCommune('');
        }
      }, [selectedDistrict]);
      const { actions } = useProductRedux();
      useEffect(() => {
        actions.getAllProduct();
      }, []);
      
      const { data: { products: productRelate } } = useProductRedux();
      const getCart = localStorage.getItem("selectedItems");
      const [cartProducts, setCartProducts] = useState([]);
      
      useEffect(() => {
        if (getCart) {
          const cartItemIds = JSON.parse(getCart);
          const selectedProducts = productRelate.filter((product:any) =>
            cartItemIds.includes(product._id)
          );
          setCartProducts(selectedProducts);
        }
      }, [getCart, productRelate]);
      const [totalAmount, setTotalAmount] = useState(0);
      useEffect(() => {
        const calculatedTotalAmount = cartProducts.reduce((total, product:any) => {
          const itemPrice = product.sale
            ? product.price - (product.price * product.sale) / 100
            : product.price;
          const itemTotal = itemPrice * 1;
          return total + itemTotal;
        }, 0);
      
        setTotalAmount(calculatedTotalAmount);
      }, [cartProducts]);
      const userID = localStorage.getItem("userID")
  return (
    <div className='container mt-4'>
        <div className='row'>
          <h3 className='pb-4'>Thông tin đặt hàng</h3>
            <div className='col-12 col-md-8'>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelAlign="left"
            >
              <Form.Item<FieldType>
                label="Name user"
                name="name"
                rules={[{ required: true, message: 'Vui lòng điền Username' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="user"
                name="user"
                initialValue={userID}
                rules={[{ required: true, message: 'Vui lòng điền Iduser' }]}
                style={{display: "none"}}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Phone number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Vui lòng điền phoneNumber' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
              >
                <Select
                  value={selectedCity}
                  onChange={(value) => {
                    setSelectedCity(value);
                    setSelectedDistrict('');
                    setSelectedCommune('');
                    loadDistricts(value);
                  }}
                >
                  {cities.map((city) => (
                    <Option key={city.code} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="District"
                name="district"
                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
              >
                <Select
                  value={selectedDistrict}
                  onChange={(value) => {
                    setSelectedDistrict(value);
                    setSelectedCommune('');
                    loadCommunes(value);
                  }}
                >
                  {districts.map((district) => (
                    <Option key={district.code} value={district.name}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Commune"
                name="commune"
                rules={[{ required: true, message: 'Vui lòng chọn xã/phường' }]}
              >
                <Select
                  value={selectedCommune}
                  onChange={(value) => setSelectedCommune(value)}
                >
                  {communes.map((commune) => (
                    <Option key={commune.code} value={commune.name}>
                      {commune.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item<FieldType>
                label="Location Detail"
                name="locationDetail"
                rules={[{ required: true, message: 'Vui lòng điền locationDetail' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 6, offset: 0 }} className='text-center'>
                <Button type="primary" className='btn mx-auto btn-dark w-100' htmlType="submit">
                  Mua hàng
                </Button>
              </Form.Item>
            </Form>
            </div>
            <div className='col-12 col-md-4'>
                <div className='container'>
                  <div className=''>
                    <h5>Tổng thanh toán: {totalAmount.toLocaleString()} VND</h5>
                    <p>Số lượng sản phẩm: {cartProducts.length}</p>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment