import GarageProfile from '../garage/GarageProfile'
import logo from "../home/logo.png"
import Profile from "../profile/Profile"
import Editprofile from "../profile/EditProfile"
function Home() {
  return (
    <>
      <div>
        <Profile></Profile>
        <Editprofile></Editprofile>
        <GarageProfile></GarageProfile>
        {/* <img
          width="50%"
          height="50%"
          alt="anh minh hoa"
          src="https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg"
        ></img> */}
        <br />
      </div>
    </>
  );
}
export default Home;
