# Setting Up GitHub Personal Access Token

GitHub no longer accepts password authentication for git operations. Here's how to create and use a personal access token (PAT) instead:

## 1. Create a Personal Access Token on GitHub

1. Go to GitHub.com and log in with your account
2. Click on your profile picture in the top-right corner
3. Select "Settings"
4. Scroll down to "Developer settings" in the left sidebar
5. Click on "Personal access tokens" then "Tokens (classic)"
6. Click "Generate new token" and select "Generate new token (classic)"
7. Give your token a descriptive name (e.g., "Canvas Repository Access")
8. Set an expiration date (recommended: 90 days)
9. Select these scopes:
   - `repo` (all checkboxes under it)
   - `workflow` (if using GitHub Actions)
   - `read:org` (if using organization repositories)
10. Click "Generate token"
11. **IMPORTANT**: Copy the generated token immediately! You won't be able to see it again.

## 2. Configure Git to Use Your Token

### Option 1: Use Git Credential Storage (Recommended)

```bash
# Store your credentials (you'll be prompted for username and token)
git config --global credential.helper store
```

Then when you push to GitHub, enter your username and use the token as the password. Git will remember it for future operations.

### Option 2: Include Token in Remote URL

```bash
# Remove the old remote
git remote remove origin

# Add the remote with your token embedded (replace with your actual values)
git remote add origin https://USERNAME:YOUR_TOKEN@github.com/Veritable-Games/canvas.git
```

Replace:
- `USERNAME` with your GitHub username
- `YOUR_TOKEN` with the personal access token you generated

## 3. Push to GitHub Again

After configuring your token, try pushing again:

```bash
git push -u origin master
```

This should now work without authentication errors.

## Notes on Token Security

- Treat your token like a password - don't share it
- If you're on a shared computer, consider using a shorter expiration time
- You can revoke tokens at any time from GitHub settings
- For team environments, consider setting up SSH keys for authentication