import axios from "axios";
import { DataProps } from "../context/AuthContext";
import { erroProps } from "../types/errorTypes";
import { UserLogin, UserPost } from "../types/userTypes";
import { AUTH_LOGIN, AUTH_REGISTER, NEXT_PUBLIC_API_URL } from "../utils/endpoints";
import api from "./api";


export async function postUserData(
  user: UserPost
): Promise<boolean | erroProps> {
  try {
    const response = await api.post(AUTH_REGISTER, {
      password: user.passWord,
      name: user.name,
      userName: user.userName,
    });

    return true;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data.errors);
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      const message = Object.values(error.response.data.errors);
      console.log(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    }
  }
}

export async function loginUser(
  userlogin: UserLogin
): Promise<erroProps | DataProps> {
  try {

    
    const response = await api.post(
      AUTH_LOGIN,
      {
        userName: userlogin.userName,
        password: userlogin.passWord,
      },
      { timeout: 5000 }
    );
  
 console.log("URL da API:", NEXT_PUBLIC_API_URL + AUTH_LOGIN);
 console.log(response?.data);
    return response?.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return <erroProps>{
        success: false,
        errors: ["servidor fora do ar"],
      };
    } else {
      if (error.response) {
        const message = Object.values(error.response.data.errors);
        return <erroProps>{
          success: false,
          errors: message,
        };
      }
    }
    if (error.response?.data) {
      const message = Object.values(error.response.data.errors);

      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      return <erroProps>{
        success: false,
        errors: ["Erro ao se conectar com o servidor"],
      };
    }
  }
}
