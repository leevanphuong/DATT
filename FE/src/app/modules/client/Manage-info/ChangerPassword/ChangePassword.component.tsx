import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react';
import { Button, Form, Input, message } from 'antd';
import { getOneAuth, updateAuth } from '~/app/api/auth/ApiAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
type Props = {}
type FieldType = {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?:string,
    address?:string
  };
const ChangePassword = (props: Props) => {
    const arrayPass = [

        {
            title: "Mật khẩu mới",
            field: "password"
        },
        {
            title: "Nhập lại Mật khẩu mới",
            field: "confirmNewPassword"
        },
    ]
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        const idUser = localStorage.getItem("userID")
        updateAuth(idUser, values).then((res:any)=>{
            if(res){
                message.success("Đổi mật khẩu thành công!")
                localStorage.removeItem("userID")
                localStorage.removeItem("accessToken")
                navigate("/signin")
            }
        }, (err)=> {
            message.error(err.response.data)
        })
        };
        
        const onFinishFailed = (errorInfo: any) => {
          console.log('Failed:', errorInfo);
        };
    return (
        <div css={cssPasswordForm} className='container mt-5'>
            <div className='row'>
                <div className='col-9 w-full mx-auto'>
                <h3 className='mb-3'>Đổi mật khẩu</h3>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        labelAlign='left'
                        >
                        {arrayPass.map((item) => (
                                <Form.Item
                                key={item.field}
                                label={item.title}
                                name={item.field}
                                rules={[{ required: true, message: `Please input ${item.title}!` }]}
                                >
                                <Input.Password />
                                </Form.Item>
                            ))}
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={{ marginRight: '10px', marginTop: '20px' }} type="primary" htmlType="submit">
                            Cập nhập
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword

const cssPasswordForm = css`
.title{
    font-weight: 600;
    font-size: 30px;
    line-height: 32px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #221f20;
    margin-bottom: 40px;
}
label{
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #6C6D70;
}
`

const cssBtn = css`
  width:100%; 
  margin-top:50px;
  padding: 12px 24px;
  border-radius: 16px 0px;
  font-size: 16px;
  line-height: 24px;
`