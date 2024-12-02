import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (username === "" || password === "") {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const { success: loginSuccess, message: loginMessage } = await login(
        username,
        password
      );
      if (loginSuccess) {
        setSuccess(loginMessage);
        setError("");
      }
    } catch (error) {
      setError("Credenciais invalidas");
      setSuccess("");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Entrar
        </button>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        <div
          style={styles.switchLink}
          onClick={() => navigate("/register")} // Usando navigate para redirecionar
        >
          Já tem uma conta? Entre
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  switchLink: {
    background: "none",
    border: "none",
    color: "black",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "16px",
    padding: 0,
    margin: "10px 0",
    textAlign: "center",
  },
  form: {
    backgroundColor: "white",
    padding: "60px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "90%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Login;
