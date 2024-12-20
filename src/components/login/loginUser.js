import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Torne a função assíncrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess("");

    if (!username || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await login(username, password);

      if (response.success) {
        setSuccess("Login feito com sucesso!");
        setErrorMessage("");
        navigate("/home"); 
      } else {
        setErrorMessage(response.message); 
      }
    } catch (error) {
      setErrorMessage("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Bem-vindo!</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Entrar
          </button>
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          {success && <p style={styles.successMessage}>{success}</p>}
          <p
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Não tem uma conta? <strong>Cadastre-se</strong>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(-45deg, #2F4F4F, #696969, #808080, #D3D3D3)",
    animation: "gradient 6s ease infinite",
    backgroundSize: "400% 400%",
  },
  loginBox: {
    backgroundColor: "#3c3c3c",
    padding: "40px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    color: "#fff",
    width: "100%",
    maxWidth: "300px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputGroup: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#f5f5f5",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#af40ff",
    padding: "15px",
    borderRadius: "25px",
    border: "none",
    width: "100%",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  successMessage: {
    color: "lightgreen",
    fontSize: "14px",
    marginTop: "10px",
  },
  registerLink: {
    color: "#fff",
    cursor: "pointer",
    marginTop: "20px",
    textDecoration: "underline",
  },
};

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  </style>`
);

export default Login;
