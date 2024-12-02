import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import { isValidCPF } from "./cpfRegisterComponent";
import { register } from "../services/authService";
import styled from "styled-components";
import LoginButton from "../styledComponents/cadastr/loginButton";

const RegisterButton = styled(LoginButton)`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #808080;
  }
`;

const RegisterComponent = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !cpf) {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem");
      return;
    }

    if (!isValidCPF(cpf)) {
      setError("CPF invalido");
      return;
    }

    try {
      const response = await register(name, email, password, cpf);

      if (response.success) {
        setSuccessMessage("Registro feito com sucesso");
        setError("");
        setTimeout(() => {
          navigate("/login"); // Usando navigate para redirecionar para o login
        }, 1000);
      } else {
        switch (response.errorCode) {
          case "auth/email-already-in-use":
            setError("Email já existe");
            break;
          case "auth/invalid-cpf":
            setError("CPF invalido");
            break;
        }
        setSuccessMessage("");
      }
    } catch (error) {
      setError("Falha ao fazer o registro");
      setSuccessMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1>Registre-se</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            style={styles.input}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            style={styles.input}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua Senha"
            style={styles.input}
          />
          {error && <div style={styles.errorMessage}>{error}</div>}
          {successMessage && (
            <>
              <div style={styles.successMessage}>{successMessage}</div>
              <p>Login feito com sucesso</p>
            </>
          )}
          <div style={styles.containerButton}>
            <RegisterButton type="submit">Registrar</RegisterButton>
          </div>
        </form>
        <div
          style={styles.switchLink}
          onClick={() => navigate("/login")} // Usando navigate para redirecionar
        >
          Já tem uma conta? Entre
        </div>
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
    backgroundColor: "#f0f0f0",
    padding: "5px",
  },
  formContainer: {
    backgroundColor: "#778899", 
    alignItems:"center", 
    justifyContent: "center", 
    padding: "70px", 
    borderRadius: "8px",
    width: "100%",
    maxWidth: "500px", 
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px", 
  },
  input: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  containerButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    margin: "10px 0",
  },
  errorMessage: {
    color: "#ff4d4d",
    fontSize: "16px",
    margin: "10px 0",
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
};

export default RegisterComponent;
