import { Button, Space, Table, Modal, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { createAuthor, getAllAuthor,changeAuthor, deleteAuthor } from './service/authorservice';

const AuthorAdmin = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingItem, setEditingItem] = useState<any>(null);

  const showModal = () => {
    setModalVisible(true);
  };
  console.log(data)
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await createAuthor(values);
      const newCategory = response.data;
      message.success('Author đã được thêm thành công');
      setModalVisible(false);
      fetchAuthor();
    } catch (error) {
      console.error('Error adding category:', error);
      message.error('Đã có lỗi xảy ra khi thêm Author');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleEditClick = (record:any) => {
    setEditingItem(record);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      const authorId = editingItem?.key;
      changeAuthor(values,authorId); 
      setEditModalVisible(false);
      fetchAuthor(); 
      message.success('Thông tin đã được cập nhật thành công');
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const fetchAuthor = async () => {
    try {
      const response = await getAllAuthor();
      const author = response.data;

      const transformedData = author.map((category:any) => ({
        key: category._id,
        name: category.name,
      }));

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);
  const removeAuthor=(id:any)=>{
    const remove = confirm("Bạn có muốn xóa")
    if(remove){
        deleteAuthor(id)
        message.success("Xóa thành công")
    }
    else{
        message.error("Xóa thất bại")
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <Button className='btn btn-warning' onClick={() => handleEditClick(record)}>Edit</Button>
          <Button className='btn btn-danger' onClick={()=> removeAuthor(record?.key)}>Xóa</Button>
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
        title="Thêm "
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="addAuthorForm">
          <Form.Item
            name="name"
            label="Author Name"
            rules={[{ required: true, message: 'Please enter the Author name!' }]}
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
        <Form
          form={editForm}
          layout="vertical"
          name="editAuthorForm"
          initialValues={{ name: editingItem?.name }}
        >
          <Form.Item
            name="name"
            label="Author Name"
            rules={[{ required: true, message: 'Please enter the Author name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuthorAdmin;
