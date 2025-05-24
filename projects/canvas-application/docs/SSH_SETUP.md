# Using SSH Authentication with GitHub

I've switched your repository to use SSH authentication instead of HTTPS. This is generally more secure and convenient for development.

## What Changed

- Your repository was using HTTPS: `https://github.com/Veritable-Games/canvas.git`
- Now it's using SSH: `git@github.com:Veritable-Games/canvas.git`

## Ensuring Your SSH Key is on GitHub

Before pushing, make sure your SSH key is added to your GitHub account:

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # or if you're using RSA
   cat ~/.ssh/id_rsa.pub
   ```

2. Go to GitHub → Settings → SSH and GPG keys

3. Click "New SSH key"

4. Paste your public key and give it a title (like "Work Computer")

5. Click "Add SSH key"

## Pushing to GitHub

Once your SSH key is added to GitHub, try pushing again:

```bash
git push -u origin master
```

No password/token will be needed with SSH authentication.

## Troubleshooting SSH Issues

If you have issues connecting via SSH:

1. Test your SSH connection:
   ```bash
   ssh -T git@github.com
   ```
   
   You should see: "Hi username! You've successfully authenticated..."

2. Make sure your SSH agent is running:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519  # or id_rsa if you're using RSA
   ```

3. Check your SSH config:
   ```bash
   cat ~/.ssh/config
   ```
   
   Add this if the file doesn't exist:
   ```
   Host github.com
     User git
     IdentityFile ~/.ssh/id_ed25519
     IdentitiesOnly yes
   ```