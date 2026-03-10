import swaggerUi from 'swagger-ui-express';
import { env } from '../config/env.js';

const serverUrl = `http://localhost:${env.port}`;

const successEnvelope = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    data: { type: 'object', additionalProperties: true }
  }
};

const errorEnvelope = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    message: { type: 'string', example: 'Authentication token is required' }
  }
};

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'LedgerAxis API',
    version: '1.0.0',
    description: 'Tenant-aware internal SaaS API for company records, directors, authentication, and analytics.'
  },
  servers: [
    {
      url: serverUrl,
      description: 'Local development server'
    }
  ],
  tags: [
    { name: 'Auth' },
    { name: 'Companies' },
    { name: 'Analytics' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      SuccessEnvelope: successEnvelope,
      ErrorEnvelope: errorEnvelope,
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'seed.admin1@example.com' },
          password: { type: 'string', format: 'password', example: 'Password123!' }
        }
      },
      RegisterRequest: {
        type: 'object',
        required: ['tenantId', 'fullName', 'email', 'password'],
        properties: {
          tenantId: { type: 'integer', example: 1 },
          fullName: { type: 'string', example: 'Seed Admin One' },
          email: { type: 'string', format: 'email', example: 'seed.admin1@example.com' },
          password: { type: 'string', format: 'password', example: 'Password123!' },
          role: { type: 'string', enum: ['admin', 'manager', 'viewer'], example: 'admin' }
        }
      },
      AuthResponse: {
        allOf: [
          { $ref: '#/components/schemas/SuccessEnvelope' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                  user: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        ]
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          tenantId: { type: 'integer', example: 1 },
          fullName: { type: 'string', example: 'Seed Admin One' },
          email: { type: 'string', example: 'seed.admin1@example.com' },
          role: { type: 'string', example: 'admin' },
          tenantName: { type: 'string', example: 'Northstar Holdings' }
        }
      },
      Company: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 101 },
          tenantId: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Atlas Ventures 101' },
          registrationNumber: { type: 'string', example: 'REG-00101-88' },
          industry: { type: 'string', example: 'Technology' },
          revenue: { type: 'number', example: 24500000.5 },
          employeeCount: { type: 'integer', example: 240 },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      CompanyWriteRequest: {
        type: 'object',
        required: ['name', 'registrationNumber', 'industry', 'revenue', 'employeeCount'],
        properties: {
          name: { type: 'string', example: 'LedgerAxis Labs Sdn Bhd' },
          registrationNumber: { type: 'string', example: 'REG-99999-11' },
          industry: { type: 'string', example: 'Technology' },
          revenue: { type: 'number', example: 1250000 },
          employeeCount: { type: 'integer', example: 45 }
        }
      },
      CompanyUpdateRequest: {
        type: 'object',
        minProperties: 1,
        properties: {
          name: { type: 'string', example: 'LedgerAxis Labs Sdn Bhd' },
          registrationNumber: { type: 'string', example: 'REG-99999-11' },
          industry: { type: 'string', example: 'Technology' },
          revenue: { type: 'number', example: 1250000 },
          employeeCount: { type: 'integer', example: 45 }
        }
      },
      CompanyListResponse: {
        allOf: [
          { $ref: '#/components/schemas/SuccessEnvelope' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Company' }
                  },
                  pagination: {
                    type: 'object',
                    properties: {
                      page: { type: 'integer', example: 1 },
                      limit: { type: 'integer', example: 20 },
                      total: { type: 'integer', example: 100 },
                      totalPages: { type: 'integer', example: 5 }
                    }
                  }
                }
              }
            }
          }
        ]
      },
      Director: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 5 },
          fullName: { type: 'string', example: 'Alicia Tan' },
          nationality: { type: 'string', example: 'Malaysian' },
          birthYear: { type: 'integer', example: 1978 }
        }
      },
      CompanyDirectorsResponse: {
        allOf: [
          { $ref: '#/components/schemas/SuccessEnvelope' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  company: { $ref: '#/components/schemas/Company' },
                  directors: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Director' }
                  }
                }
              }
            }
          }
        ]
      },
      IndustrySummaryItem: {
        type: 'object',
        properties: {
          industry: { type: 'string', example: 'Technology' },
          company_count: { type: 'integer', example: 42 },
          avg_revenue: { type: 'number', example: 15500000.25 }
        }
      },
      TopCompanyItem: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 10 },
          name: { type: 'string', example: 'Quantum Systems 10' },
          industry: { type: 'string', example: 'Manufacturing' },
          revenue: { type: 'number', example: 90000000 },
          employee_count: { type: 'integer', example: 1800 },
          director_count: { type: 'integer', example: 6 }
        }
      }
    }
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessEnvelope' }
              }
            }
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a user under a tenant',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          '400': { description: 'Validation or tenant error' },
          '409': { description: 'Email already in use' }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate and receive JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Authenticated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorEnvelope' }
              }
            }
          }
        }
      }
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user context',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Current user',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/SuccessEnvelope' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/User' }
                      }
                    }
                  ]
                }
              }
            }
          },
          '401': {
            description: 'Unauthenticated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorEnvelope' }
              }
            }
          }
        }
      }
    },
    '/api/companies': {
      get: {
        tags: ['Companies'],
        summary: 'List tenant companies',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
        ],
        responses: {
          '200': {
            description: 'Paginated company list',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CompanyListResponse' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Companies'],
        summary: 'Create a company in the current tenant',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CompanyWriteRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Created company',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/SuccessEnvelope' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/Company' }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    '/api/companies/search': {
      get: {
        tags: ['Companies'],
        summary: 'Search companies by name or registration number',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'q', in: 'query', schema: { type: 'string' }, required: true },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
        ],
        responses: {
          '200': {
            description: 'Search results',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CompanyListResponse' }
              }
            }
          }
        }
      }
    },
    '/api/companies/{id}': {
      get: {
        tags: ['Companies'],
        summary: 'Get a single company',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          '200': {
            description: 'Company detail',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/SuccessEnvelope' },
                    {
                      type: 'object',
                      properties: {
                        data: { $ref: '#/components/schemas/Company' }
                      }
                    }
                  ]
                }
              }
            }
          },
          '404': { description: 'Company not found' }
        }
      },
      put: {
        tags: ['Companies'],
        summary: 'Update a company',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CompanyUpdateRequest' }
            }
          }
        },
        responses: {
          '200': { description: 'Updated company' },
          '404': { description: 'Company not found' }
        }
      },
      delete: {
        tags: ['Companies'],
        summary: 'Delete a company',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          '200': {
            description: 'Delete result',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/SuccessEnvelope' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            deleted: { type: 'boolean', example: true }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    '/api/companies/{id}/directors': {
      get: {
        tags: ['Companies'],
        summary: 'Get company directors',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          '200': {
            description: 'Company with directors',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CompanyDirectorsResponse' }
              }
            }
          }
        }
      }
    },
    '/api/analytics/industry-summary': {
      get: {
        tags: ['Analytics'],
        summary: 'Aggregate companies by industry',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Industry summary',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/SuccessEnvelope' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/IndustrySummaryItem' }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    '/api/analytics/top-companies': {
      get: {
        tags: ['Analytics'],
        summary: 'List top companies by revenue',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
        ],
        responses: {
          '200': {
            description: 'Top companies',
            content: {
              'application/json': {
                schema: {
                  allOf: [
                    { $ref: '#/components/schemas/SuccessEnvelope' },
                    {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/TopCompanyItem' }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    '/api/analytics/advanced-queries': {
      get: {
        tags: ['Analytics'],
        summary: 'Inspect advanced SQL-backed query examples',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'companyId', in: 'query', schema: { type: 'integer' } }
        ],
        responses: {
          '200': {
            description: 'Advanced query examples',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessEnvelope' }
              }
            }
          }
        }
      }
    }
  }
};

export const configureSwagger = (app) => {
  if (!env.apiDocsEnabled) {
    return;
  }

  app.get('/api/docs.json', (_req, res) => {
    res.json(openApiSpec);
  });

  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
      customSiteTitle: 'LedgerAxis API Docs',
      swaggerOptions: {
        persistAuthorization: true
      }
    })
  );
};
