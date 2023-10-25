import Profile1 from "../../components/Account/Profile";
import Topbar from "../../components/topbar/Topbar";
import BottomBar from "../../components/bottombar/BottomBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { checkTokenExpiration } from "../../utils/token";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkTokenExpiration();
    const token = localStorage.getItem("token");
    if (!token) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "warning",
        text: "Anda harus Login Terlebih dahulu!",
      });
      navigate("/");
    }
  });
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
