import Topbar2 from "../../components/topbar/Topbar2";
import Profile1 from "../../components/Account/Profile";
import Topbar from "../../components/topbar/Topbar";
import BottomBar from "../../components/bottombar/BottomBar";

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="pt-14">
        <Profile1 />
      </div>
      <BottomBar />
    </>
  );
};

export default Profile;
