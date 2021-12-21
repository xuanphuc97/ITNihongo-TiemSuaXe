import React from 'react'
import SideNav from "../slidebar/SideNav"
import UserInfo from "../users/UserInfo"
import GarageInfo from "../garages/GarageInfo"

function Admin() {
    return (
        <div className="admin">
            <SideNav></SideNav>
            <UserInfo></UserInfo>
            <GarageInfo></GarageInfo>
        </div>
    )
}

export default Admin
