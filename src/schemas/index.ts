import { z } from 'zod';

/**
 * Zod Validation Schemas
 * Type-safe form validation for all models
 * 
 * Benefits:
 * - Automatic TypeScript type inference
 * - Reusable across frontend and backend
 * - Better error messages for users
 * - Runtime validation + compile-time types
 * 
 * @module schemas
 */

/**
 * Service validation schema
 * 
 * Rules:
 * - Title: 3-100 characters
 * - Description: minimum 10 characters
 * - Icon: optional string (emoji or CSS class)
 * - isActive: boolean, defaults to true
 */
export const serviceSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    icon: z.string().optional(),
    isActive: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

/**
 * Portfolio validation schema
 * 
 * Rules:
 * - Title: 3-100 characters
 * - Description: minimum 10 characters
 * - Slug: lowercase with hyphens only (URL-friendly)
 * - Image URL: must be valid URL
 * - Category: predefined enum values
 * - Technologies: array with at least one item
 */
export const portfolioSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
    imageUrl: z.string().url('Must be a valid URL'),
    category: z.enum(['Shopify', 'WordPress', 'Squarespace', 'E-commerce', 'Custom']),
    clientName: z.string().min(2),
    industry: z.string().min(2),
    technologies: z.array(z.string()).min(1, 'At least one technology required'),
    projectUrl: z.string().url().optional().or(z.literal('')),
    completedDate: z.string(),
    featured: z.boolean().default(false),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;

// Blog Schema
export const blogSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200),
    slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
    content: z.string().min(50, 'Content must be at least 50 characters'),
    excerpt: z.string().max(300).optional(),
    featuredImage: z.string().url().optional().or(z.literal('')),
    category: z.string().min(2),
    author: z.string().min(2),
    tags: z.array(z.string()).optional(),
    publishedAt: z.date().optional().nullable(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

// Career Schema
export const careerSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    department: z.string().min(2),
    location: z.string().min(2),
    type: z.enum(['Full-time', 'Part-time', 'Contract']),
    experience: z.string().min(2),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    requirements: z.array(z.string()).min(1, 'At least one requirement needed'),
    responsibilities: z.array(z.string()).min(1, 'At least one responsibility needed'),
    isActive: z.boolean().default(true),
});

export type CareerFormData = z.infer<typeof careerSchema>;

// Contact Schema (for validation if needed)
export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
