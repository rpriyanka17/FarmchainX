import Cards from "../../components/Cards";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">📊 Overview</h2>
      <div className="dashboard-grid">
        <Cards title="👨‍🌾 Farmers" value="124" color="blue" />
        <Cards title="🌾 Products" value="350" color="green" />
        <Cards title="🛒 Consumers" value="890" color="purple" />
        <Cards title="⏳ Pending Approvals" value="27" color="orange" />
      </div>
    </div>
  );
};

export default Dashboard;
