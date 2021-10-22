import Profile from "../profile/Profile";
import EditProfile from "../profile/EditProfile";
function Home() {
  return (
    <>
      <div>
        <Profile></Profile>
        <EditProfile></EditProfile>
        <img
          width="100%"
          height="690px"
          alt="anh minh hoa"
          src="https://images.unsplash.com/photo-1543782248-03e2c5a93e18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80"
        ></img>
      </div>
    </>
  );
}
export default Home;
