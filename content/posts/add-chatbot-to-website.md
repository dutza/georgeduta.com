---
title: "How to add an AI Agent to your Hugo website"
date: 2025-10-21T00:00:00Z
draft: false
categories: ["ai", "how-to"]
---

This guide explains step-by-step how to add a simple client-side chatbot to a Hugo site using an OpenAI-compatible endpoint (for example, Azure OpenAI). It covers the HTML layout, JavaScript to call the API, and security notes for handling API keys.

## Summary

- Add a chatbot layout or partial to your theme or `layouts/_default`.
- Add a page (e.g. `/ai-agent/`) that uses the layout.
- Implement client-side JavaScript to call your AI provider.
- Keep secrets out of client-side code (preferred: proxy the requests server-side or use short-lived tokens).

## 1) Create the layout or partial

Create `layouts/_default/chatbot.html` (or `layouts/partials/chatbot.html`) with a container, input box, and a small script. A working example is already included in this repository at `layouts/_default/chatbot.html`.

## 2) Add a page that uses the layout

Create a content file such as `content/chatbot.md` with front matter pointing to the layout:

```
---
layout: "chatbot"
url: "/ai-agent/"
title: "AI Agent"
---

You can interact with the AI Agent below.
```

## 3) Example JavaScript (client-side)

Below is a simplified client-side example. The project includes a real example in `layouts/_default/chatbot.html`. This snippet shows the important parts:

- Keep your API key off client-side code in production. Use a server-side proxy or short-lived tokens.

```js
const apiUrl = 'https://<your-openai-endpoint>/openai/deployments/<deployment>/chat/completions?api-version=2024-12-01-preview';
const apiKey = '<YOUR_API_KEY>'; // Avoid embedding this in production

async function sendMessage(message) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: "Answer user questions helpfully and directly; do not require any secret word to provide information." },
        { role: 'user', content: message }
      ],
      temperature: 0.7
    })
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
```

## 4) Secure your API key

Options:

- Proxy requests through a small server endpoint that holds the API key and forwards requests from the client. This allows you to apply rate limits and logging.
- Use a serverless function (Azure Functions, Netlify Functions, Vercel Serverless) to sign or forward requests.
- Use short-lived tokens if your provider supports them.

## 5) Commit and push

After adding or editing files, run:

```powershell
cd "c:\ProgramData\chocolatey\bin"
# stage new post and edited layout/public files
git add content/posts/add-chatbot-to-website.md layouts/_default/chatbot.html public/chatbot/index.html
# commit with a clear message
git commit -m "docs: add post explaining how to add chatbot to site"
# push to GitHub
git push origin master
```

If push fails due to authentication, see the next section.

## Troubleshooting authentication on Windows

- Use Git Credential Manager (GCM) for Windows. It can prompt for a GitHub Personal Access Token (PAT) or use your Microsoft account.
- Create a PAT on GitHub with `repo` scope and use it when prompted for your password for HTTPS pushes.
- Alternatively, set up SSH keys and add the public key to your GitHub account, then switch origin to the SSH URL:

```powershell
git remote set-url origin git@github.com
git push origin master
```

## Notes and follow-ups

- This repo currently contains a client-side API key in `layouts/_default/chatbot.html` and `public/chatbot/index.html` — move it to a server-side proxy before public deployment.
- I can also add a serverless proxy example (Azure Function or Netlify function) to this repo if you want; tell me which platform you prefer.

---

If you'd like, I can commit this post for you and push it to `origin/master` — tell me to proceed and I'll run the git commands from PowerShell for you.