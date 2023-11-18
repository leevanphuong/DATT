import { Button, Space, Table, Image, Modal, Form, Input, Upload, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {deleteAuth, getAllAuth } from './service/authservice';

const AuthAdmin = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editingItem, setEditingItem] = useState<any>(null);
    console.log(data)
  const showModal = () => {
    setModalVisible(true);
  };

  const fetchAuth = async () => {
    try {
      const response = await getAllAuth();
      const auths = response.data;

      const transformedData = auths.map((Auth:any) => ({
        key: Auth._id,
        name: Auth.name,
        phoneNumber: Auth.phoneNumber,
        address: Auth.address,
        email: Auth.email,
        role: Auth.role
      }));

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);
  const removeAuth=(id:any)=>{
    const remove = confirm("Bạn có muốn xóa")
    if(remove){
      deleteAuth(id)
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text:any) => <a>{text}</a>,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text:any) => <a>{text}</a>,
      },
      {
        title: 'PhoneNumber',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (text:any) => <a>{text}</a>,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (text:any) => <a>{text}</a>,
      },

    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <Button onClick={()=>{removeAuth(record.key)}} className='btn btn-danger'>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 className='text-primary'>User</h3>
      <div className=''>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default AuthAdmin;
