# Sabbir Dev Portfolio V2 - Frontend

A modern, full-stack portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ **Authentication System**: JWT-based authentication with protected routes
- ✅ **Blog Management**: Full CRUD operations for blog posts (Admin only)
- ✅ **Project Showcase**: Dynamic project display with management capabilities
- ✅ **About Me Section**: Personal information with SSG
- ✅ **Responsive Design**: Mobile-first approach with dark/light mode
- ✅ **ISR (Incremental Static Regeneration)**: For blogs and projects
- ✅ **SSG (Static Site Generation)**: For about page
- ✅ **Rich Text Editor**: For blog content creation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: FontAwesome, Lucide
- **Animations**: GSAP
- **State Management**: React Context
- **Forms**: React Hook Form (planned)
- **Notifications**: react-hot-toast

## Project Structure

```
├── app/
│   ├── (public)/              # Public routes
│   │   ├── page.tsx          # Home page
│   │   ├── about/            # About page (SSG)
│   │   ├── projects/         # Projects (ISR)
│   │   ├── blogs/            # Blogs (ISR)
│   │   └── contact/          # Contact page
│   ├── admin/                # Protected admin routes
│   │   ├── dashboard/        # Dashboard
│   │   └── login/            # Login page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── shared/               # Shared components
│   ├── ui/                   # UI components
│   └── auth/                 # Auth components
├── contexts/
│   └── AuthContext.tsx       # Auth state management
├── lib/
│   ├── api.ts                # API utilities
│   └── utils.ts              # Helper functions
└── data/                     # Static data
    ├── menu.ts
    ├── socials.ts
    ├── education.ts
    └── skills.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or cloud)
- Backend server running on port 3001

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional: Analytics, etc.
```

## Key Pages and Features

### Public Pages

1. **Home (`/`)**: Hero section, featured projects, skills, blog preview
2. **About (`/about`)**: Personal info, education, experience (SSG)
3. **Projects (`/projects`)**: All projects with filtering (ISR)
4. **Project Details (`/projects/[id]`)**: Individual project page (ISR)
5. **Blogs (`/blogs`)**: All blog posts (ISR)
6. **Blog Post (`/blogs/[id]`)**: Individual blog page (ISR)
7. **Contact (`/contact`)**: Contact form

### Protected Pages (Admin Only)

1. **Login (`/admin/login`)**: Admin authentication
2. **Dashboard (`/admin/dashboard`)**: Manage blogs and projects
3. **Create/Edit Blog**: Rich text editor for blog management
4. **Create/Edit Project**: Form for project management

## Implementation Status

### ✅ Completed

- Project structure and setup
- Backend API integration
- Authentication system
- Static data files
- Header and Footer components
- CSS styling with v1 design

### 🚧 In Progress

- Public pages (Home, About, Projects, Blogs, Contact)
- Admin dashboard
- Blog management UI
- Project management UI
- Form validation
- ISR implementation
- SSG implementation

### TODO

- Rich text editor integration
- Image upload functionality
- Advanced filtering and search
- SEO optimization
- Performance optimization
- Testing
- Deployment configuration

## API Integration

The frontend communicates with the backend API through utility functions in `lib/api.ts`:

### Auth API

- `authAPI.login(email, password)`
- `authAPI.verify(token)`
- `authAPI.getProfile(token)`

### Blog API

- `blogAPI.getAll(published?)`
- `blogAPI.getById(id)`
- `blogAPI.create(token, blogData)` (protected)
- `blogAPI.update(token, id, blogData)` (protected)
- `blogAPI.delete(token, id)` (protected)

### Project API

- `projectAPI.getAll(featured?)`
- `projectAPI.getById(id)`
- `projectAPI.create(token, projectData)` (protected)
- `projectAPI.update(token, id, projectData)` (protected)
- `projectAPI.delete(token, id)` (protected)

## Next.js Features Used

### ISR (Incremental Static Regeneration)

Used for blog and project pages to enable dynamic updates without full rebuilds:

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

### SSG (Static Site Generation)

Used for the About page for optimal performance:

```typescript
export async function generateStaticParams() {
  // Generate static paths
}
```

### Server Components

Used by default for better performance and SEO.

### Client Components

Used for interactive components (marked with "use client").

## Styling

The project uses Tailwind CSS with custom configurations from v1:

- **Dark/Light Mode**: Automatic theme switching
- **Custom Fonts**: Inter Light and Regular
- **Animations**: GSAP for smooth transitions
- **Responsive Design**: Mobile-first approach

## Development Guidelines

1. **Component Structure**: Keep components small and reusable
2. **TypeScript**: Use proper types for all props and functions
3. **Error Handling**: Implement proper error boundaries and try-catch blocks
4. **Loading States**: Show loading indicators for async operations
5. **Accessibility**: Follow WCAG guidelines
6. **Performance**: Optimize images and lazy load components

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## License

MIT License - feel free to use for your own portfolio!

## Credits

- Design inspiration from v1
- Built with Next.js and TypeScript
- UI components from shadcn/ui
