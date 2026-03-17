# Portfolio Deployment Guide (Render.com)

Follow these steps to deploy your entire project (Frontend + Backend) with a working Chatbot and Database.

## Step 1: Push Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Open your terminal in the project root folder (`rolewise-ai-main`).
3. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Prepare for deployment"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

## Step 2: Deploy on Render.com
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **"New +"** -> **"Blueprint"**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` file I created.
5. It will show two services: `rolewise-backend` and `rolewise-frontend`.

## Step 3: Configure Environment Variables
While Render is building, you need to set the Database link:
1. In the Render Dashboard, go to the **`rolewise-backend`** service.
2. Click **"Environment"**.
3. Add/Edit the variable: 
   - **Key**: `MONGODB_URI`
   - **Value**: Your actual MongoDB connection string (same as in your `.env`).
4. Click **"Save Changes"**.

## Step 4: Verify the Chatbot
- The **`VITE_API_URL`** is automatically handled by the `render.yaml` blueprint. It points the frontend to your new backend URL.
- Once both services are "Live", go to the Frontend URL.
- Open the Chatbot and ask a question. It will now fetch knowledge from your deployed backend!

## Troubleshooting

### "Page Not Found" on /admin
If you receive a 404 error when navigating to `/admin` or refreshing the page on Render:
1. Go to your **Static Site** settings in Render dashboard.
2. Navigate to **Redirects/Rewrites**.
3. Add a new rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
4. This ensures that React Router handles the navigation instead of the server looking for a file.

### CORS Errors
Ensure your Backend URL in Render dashboard matches what you have in the frontend's `VITE_API_URL`. The backend must also allow the frontend's domain.
- **Backend logs**: If the chatbot doesn't answer, check the backend logs in Render for MongoDB connection errors.
- **CORS**: I have already enabled CORS in `index.js`, so the frontend should be allowed to talk to the backend automatically.
