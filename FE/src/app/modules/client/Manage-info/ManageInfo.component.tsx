import React, { FunctionComponent, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { getOneAuth, updateAuth } from '~/app/api/auth/ApiAuth';
import { BsListTask } from 'react-icons/bs';
interface ManageInfoProps {}
type FieldType = {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?:string,
    address?:string
  };
const ManageInfo:FunctionComponent<ManageInfoProps> = () => {
  const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
      useEffect(() => {
        const fetchUserData = async () => {
            const idUser = localStorage.getItem('userID');
            const response = await getOneAuth(idUser); 
            form.setFieldsValue(response.data);
        };
        fetchUserData();
      }, []);
    const onFinish = (values: any) => {
      const idUser = localStorage.getItem("userID")
      updateAuth(idUser, values).then((res:any)=>{
          if(res){
              message.success("Cập nhật thông tin thành công!")
          }
      }, (err)=> {
          message.error("Cập nhật lỗi")
      })
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const [selectedItem, setSelectedItem] = useState(null);

      const handleItemClick = (index:any) => {
        setSelectedItem(index);
      };
      console.log(form)
      const [isCollapsed, setIsCollapsed] = useState(true);

      const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
      }
  return (
    <div className='container mt-5'>
         <div className='row'>
         <div className="col-12 col-md-3 mt-4 d-md-none d-lg-none">
            <button
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#sidebarCollapse"
                aria-expanded="false"
                aria-controls="sidebarCollapse"
                onClick={handleToggle}
            >
                <BsListTask />
            </button>
            <div className={`collapse ${isCollapsed ? '' : 'show'}`} id="sidebarCollapse">
                <ul className="list-group list-group-flush">
                <Link style={{ textDecoration: "none" }} to={"/manage-info"}>
                    <li className='list-group-item'>
                    Thông tin tài khoản
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage"}>
                    <li className='list-group-item'>
                    Quản lý đơn hàng
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage-product"}>
                    <li className='list-group-item'>
                    Sản phẩm đã lưu
                    </li>
                </Link>
                </ul>
            </div>
        </div>
        <div className="col-12 col-md-3 mt-4 d-none d-md-flex d-lg-flex">
            <div id="sidebarCollapse">
                <ul className="list-group list-group-flush">
                <Link style={{ textDecoration: "none" }} to={"/manage-info"}>
                    <li className='list-group-item'>
                    Thông tin tài khoản
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage"}>
                    <li className='list-group-item'>
                    Quản lý đơn hàng
                    </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/manage-product"}>
                    <li className='list-group-item'>
                    Sản phẩm đã lưu
                    </li>
                </Link>
                </ul>
            </div>
        </div>
            <div className='col-12 col-md-9 mt-4'>
                <h3>Thông tin cá nhân</h3>
                    <div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        initialValues={formData}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        labelAlign='left'

                    >
                        <Form.Item<FieldType>
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[{ required: true, message: 'Please input your password!' }]}
                          style={{ display: 'none' }} // Ẩn trường mật khẩu trên giao diện
                        >
                          <Input type="password" />
                        </Form.Item>
                        <Form.Item<FieldType>
                        label="PhoneNumber"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phoneNumber!' }]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                        <Input />
                        </Form.Item>
                       

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={{ marginRight: '10px', marginTop: '20px' }} type="primary" htmlType="submit">
                            Cập nhập
                        </Button>
                        <Link to={'/chagerpassword'}><button className='btn btn-dark'>Đổi mật khẩu</button></Link>
                        </Form.Item>
                    </Form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default ManageInfo