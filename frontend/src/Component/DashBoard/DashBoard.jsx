import "./DashBoard.css";
import ChatBotIcon from "../ChatBot/ChatBotIcon";
import Footer from "../Partials/Footer";

function DashBoard() {
  const dashboardData = [
    { module: "Leave Applications", count: 4, status: "Pending", color: "#f59e0b" },
    { module: "Employee Onboarding", count: 2, status: "In Progress", color: "#3b82f6" },
    { module: "Payroll Processing", count: 1, status: "Completed", color: "#10b981" },
    { module: "Training Requests", count: 5, status: "New", color: "#8b5cf6" },
  ];

  return (
    <div className="dashboard">


      <main className="dashboard-main">
        <h2 className="dashboard-title">HRMS Dashboard Overview</h2>
        <div className="dashboard-cards">
          {dashboardData.map((item, index) => (
            <div className="dashboard-card" key={index} style={{ borderLeft: `6px solid ${item.color}` }}>
              <h3>{item.module}</h3>
              <p>Status: <strong>{item.status}</strong></p>
              <p className="card-count">{item.count}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <ChatBotIcon />
    </div>
  );
}

export default DashBoard;
