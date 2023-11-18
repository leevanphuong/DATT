import React, { FC, Fragment, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUserDetail } from '../api/auth/ApiAuth'

type Props = {}

export const CheckAuth: FC<any> = ({ children }): any => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('accessToken')
    const userSystem = localStorage.getItem('userID')
    const userSystem1 = localStorage.getItem('checkAuth')
    useEffect(() => {
        getUserDetail(userSystem).then((res) => {
            if (res.data.role !== 'ADMIN') {
                navigate('/')
                return null
            }
        })
    }, [navigate])

    return <Fragment>{accessToken && userSystem1 === 'ADMIN' || userSystem1 === 'USER_STORE' ? children : <Navigate to='/' />}</Fragment>
}