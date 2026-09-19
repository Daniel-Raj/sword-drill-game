const express = require('express');
const app = express();
const PORT = 3000;

app.get('/:value', (req, res) => {
    // 1. Get value from route param and split strictly by hyphen (-)
    const lines = req.params.value
        .split('-')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    // 2. Render each segment as a glowing line
    const contentHtml = lines
        .map(line => `<div class="glow-text">${line}</div>`)
        .join('');

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verse Viewer</title>
        <style>
            body {
                margin: 0;
                padding: 20px;
                min-height: 100vh;
                background-color: #0f172a;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                font-family: system-ui, -apple-system, sans-serif;
            }
            .glow-text {
                font-size: clamp(1.8rem, 4vw, 3.5rem);
                font-weight: 800;
                color: #ffffff;
                text-shadow: 
                    0 0 10px #3b82f6,
                    0 0 20px #3b82f6,
                    0 0 40px #60a5fa,
                    0 0 80px #60a5fa;
                text-align: center;
                margin: 12px 0;
                line-height: 1.3;
                word-wrap: break-word;
            }
        </style>
    </head>
    <body>
        ${contentHtml}
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});  