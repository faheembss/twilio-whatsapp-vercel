const twilio = require("twilio");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "Only POST allowed" });
  }

  try {
    const { inArguments } = req.body;
    const phone = inArguments?.[0]?.phone;
    const message = inArguments?.[0]?.message;

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const response = await client.messages.create({
      body: message,
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_FROM,
      to: "whatsapp:" + phone,
    });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
