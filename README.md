# TwoSpoonDrive

A modern, full-featured cloud storage application inspired by Google Drive. Built with Next.js, TypeScript, PostgreSQL, and AWS S3, featuring Google OAuth authentication, file management, sharing capabilities, and a beautiful, responsive UI.

## 🚀 Features

- **Authentication**: Secure Google OAuth 2.0 authentication
- **File Management**: Upload, download, rename, delete, and organize files
- **Folder Structure**: Create nested folders and organize files hierarchically
- **File Sharing**: Share files with specific users or via public links with customizable permissions
- **File Types**: Support for documents, spreadsheets, presentations, videos, images, audio, PDFs, and archives
- **Search**: Full-text search across files and folders
- **Starred Files**: Mark important files for quick access
- **Trash System**: Soft delete with 30-day retention period
- **Storage Management**: Track storage usage with visual indicators
- **Modern UI**: Clean, responsive design with consistent light theme
- **File Type Icons**: Visual file type indicators with color-coded backgrounds

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with Google OAuth
- **File Storage**: AWS S3 (configurable)
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Lucide React icons
- **Animations**: Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **PostgreSQL** database (local or cloud-hosted)
- **AWS Account** (for S3 file storage)
- **Google Cloud Console** account (for OAuth)

## 🔧 Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd twospoondrive
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/twospoondrive?schema=public"

# NextAuth Configuration
AUTH_SECRET="your-auth-secret-here" # Generate using: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS S3 Configuration (Optional - for file storage)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_S3_BUCKET_NAME="your-s3-bucket-name"

# Node Environment
NODE_ENV="development"
```

### 4. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen:
   - User Type: External (for testing) or Internal (for organization)
   - Add scopes: `email`, `profile`
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret** to your `.env` file

### 5. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
   ```bash
   createdb twospoondrive
   ```
3. Update `DATABASE_URL` in `.env` with your credentials

#### Option B: Cloud PostgreSQL (Recommended for Production)

- **Vercel Postgres**: Integrated with Vercel deployments
- **Supabase**: Free tier available
- **Neon**: Serverless PostgreSQL
- **AWS RDS**: Production-grade PostgreSQL

### 6. Set Up AWS S3 (Optional)

If you want to use S3 for file storage:

1. Create an AWS account
2. Go to **S3** → **Create bucket**
3. Configure bucket settings:
   - Choose a unique bucket name
   - Select a region
   - Uncheck "Block all public access" (or configure CORS for public files)
4. Create an IAM user with S3 permissions:
   - Go to **IAM** → **Users** → **Create user**
   - Attach policy: `AmazonS3FullAccess` (or create custom policy)
   - Create access keys and add to `.env`

**Note**: For production, use IAM roles instead of access keys when deploying on AWS.

### 7. Run Database Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 8. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment Instructions

### Deploying to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

#### 1. Prepare for Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure all environment variables are documented

#### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (if repository root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install`

#### 3. Configure Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```env
DATABASE_URL
AUTH_SECRET
NEXTAUTH_URL (should be your Vercel deployment URL)
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET_NAME
NODE_ENV=production
```

#### 4. Update Google OAuth Redirect URI

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Edit your OAuth 2.0 Client ID
3. Add authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
4. Save changes

#### 5. Set Up Database

**Option A: Vercel Postgres (Recommended)**

1. In Vercel dashboard, go to **Storage** → **Create Database** → **Postgres**
2. Copy the connection string to `DATABASE_URL` environment variable
3. Run migrations:
   ```bash
   npm run db:migrate
   ```

**Option B: External Database**

- Use Supabase, Neon, or AWS RDS
- Add connection string to `DATABASE_URL` environment variable

#### 6. Deploy

1. Click **Deploy** in Vercel dashboard
2. Wait for build to complete
3. Your app will be live at `https://your-app.vercel.app`

### Alternative Deployment Options

#### Deploying to Other Platforms

**Netlify**:
- Similar process to Vercel
- Use Netlify's environment variables
- Configure build command: `npm run build`
- Publish directory: `.next`

**AWS Amplify**:
- Connect GitHub repository
- Configure build settings
- Add environment variables in Amplify console

**Docker Deployment**:

1. Create `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. Build and run:
   ```bash
   docker build -t twospoondrive .
   docker run -p 3000:3000 --env-file .env twospoondrive
   ```

## 📁 Project Structure

```
twospoondrive/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── files/         # File management endpoints
│   │   └── shared/        # Shared file endpoints
│   ├── dashboard/         # Dashboard pages
│   ├── shared/            # Public shared file pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── prisma.ts          # Prisma client
│   ├── s3.ts              # AWS S3 utilities
│   └── fileTypes.ts       # File type utilities
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   └── migrations/        # Database migrations
├── public/                # Static assets
├── auth.ts                # NextAuth configuration
├── auth.config.ts         # Auth configuration
├── middleware.ts           # Next.js middleware
└── package.json           # Dependencies and scripts
```

## 🔑 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@localhost:5432/db` |
| `AUTH_SECRET` | Secret for NextAuth session encryption | Yes | Generated with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL of your application | Yes | `http://localhost:3000` or `https://your-app.vercel.app` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes | From Google Cloud Console |
| `AWS_REGION` | AWS region for S3 | Optional | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS access key | Optional | For S3 storage |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Optional | For S3 storage |
| `AWS_S3_BUCKET_NAME` | S3 bucket name | Optional | `my-bucket-name` |
| `NODE_ENV` | Node environment | Yes | `development` or `production` |

## 🗄️ Database Schema

The application uses the following main models:

- **User**: User accounts and authentication
- **File**: Files and folders with metadata
- **FileShare**: File sharing relationships and permissions
- **Account**: OAuth account connections
- **Session**: User sessions

See `prisma/schema.prisma` for the complete schema.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production (includes Prisma generate)

# Production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema changes (development)
npm run db:migrate   # Run migrations (production)
npm run db:studio    # Open Prisma Studio (database GUI)

# Linting
npm run lint         # Run ESLint
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **AUTH_SECRET**: Use a strong, randomly generated secret
3. **Database**: Use connection pooling and SSL in production
4. **S3**: Use IAM roles instead of access keys when possible
5. **CORS**: Configure CORS properly for file sharing
6. **File Validation**: Validate file types and sizes on upload
7. **Rate Limiting**: Consider implementing rate limiting for API routes

## 🐛 Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Ensure database exists
- Check firewall rules for cloud databases

### Google OAuth Not Working

- Verify redirect URI matches exactly
- Check OAuth consent screen is configured
- Ensure API is enabled in Google Cloud Console
- Check environment variables are set correctly

### S3 Upload Failures

- Verify AWS credentials are correct
- Check bucket permissions
- Ensure bucket CORS is configured
- Verify bucket name matches environment variable

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Regenerate Prisma Client: `npm run db:generate`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a technical assignment.

## 👤 Author

Built as part of the TwoSpoon Full Stack Engineer assignment.

---

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies
- [ ] Set up PostgreSQL database
- [ ] Configure Google OAuth
- [ ] Set up AWS S3 (optional)
- [ ] Create `.env` file with all variables
- [ ] Run database migrations
- [ ] Start development server
- [ ] Test authentication
- [ ] Deploy to production

For detailed instructions, refer to the sections above.
