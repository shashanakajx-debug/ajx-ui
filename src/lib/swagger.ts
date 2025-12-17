/**
 * OpenAPI 3.0 Specification for AJX Technologies API
 */

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'AJX Technologies API',
        version: '1.0.0',
        description: 'API documentation for AJX Technologies website backend',
        contact: {
            name: 'AJX Technologies',
            email: 'admin@ajxtechnologies.com',
            url: 'https://ajxtechnologies.com'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        },
        {
            url: 'https://ajxtechnologies.com',
            description: 'Production server'
        }
    ],
    tags: [
        { name: 'Services', description: 'Service management endpoints' },
        { name: 'Portfolio', description: 'Portfolio management endpoints' },
        { name: 'Blog', description: 'Blog management endpoints' },
        { name: 'Career', description: 'Career management endpoints' },
        { name: 'Contact', description: 'Contact form endpoints' }
    ],
    paths: {
        '/api/services': {
            get: {
                tags: ['Services'],
                summary: 'Get all services',
                description: 'Retrieve a list of all active services',
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Service'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Server error'
                    }
                }
            },
            post: {
                tags: ['Services'],
                summary: 'Create a new service',
                description: 'Add a new service to the database',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ServiceInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Service created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' },
                                        id: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '500': {
                        description: 'Server error'
                    }
                }
            }
        },
        '/api/services/{id}': {
            put: {
                tags: ['Services'],
                summary: 'Update a service',
                description: 'Update an existing service by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Service ID',
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ServiceInput'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Service updated successfully'
                    },
                    '404': {
                        description: 'Service not found'
                    },
                    '500': {
                        description: 'Server error'
                    }
                }
            },
            delete: {
                tags: ['Services'],
                summary: 'Delete a service',
                description: 'Remove a service from the database',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Service ID',
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Service deleted successfully'
                    },
                    '404': {
                        description: 'Service not found'
                    },
                    '500': {
                        description: 'Server error'
                    }
                }
            }
        },
        '/api/portfolio': {
            get: {
                tags: ['Portfolio'],
                summary: 'Get all portfolio items',
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Portfolio'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Portfolio'],
                summary: 'Create portfolio item',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/PortfolioInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Portfolio item created' },
                    '500': { description: 'Server error' }
                }
            }
        },
        '/api/blog': {
            get: {
                tags: ['Blog'],
                summary: 'Get all blog posts',
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Blog'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Blog'],
                summary: 'Create blog post',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/BlogInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Blog post created' },
                    '500': { description: 'Server error' }
                }
            }
        },
        '/api/contact': {
            get: {
                tags: ['Contact'],
                summary: 'Get all contact submissions',
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Contact'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Contact'],
                summary: 'Submit contact form',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ContactInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Contact form submitted' },
                    '400': { description: 'Validation error' },
                    '500': { description: 'Server error' }
                }
            }
        }
    },
    components: {
        schemas: {
            Service: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                    title: { type: 'string', example: 'Web Development' },
                    slug: { type: 'string', example: 'web-development' },
                    description: { type: 'string', example: 'Professional web development services' },
                    icon: { type: 'string', example: 'Code' },
                    category: { type: 'string', example: 'Development' },
                    features: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['Responsive Design', 'SEO Optimized']
                    },
                    technologies: {
                        type: 'array',
                        items: { type: 'string' },
                        example: ['React', 'Next.js', 'TypeScript']
                    },
                    isActive: { type: 'boolean', example: true },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                }
            },
            ServiceInput: {
                type: 'object',
                required: ['title', 'description'],
                properties: {
                    title: { type: 'string' },
                    slug: { type: 'string' },
                    description: { type: 'string' },
                    icon: { type: 'string' },
                    category: { type: 'string' },
                    features: { type: 'array', items: { type: 'string' } },
                    technologies: { type: 'array', items: { type: 'string' } },
                    isActive: { type: 'boolean' }
                }
            },
            Portfolio: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    slug: { type: 'string' },
                    description: { type: 'string' },
                    imageUrl: { type: 'string' },
                    projectUrl: { type: 'string' },
                    category: { type: 'string' },
                    technologies: { type: 'array', items: { type: 'string' } },
                    completedDate: { type: 'string' },
                    featured: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' }
                }
            },
            PortfolioInput: {
                type: 'object',
                required: ['title', 'description'],
                properties: {
                    title: { type: 'string' },
                    slug: { type: 'string' },
                    description: { type: 'string' },
                    imageUrl: { type: 'string' },
                    projectUrl: { type: 'string' },
                    category: { type: 'string' },
                    technologies: { type: 'array', items: { type: 'string' } },
                    completedDate: { type: 'string' },
                    featured: { type: 'boolean' }
                }
            },
            Blog: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    slug: { type: 'string' },
                    excerpt: { type: 'string' },
                    content: { type: 'string' },
                    featuredImage: { type: 'string' },
                    author: { type: 'string' },
                    category: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    published: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' }
                }
            },
            BlogInput: {
                type: 'object',
                required: ['title', 'content'],
                properties: {
                    title: { type: 'string' },
                    slug: { type: 'string' },
                    excerpt: { type: 'string' },
                    content: { type: 'string' },
                    featuredImage: { type: 'string' },
                    author: { type: 'string' },
                    category: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    published: { type: 'boolean' }
                }
            },
            Contact: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    company: { type: 'string' },
                    subject: { type: 'string' },
                    message: { type: 'string' },
                    status: { type: 'string', enum: ['new', 'read', 'replied'] },
                    submittedAt: { type: 'string', format: 'date-time' }
                }
            },
            ContactInput: {
                type: 'object',
                required: ['name', 'email', 'subject', 'message'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    company: { type: 'string' },
                    subject: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        }
    }
};

export default swaggerDefinition;
