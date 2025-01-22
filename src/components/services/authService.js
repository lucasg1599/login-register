import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

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

    return {
      success: true,
      message: <p>Login feito com sucesso</p>,
      userData,
    };
  } catch (error) {
    console.error("Erro no login:", error);
    let errorMessage = "Credenciais inválidas.";
    switch (error.code) {
      case "auth/wrong-password":
        errorMessage ="Usuário não encontrado. Verifique seu email ou cadastre-se.";
        break;
      case "auth/user-not-found":
        errorMessage = "Usuário não encontrado.";
        break;
      case "auth/invalid-email":
        errorMessage = "Email inválido.";
        break;
      default:
        errorMessage = "Erro ao realizar login. Tente novamente.";
        break;
        case "auth/invalid-credential":
          errorMessage = "Usuário não encontrado. Verifique seu email ou cadastre-se.";
          break;
    };

    return { success: false, message: errorMessage };
  }
};
export const logout = async () => {
  try {
    await signOut(auth); 
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    console.error("Erro ao deslogar:", error.message);
    return false;
  }
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Após o sucesso no registro, retorna sucesso
    return { success: true };
  } catch (error) {
    console.error("Erro no registro:", error.message);
    let customMessage = "";

    // Ajuste nas mensagens de erro específicas
    switch (error.code) {
      case "auth/email-already-in-use":
        customMessage = "O email já está em uso";
        break;
      case "auth/weak-password":
        customMessage = "A senha deve ter pelo menos 6 caracteres";
        break;
      case "auth/invalid-email":
        customMessage = "O email fornecido é inválido";
        break;
      default:
        customMessage = "Falha no registro. Tente novamente mais tarde";
        break;
    }

    return {
      success: false,
      errorCode: customMessage,
    };
  }
};

