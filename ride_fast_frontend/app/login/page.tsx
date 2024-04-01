import Layout from '@/components/Layout/Layout'
import LoginForm from '@/components/LoginForm'
import React from 'react'

function page() {
  return (
    <Layout children={<LoginForm/>}/>
  )
}

export default page