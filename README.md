# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0af8f5b3-6651-424a-9c70-4550682677b3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0af8f5b3-6651-424a-9c70-4550682677b3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Local Development Setup**

Prerequisites:
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Docker installed and running (required for local Supabase)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start Supabase locally
npm run supabase:start

# Step 5: Setup environment variables
cp .env.example .env
# Edit .env with your local Supabase credentials (shown after running supabase:start)

# Step 6: Start the development server
npm run dev
```

**Managing Supabase Locally**

The following npm scripts are available for managing your local Supabase instance:

```sh
npm run supabase:start    # Start the local Supabase instance
npm run supabase:stop     # Stop the local Supabase instance
npm run supabase:status   # Check the status of local Supabase services
npm run db:reset         # Reset the database to a clean state
npm run db:push         # Push local schema changes to the database
```

**Database Setup**

The project uses Supabase as the backend. The database schema includes:
- `resources` table: Stores information about community resources
- `services` table: Stores services offered by each resource

The schema and sample data will be automatically set up when you start Supabase locally. You can view and manage your data through the Supabase Studio at http://localhost:54323 after starting the local instance.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Database)

## How can I deploy this project?

1. Create a new Supabase project at https://supabase.com
2. Update your production environment variables with the new Supabase project credentials
3. Deploy your frontend by opening [Lovable](https://lovable.dev/projects/0af8f5b3-6651-424a-9c70-4550682677b3) and clicking on Share -> Publish

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)