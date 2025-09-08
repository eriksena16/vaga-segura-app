
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
  totalCustomers: number;
  availableParking: number;
  occupiedParking: number;
  paymentPending: number;
}

export interface PaymentProps {
  id: string;
  customerId: string;
  customer?: CustomerProps;
  amount: number;
  dueDate: string;
  paymentSatus: "Pending" | "Paid";
}
export interface CustomerProps {
  id: string
  parkingId: string
  parking?: ParkingProps
  name: string
  phone: string
  plate: string
  amount: number
  dueDay: number
  createdAt?: string
  updatedAt?: string,
  isPaid?: string
}

export interface ParkingProps {
  id: string
  status: string
  location: string
  customer?: CustomerProps
}

export interface CustomerListProps {
  customers: CustomerProps[];
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
