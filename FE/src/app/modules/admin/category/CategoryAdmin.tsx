import { Button, Space, Table, Image, Modal, Form, Input, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllCategory, createCategory } from './service/categoeyservice';
import { UploadOutlined } from '@ant-design/icons';

const CategoryAdmin = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values)
      const response = await createCategory(values);
      const newCategory = response.data;

      message.success('Danh mục đã được thêm thành công');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding category:', error);
      message.error('Đã có lỗi xảy ra khi thêm danh mục');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      const categories = response.data;

      const transformedData = categories.map((category:any) => ({
        key: category.id,
        name: category.name,
        images: category.images,
      }));

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
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
      render: (imageUrl:any) => <Image src={imageUrl} alt="Category Image" width={50} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <Button className='btn btn-warning'>Edit</Button>
          <Button className='btn btn-danger'>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 className='text-primary'>Danh mục</h3>
      <div className=''>
        <Button type='primary' onClick={showModal}>
          Thêm
        </Button>
      </div>
      <div className=''>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Thêm Category"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="addCategoryForm">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="images"
            label="Category Images"
            rules={[{ required: true, message: 'Please upload the category images!' }]}
          >
            <Upload
              name="file"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryAdmin;
