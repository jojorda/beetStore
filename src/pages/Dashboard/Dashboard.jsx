import Topbar from "../../components/topbar/Topbar";
import Dashboard1 from "../../components/Dashboard/Dashboard";

const Dashboard = () => {
  return (
    <>
      <Topbar/>
      <div className="pt-14">
        <Dashboard1/>
      </div>
    </>
  );
};

export default Dashboard;
