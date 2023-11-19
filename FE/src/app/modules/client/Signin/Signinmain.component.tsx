import React, { FunctionComponent } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Button, Form, Input, message } from 'antd';
import {css} from '@emotion/react'
import { SigninAuth } from '~/app/api/auth/ApiAuth';
import { useNavigate } from 'react-router-dom';
interface SigninmainProps {}

type FieldType = {
  email?: string;
  password?: string;
};

const Signinmain: FunctionComponent<SigninmainProps> = () => {
  const navigate = useNavigate()
  const onFinish = (data: any) => {
    SigninAuth(data).then((res) => {
        if (res) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('userID', res.data.user._id);
            localStorage.setItem("emailUser", res.data.user.email)
            message.success("Chào mừng đến với PolyBook", () => {
                navigate("/");
                location.reload();
            });
        }
        localStorage.setItem("checkAuth", res.data.user.role)
    },

        (err) => {
            message.error(err.response.data)
        })
}

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container" css={cssSignin}>
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
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
            <Form.Item wrapperCol={{ offset: 1, span: 5 }}>
              <div className='text-center'>
                  <Button type="primary" htmlType="submit">
                    Đăng Nhập
                  </Button>
              </div>
            </Form.Item>
          </Form>
          <div className='text-center'>
          <a href="" className='text-decoration-none'>Quên Mật Khẩu?</a>
        </div>
        <div className='text-center mt-2'>
          <p className='text-decoration-none'>Chưa đăng ký? <a href="/signup">Đăng ký</a></p>
        </div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='text-center'>
              <h3 className='p-4 logo'>POLYBOOK</h3>
              <p> Đăng nhập ngay để nhận được nhiều ưu đãi!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signinmain;
const cssSignin = css`
  .logo{
    color: #0060ae
  }
`