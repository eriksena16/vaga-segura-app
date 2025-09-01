
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

export interface PaymentProps {
  id: string;
  costumerId: string;
  costumer?: CostumerProps;
  amount: number;
  dueDate: string;
  paymentSatus: "Pending" | "Paid";
}
export interface CostumerProps {
  id: string
  parkingId: string
  parking?: ParkingProps
  name: string
  phone: string
  plate: string
  amount: number
  dueDay: number
  createdAt: string
  updatedAt: string,
  isPaid: string
}

export interface ParkingProps {
  id: string
  status: string
  location: string
  costumer?: CostumerProps
}

export interface CustomerListProps {
  costumers: CostumerProps[];
  paid?: boolean;
};
export interface PaymentListProps {
  payments: PaymentProps[];
  paid?: boolean;
};

export interface ParkingListProps {
  parkings: ParkingProps[];
  available?: boolean;
};
