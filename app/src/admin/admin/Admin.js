import React from 'react'
import SideNav from "../slidebar/SideNav"
import UserInfo from "../users/UserInfo"

function Admin() {
    return (
        <div className="admin">
            <SideNav></SideNav>
            <UserInfo></UserInfo>
        </div>
    )
}

export default Admin
