
export interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  image: string;
  specialty: string;
}

export interface StyleAdvice {
  recommendation: string;
  tips: string[];
  maintenance: string;
}
