import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import api from "./api";


export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      const userData = {
        uid: user.uid,
        token,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      const response = await api.get("/private/users/getLoggedUser");

      if (response.status === 200) {
        userData.loggedInUserDetails = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        return {
          success: true,
          message:<p>Login feito com sucesso</p>,
          userData,
        };
      } else {
        localStorage.removeItem("user");
        return { success: false, message: "Credenciais inválidas." };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: "Credenciais inválidas." };
    }
  };
  
  export const register = async (name, email, password, cpf) => {
    try {
      const userData = {
        name,
        email,
        fiscalNumber: cpf,
        password,
      };

      const response = await api.post("/public/auth/register", userData);

      if (response.status === 201) {
        return { success: true };
      } else {
        return { success: false, errorCode: response.data.errorCode };
      }
    } catch (error) {
      console.error("Erro no registro:", error.response?.data || error.message);
      
     
      const errorCode = error.response?.data?.errorCode;

      let customMessage = "";
      if (errorCode === "EMAIL_EXISTS") {
        customMessage = "auth/email-already-in-use";
      } else if (errorCode === "INVALID_CPF") {
        customMessage = "auth/invalid-cpf";
      } else {
        customMessage = "auth/registration-failed"; 
      }

      return {
        success: false,
        errorCode: customMessage,
      };
    }
  };
