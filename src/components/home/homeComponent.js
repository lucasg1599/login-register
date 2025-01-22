import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isLoggedOut = await logout(); // Recebe o retorno da função logout
    if (isLoggedOut) {
      navigate("/login"); // Redireciona para a tela de login
    } else {
      console.error("Erro ao deslogar");
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Olá, seja bem-vindo</h2>

      <div style={styles.containerLogout}>
        <button
          type="button"
          style={styles.button}
          onClick={handleLogout}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onMouseDown={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonActive.backgroundColor)
          }
          onMouseUp={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
        >
          Sair
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(-45deg, #2F4F4F, #696969, #808080, #D3D3D3)",
    animation: "gradient 6s ease infinite",
    backgroundSize: "400% 400%",
  },
  containerLogout: {
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#ff1a1a",
  },
  buttonActive: {
    backgroundColor: "#e60000",
  },
};

export default Home;
