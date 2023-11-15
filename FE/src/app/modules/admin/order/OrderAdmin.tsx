import { Button, Space, Table, Modal, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllOrder , updateOrder } from './service/orderService';
import { useProductRedux } from '../../client/redux/hook/useProductReducer';
const Orderadmin = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingItem, setEditingItem] = useState<any>(null);
  const { actions } = useProductRedux();
  useEffect(() => {
      actions.getAllProduct();
  }, []);
  const { data: { products } } = useProductRedux();
  console.log(products)
  const showModal = () => {
    setModalVisible(true);
  };
  const handleEditClick = (record:any) => {
    setEditingItem(record);
    setEditModalVisible(true);
  };

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields();
      const idOrder = editingItem?.key
      updateOrder(values,idOrder); 
      setEditModalVisible(false);
      fetchOrder(); 
      message.success('Thông tin đã được cập nhật thành công');
    } catch (error) {
      console.error('Error updating Order:', error);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const fetchOrder = async () => {
    try {
      const response = await getAllOrder();
      const orders = response.data;
      
      const transformedData = orders.map((order: any) => {
        const filteredProducts = order.productOrder.length

        return {
          key: order._id,
          name: order.name,
          status: order.status,
          totalPrice: order.totalPrice,
          phoneNumber: order.phoneNumber,
          productOrder: filteredProducts
        };
      });
  
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <a>{text}</a>,
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        render: (text:any) => <a>{text}</a>,
      },
      {
        title: 'phoneNumber',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (text:any) => <a>{text}</a>,
      },
      {
        title: 'totalPrice',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text: any) => (
          <span>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(text)}
          </span>
        ),
      },
      {
        title: 'productOrder',
        dataIndex: 'productOrder',
        key: 'productOrder',
        render: (text:any) => <a>{text}</a>,
      },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <Button className='btn btn-warning' onClick={() => handleEditClick(record)}>Edit</Button>
        </Space>
      ),
    },
  ];
  const statusOptions = [
    { value: 'Đã xác nhận', label: 'Đã xác nhận' },
    { value: 'Đang vận chuyển', label: 'Đang vận chuyển' },
    { value: 'Hoàn thành', label: 'Hoàn thành' },
  ];
  return (
    <div>
      <h3 className='text-primary'>Đơn hàng</h3>
      <div className=''>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Chỉnh sửa"
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form
          form={editForm}
          layout="vertical"
          name="editOrderForm"
          initialValues={{ name: editingItem?.name }}
        >
        <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the order status!' }]}
            >
            <Select placeholder="Select status">
                {statusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                    {option.label}
                </Select.Option>
                ))}
            </Select>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orderadmin;
