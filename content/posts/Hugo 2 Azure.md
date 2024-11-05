+++
date = '2024-11-03T16:58:17Z'
draft = false
title = 'Hugo framework deployed to Azure cloud'
+++

## ✨ Steps to create a website with Hugo framework deployed to Azure cloud using GitHub continuos integration 
<p align="center">
  <a href="https://hugo.io/">
    <img alt="Hugo" src="https://static-00.iconduck.com/assets.00/hugo-icon-456x512-ghgrm1yx.png" width="60" />
  </a>
</p>
<h1 align="center">
  Hugo's blog starter
</h1>

## 🚀 Getting Started to create a free website with incredible performace
- environment: Windows 10 with admin rights 
- [install chocolatey package manager](#choco)
- [install hugo using chocolatey](#hugo)
- [install Visual studio code](#VS)
- [install Git ](#git)
- [commit to Github](#commit)
- [Create Azure Static Web App](#publish)

### install chocolatey package manager {#choco}
Open CMD as administrator and run:
```shell
  powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
 ```
```sh
 @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```
close and open another terminal to check the version
```sh
choco --version
```

### install hugo: {#hugo}
```sh
choco install hugo -confirm
hugo version
```
([Download Visual Studio Code for Windows](https://code.visualstudio.com/docs/?dv=win64user)) 
{#VS}

### install Git: {#git}
```sh
choco install git -confirm
git --version
```

### Create the website using Hugo framework. {#commit}
- [ ] Step 1: Open CMD and change directory to Hugo path: ```cd C:\ProgramData\chocolatey\bin```
- [ ] Step 2: Create new Hugo Site
```sh
      hugo new site your-site-name
```
- [ ] Step 3: Add the PaperMod Theme
```sh
      cd your-site-name 
        git init  # Initialize a Git repo if not already initialized
        git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
        git submodule update --init --recursive
```

- [ ] Step 4: Open folder in VS: ```code .```
- [ ] Step 5: Configure Your Site
---
Now, you need to configure your site by modifying the config.toml (or config.yaml if you prefer that format) in the root of your Hugo project.
```sh
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Hugo Website"
theme = "PaperMod"

[params]
  # Add your site parameters here (e.g., title, description, etc.)
  description = "A simple Hugo site using PaperMod theme"
  author = "Your Name"
  twitter = "your_twitter_handle"  # optional
  github = "your_github_handle"  # optional
  linkedin = "your_linkedin_handle"  # optional
```
---
- [ ] Step 6: **Create a new post using CMD teminal
```sh
hugo new posts/my-first-post.md
```
---
- [ ] Step 7: **Run the Local Server
To preview your site locally, navigate to your site directory and run:
```sh
hugo server
```
This will start the Hugo development server at `http://localhost:1313/`. Open that URL in your browser to see your site live locally. if you receive any error, please un incognite mode CTRL+SHIFT+N
---

### Deploy to Azure
### Deploy Hugo Website to Azure Static Web Apps

This guide walks you through the steps to deploy a Hugo-based website to **Azure Static Web Apps**.

## Prerequisites

Before you start, make sure you have the following:

1. **Azure account**: [Create an Azure account](https://azure.microsoft.com/free/) if you don't have one.
2. **Hugo installed**: Make sure you have Hugo installed on your local machine. You can download it from [Hugo's official site](https://gohugo.io/getting-started/installing/).
3. **GitHub account**: Azure Static Web Apps integrates with GitHub for continuous deployment.
4. **Git installed**: Make sure you have Git installed on your local machine.

---
### 2. **Push Your Hugo Site to GitHub**

1. Create a new repository on GitHub.

2. Initialize a Git repository in your Hugo site folder:

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

3. Add the GitHub remote URL and push your site:

    ```bash
    git remote add origin https://github.com/yourusername/your-repo-name.git
    git push -u origin master
    ```

---

### 3. **Create Azure Static Web App**

1. **Log in to Azure**: Go to [Azure Portal](https://portal.azure.com/) and log in to your account.

2. **Create a new Static Web App**:
    - In the Azure portal, click on **Create a resource**.
    - Search for **Static Web Apps** and select it.
    - Click **Create**.
    - Enter the following details:
      - **Subscription**: Choose your subscription.
      - **Resource Group**: Create a new one or select an existing one.
      - **Name**: Provide a unique name for your Static Web App.
      - **Region**: Select the region closest to your users.
      - **Deployment**: Choose **GitHub** as the source.
      - **Repository**: Select the repository where your Hugo site is stored.
      - **Branch**: Choose the branch to deploy (usually `main` or `master`).
      - **Build Presets**: Choose **Hugo**.
      - **App artifact location**: Enter `public` (this is the default folder where Hugo builds the site).

3. **Review and Create**:
    - Click **Review + Create** and then **Create**.
    - Azure will automatically set up the GitHub Actions for continuous deployment.

---

### 4. **Configure GitHub Actions for Continuous Deployment**

Once your Azure Static Web App is created, Azure will automatically create a GitHub Action workflow file to build and deploy the site. This file is located in your GitHub repository under `.github/workflows/azure-static-web-apps.yml`.

Make sure the **artifact location** in the workflow matches the `public` folder where Hugo generates the final static files:

```yaml
app_location: "/"
api_location: "/"
app_artifact_location: "public"

