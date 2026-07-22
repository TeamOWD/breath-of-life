export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your 15-Minute Breath of Life Practice</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#c8f53c;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Breath of Life Wellness</p>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="background:#ffffff;padding:48px 40px 32px;">
              <p style="margin:0 0 16px;color:#888;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Your free practice</p>
              <h1 style="margin:0 0 20px;color:#0a0a0a;font-family:Georgia,serif;font-size:32px;line-height:1.2;font-weight:700;">Your 15-Minute Breath of Life Practice is Here.</h1>
              <p style="margin:0 0 32px;color:#444;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;">
                Thank you for taking this step. What you're about to experience is a short but complete breathwork journey — the same foundational practice Nick uses to open every retreat and group session on Maui.
              </p>
              <p style="margin:0 0 32px;color:#444;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;">
                Find a comfortable place to sit or lie down. Put on headphones if you can. Then press play.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom:40px;">
                    <a href="https://www.youtube.com/watch?v=8kdF6T09G0s&list=PLRCyVM5R45huLEXtHIfYf67_it5pgl-IB&index=7"
                       style="display:inline-block;background:#c8f53c;color:#0a0a0a;font-family:Arial,sans-serif;font-size:16px;font-weight:700;text-decoration:none;padding:18px 40px;border-radius:100px;letter-spacing:0.5px;">
                      Start the practice &nbsp;→
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #eee;margin:0 0 32px;" />

              <!-- From Nick -->
              <p style="margin:0 0 8px;color:#888;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">A note from Nick</p>
              <p style="margin:0 0 32px;color:#444;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;font-style:italic;">
                "Your breath is the medicine. Your body is the alchemist. You don't need anything outside of yourself to begin healing — just a willingness to breathe and feel. I'm honored to guide you."
              </p>
              <p style="margin:0;color:#0a0a0a;font-family:Arial,sans-serif;font-size:15px;font-weight:700;">Nick TNT Terry</p>
              <p style="margin:4px 0 0;color:#888;font-family:Arial,sans-serif;font-size:13px;">Founder · Breath of Life Wellness · Maui, Hawaiʻi</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0a0a;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#666;font-family:Arial,sans-serif;font-size:12px;">
                Questions? Reply to this email or write to
                <a href="mailto:nick@breathoflifewellness.com" style="color:#c8f53c;text-decoration:none;">nick@breathoflifewellness.com</a>
              </p>
              <p style="margin:0;color:#444;font-family:Arial,sans-serif;font-size:11px;">
                © 2026 Breath of Life Wellness · Maui, Hawaiʻi
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nick TNT · Breath of Life <onboarding@resend.dev>',
        to: email,
        subject: 'Your 15-Minute Breath of Life Practice 🌿',
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
