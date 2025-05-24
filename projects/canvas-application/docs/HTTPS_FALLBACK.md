# Using HTTPS Authentication (Alternative Method)

If you're having trouble with SSH authentication, you can use HTTPS with a personal access token:

## Steps to Switch Back to HTTPS

1. Change the remote URL:
   ```bash
   git remote set-url origin https://github.com/Veritable-Games/canvas.git
   ```

2. Create a Personal Access Token on GitHub:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token" (classic)
   - Give it a name and select `repo` scope
   - Copy the token immediately after generating it

3. Configure Git to store your credentials:
   ```bash
   git config --global credential.helper store
   ```

4. Push your code:
   ```bash
   git push -u origin main
   ```
   
   When prompted for password, use your personal access token.

## After Successful Push

After successfully pushing your code, you can:

1. Continue using HTTPS with the stored token
2. Or switch back to SSH after properly setting up your SSH key on GitHub

Remember to keep your personal access token secure and don't share it with others.