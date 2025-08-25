
export interface User {
  id: string;
  name: string;
  userName: string;
}

export interface UserLogin {
  userName: string;
  passWord: string;
}

export interface UserPost {
  name: string;
  userName: string;
  passWord: string;
}
export type SpinIconProps = {
  size?: number;
  color?: string;
  duration?: number;
};

export interface DashboardProps {
    totalCostumers: number;
    availableParking: number;
    occupiedParking: number;
    paymentPending: number;
}
