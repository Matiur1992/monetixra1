# ============================================================
#  Monetixra Auto Deployment Script
#  Run this in PowerShell to push to GitHub
# ============================================================

Write-Host @"
╔══════════════════════════════════════════════════════════╗
║           MONETIXRA - AUTO DEPLOYMENT SCRIPT             ║
╚══════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found! Install from: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (default: monetixra)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "monetixra"
}

# Check if git is already initialized
if (Test-Path .git) {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
} else {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Configure git if not already set
try {
    $userEmail = git config user.email
    $userName = git config user.name
    
    if ([string]::IsNullOrWhiteSpace($userEmail)) {
        $email = Read-Host "Enter your email for Git config"
        git config user.email $email
    }
    if ([string]::IsNullOrWhiteSpace($userName)) {
        $name = Read-Host "Enter your name for Git config"
        git config user.name $name
    }
} catch {
    $email = Read-Host "Enter your email for Git config"
    $name = Read-Host "Enter your name for Git config"
    git config user.email $email
    git config user.name $name
}

# Create .gitignore if not exists
if (-not (Test-Path .gitignore)) {
    Write-Host "📝 Creating .gitignore..." -ForegroundColor Yellow
    $gitignoreContent = @"
node_modules/
.env
.DS_Store
*.log
.vscode/
.idea/
*.mp4
*.mov
*.zip
"@
    $gitignoreContent | Out-File -FilePath .gitignore -Encoding UTF8
}

# Add all files
Write-Host "📤 Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit
$commitMsg = Read-Host "Enter commit message (default: 'Deploy Monetixra v3.0')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "🚀 Deploy Monetixra v3.0 - Full featured social earn platform"
}
git commit -m "$commitMsg"

# Check if remote exists
$remoteExists = git remote -v 2>$null
if ($remoteExists -match "origin") {
    Write-Host "✅ Remote 'origin' already exists" -ForegroundColor Green
} else {
    Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Yellow
    $remoteUrl = "https://github.com/$username/$repoName.git"
    git remote add origin $remoteUrl
    Write-Host "   URL: $remoteUrl" -ForegroundColor Gray
}

# Push to GitHub
Write-Host @"

📤 Pushing to GitHub...
⚠️  You may need to enter your GitHub credentials or use a Personal Access Token
"@ -ForegroundColor Yellow

try {
    git push -u origin main
    Write-Host @"

✅ SUCCESS! Code pushed to GitHub!

🔗 Repository URL: https://github.com/$username/$repoName

📋 NEXT STEPS:
   1. Go to: https://github.com/$username/$repoName
   2. Click Settings → Secrets and variables → Actions
   3. Add these secrets:
      - NETLIFY_AUTH_TOKEN (from netlify.com/user/applications/personal-access-tokens)
      - NETLIFY_SITE_ID (from site settings)
   4. Go to Netlify: https://app.netlify.com/
      → Add new site → Import from GitHub → Select $repoName
   5. OR use one-click deploy:
      https://app.netlify.com/start/deploy?repository=https://github.com/$username/$repoName

🌐 Your site will be live at: https://$repoName.netlify.app
"@ -ForegroundColor Green
} catch {
    Write-Host @"

❌ Push failed!

🔧 Manual steps:
   1. Create repo at: https://github.com/new
   2. Run: git remote add origin https://github.com/$username/$repoName.git
   3. Run: git push -u origin main

💡 Or use GitHub CLI:
   gh repo create $repoName --public --source=. --remote=origin --push
"@ -ForegroundColor Red
}

Read-Host "Press Enter to exit"
