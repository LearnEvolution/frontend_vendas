function Dashboard() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Bem-vindo ao Sistema de Vendas!</h1>

      <button
        onClick={handleLogout}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
