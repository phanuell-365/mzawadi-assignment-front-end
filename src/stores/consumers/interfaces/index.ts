export interface CreateConsumer {
  name: string;
  email: string;
  phone: string;
}

export interface ConsumerObject {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  valueOfPoints: number;
}

export interface UpdateConsumer {
  name?: string;
  email?: string;
  phone?: string;
}
