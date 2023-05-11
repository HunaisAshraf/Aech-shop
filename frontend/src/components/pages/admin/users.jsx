import React from 'react'
import Layout from '../../layout/layout'
import AdminMenu from '../../layout/adminMenu'

const Users = () => {
  return (
    <Layout title={"Manage-Users"}>
    <div className="container-fluid m-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <h1>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users