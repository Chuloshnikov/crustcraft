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

interface AboutTeamMemberCartTypes {
    name: string;
    role: string;
    bio: string;
    image: string;
    specialties: string[];
}

interface LocationsPropTypes {
  name: string;
  address: string;
  phone: string;
  hours: string;
  isMain: boolean;
};

interface UserTypes {
  email: string;
  name: string;
  image: string;
};

interface UserProfileTypes {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

interface UserInfoProps {
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  admin?: boolean;
}



