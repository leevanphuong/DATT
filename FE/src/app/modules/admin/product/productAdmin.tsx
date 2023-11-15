import { Button, Space, Table, Image, Modal, Form, Input, Upload, message, InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllProduct, createProduct, deleteProduct } from './servce/productService';
import { UploadOutlined } from '@ant-design/icons';
import { getAllCategory } from '../category/service/categoeyservice';
import { getAllAuthor } from '../author/service/authorservice';

const ProductAdmin = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [categoryNames, setCategoryNames] = useState<any>({});
  const [AuthorsNames, setAuthorsNames] = useState<any>({});
  
  const showModal = () => {
    setModalVisible(true);
  };
  const [category, setCategory] = useState<any>([])
  const [author, setAuthor] = useState<any>([])

  useEffect(()=>{
    getAllCategory().then(({data})=> setCategory(data))
  },[])
  useEffect(()=>{
    getAllAuthor().then(({data})=> setAuthor(data))
  },[])
  console.log(category)
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values)
      const response = await createProduct(values);
      const newproduct = response.data;

      message.success('Sản phẩm đã được thêm thành công');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Đã có lỗi xảy ra khi thêm Sản phẩm');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const fetchproduct = async () => {
    try {
      const productResponse = await getAllProduct();
      const categoryResponse = await getAllCategory()
      const authorResponse = await getAllAuthor()
      const products = productResponse.data;
      const categories = categoryResponse.data;
        const authors = authorResponse.data
      const categoryNamesDict :any = {};
      categories.forEach((category:any) => {
        categoryNamesDict[category._id] = category.name;
      });
      setCategoryNames(categoryNamesDict);
  
      const authorsNamesDict :any = {};
      authors.forEach((author:any) => {
        authorsNamesDict[author._id] = author.name;
      });
      setAuthorsNames(authorsNamesDict);

      const transformedData = products.map((product:any) => ({
        key: product._id,
        name: product.name,
        images: product.images,
        AuthorID: product.AuthorID,
        categoryId: product.categoryId,
      }));
  
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching products or categories:', error);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (imageUrl:any) => <Image src={imageUrl} alt="product Image" width={50} />,
    },
    {
        title: 'category',
        dataIndex: 'categoryId',
        key: 'categoryid',
        render: (categoryId:any) => <a>{categoryNames[categoryId]}</a>,
      },
      {
        title: 'Author',
        dataIndex: 'AuthorID',
        key: 'AuthorID',
        render: (AuthorID:any) => <a>{AuthorsNames[AuthorID]}</a>,
      },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <Button className='btn btn-warning'>Edit</Button>
          <Button onClick={()=>{removeProduct(record.key)}} className='btn btn-danger'>Xóa</Button>
        </Space>
      ),
    },
  ];
  const removeProduct=(id:any)=>{
    const remove = confirm("Bạn có muốn xóa")
    if(remove){
        deleteProduct(id)
        message.success("Xóa thành công")
    }
    else{
        message.error("Xóa thất bại")
    }
  }
  return (
    <div>
      <h3 className='text-primary'>Sản phẩm</h3>
      <div className=''>
        <Button type='primary' onClick={showModal}>
          Thêm
        </Button>
      </div>
      <div className=''>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Thêm product"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="addproductForm">
          <Form.Item
            name="name"
            label="product Name"
            rules={[{ required: true, message: 'Please enter the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="images"
            label="product Images"
            rules={[{ required: true, message: 'Please upload the product images!' }]}
          >
              <Input/>
          </Form.Item>
          <Form.Item
            name="price"
            label="price"
            rules={[{ required: true, message: 'Please enter the product price!' }]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            name="sale"
            label="sale"
            rules={[{ required: true, message: 'Please enter the product sale!' }]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            name="long"
            label="long"
            rules={[{ required: true, message: 'Please enter the product long!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="page"
            label="page"
            rules={[{ required: true, message: 'Please enter the product page!' }]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            name="wide"
            label="wide"
            rules={[{ required: true, message: 'Please enter the product wide!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="heavy"
            label="heavy"
            rules={[{ required: true, message: 'Please enter the product heavy!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            rules={[{ required: true, message: 'Please enter the product description!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="quantity"
            rules={[{ required: true, message: 'Please enter the product quantity!' }]}
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="category"
            rules={[{ required: true, message: 'Please select the category!' }]}
            >
            <Select placeholder="Danh mục">
                {category.map((option:any) => (
                <Select.Option key={option._id} value={option._id}>
                    {option.name}
                </Select.Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item
            name="AuthorID"
            label="Author"
            rules={[{ required: true, message: 'Please select the Author!' }]}
            >
            <Select placeholder="Tác giả">
                {author.map((option:any) => (
                <Select.Option key={option._id} value={option._id}>
                    {option.name}
                </Select.Option>
                ))}
            </Select>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductAdmin;
