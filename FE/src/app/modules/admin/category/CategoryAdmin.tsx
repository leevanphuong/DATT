import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Image, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllCategory, createCategory, deleteCategory, changeCategory } from './service/categoeyservice';

const CategoryAdmin = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingItem, setEditingItem] = useState<any>(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await createCategory(values);
      const newCategory = response.data;

      message.success('Danh mục đã được thêm thành công');
      setModalVisible(false);
      fetchCategories();
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
        key: category._id,
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

  const removeCategory = async (id:any) => {
    const remove = window.confirm('Bạn có muốn xóa');
    if (remove) {
      try {
        await deleteCategory(id);
        message.success('Xóa thành công');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        message.error('Xóa thất bại');
      }
    }
  };

  const handleEditClick = (record:any) => {
    setEditingItem(record);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      const categoryId = editingItem?.key;
      await changeCategory(values, categoryId);
      setEditModalVisible(false);
      fetchCategories();
      message.success('Thông tin đã được cập nhật thành công');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

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
          <Button className='btn btn-warning' onClick={() => handleEditClick(record)}>Edit</Button>
          <Button onClick={() => removeCategory(record.key)} className='btn btn-danger'>Xóa</Button>
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
          <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa"
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form form={editForm} 
        layout="vertical" 
        name="editCategoryForm"
        initialValues={{ name: editingItem?.name, images: editingItem?.images }}
        >
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
          <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryAdmin;
