import Topbar from "../../components/topbar/Topbar";
import BottomBar from "../../components/bottombar/BottomBar";
import Dashboard1 from "../../components/Dashboard/Dashboard";

const Dashboard = () => {
  return (
    <>
      {/* <Topbar/> */}
      <div className="">
        <Dashboard1/>
      </div>
      <BottomBar/>
    </>
  );
};

export default Dashboard;
