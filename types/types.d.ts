import { LucideIcon } from "lucide-react";

interface PizzaTypes {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: number;
    image: string;
    popular: boolean;
}

interface AuthFormTypes {
    name?: string;
    email: string;
    password: string;

}

interface OurStoryItemProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface AboutStatProps {
  number: string;
  label: string;
  description: string;
};

interface AboutValuesProps {
    icon: LucideIcon;
    title: string;
    description: string;
}


