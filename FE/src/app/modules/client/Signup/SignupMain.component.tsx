import React, { FunctionComponent } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Button, Form, Input, message } from 'antd';
import {css} from '@emotion/react'
import { SignupAuth } from '~/app/api/auth/ApiAuth';
import { useNavigate } from 'react-router-dom';
interface SignupmainProps {}

type FieldType = {
  email?: string;
  password?: string;
  name?: string; 
  phoneNumber: string;
  address: string,
  confirmPassword?: string;
};

const Signupmain: FunctionComponent<SignupmainProps> = () => {
  const navigate = useNavigate()
  const onFinish = (data: any) => {
    SignupAuth(data).then(
      (res) => {
        if (res) {
          message.success('Đăng ký thành công')
          setTimeout(()=>{
            navigate('/signin')
          },2000)
        }
      },
      (err) => {
        message.error(err.response.data)
      }
    )
  }
  const onFinishFailed = (errorInfo: any) => {
    message.error("Kiểm tra lại các trường")
  };

  return (
    <div className="container" css={cssSignin}>
      <div className="row">
        <div className="col-12 col-md-8 mt-5">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelAlign='left'
          >
            <Form.Item<FieldType>
              label="Username"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng điền Username' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Vui lòng điền phoneNumber' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng điền email' },
                { type: 'email', message: 'Nhập đúng email' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng điền password' }]}
            >
              <Input.Password
                iconRender={(visible) => (visible ? <AiFillEye /> : <AiFillEyeInvisible />)}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                iconRender={(visible) => (visible ? <AiFillEye /> : <AiFillEyeInvisible />)}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
              <div className='text-center'>
                  <Button type="primary" htmlType="submit">
                    Đăng ký 
                  </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className='col-12 col-md-4'>
        <div className='text-center'>
              <h3 className='p-4 logo'>POLYBOOK</h3>
              <p> Đăng ký ngay để nhận được nhiều ưu đãi!</p>
          </div>
        <div className='text-center mt-2'>
          <p className='text-decoration-none'>Bạn đã có tài khoản?<a className='pl-2' href="/signin">Đăng nhập</a></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Signupmain;
const cssSignin = css`
  .logo{
    color: #0060ae
  }
`