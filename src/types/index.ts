// TypeScript types for the application

export interface Service {
    _id?: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    category: string;
    features: string[];
    technologies: string[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface Portfolio {
    _id?: string;
    title: string;
    slug: string;
    description: string;
    category: 'Shopify' | 'WordPress' | 'Squarespace' | 'E-commerce' | 'Custom' | 'AI' | 'UI & UX';
    imageUrl: string;
    clientName: string;
    industry: string;
    technologies: string[];
    projectUrl?: string;
    completedDate: string;
    featured: boolean;
    createdAt: Date;
}

export interface Blog {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    imageUrl: string;
    publishedAt: Date;
    isPublished: boolean;
    views: number;
    createdAt: Date;
}

export interface Career {
    _id?: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    experience: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    postedDate: Date;
    isActive: boolean;
}

export interface Contact {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    submittedAt: Date;
}

export interface User {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'editor';
    createdAt: Date;
}

export interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    content: string;
    avatar?: string;
}

export interface Technology {
    name: string;
    category: string;
    icon?: string;
}
