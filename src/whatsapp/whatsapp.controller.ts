// whatsapp.controller.ts
import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('webhook')
export class WhatsappController {
  private readonly VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  private readonly WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

  @Get()
  verifyWebhook(@Req() req: Request, @Res() res: Response): Response {
    const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;

    if (mode && token && mode === 'subscribe' && token === this.VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  @Post()
  handleWebhook(@Req() req: Request, @Res() res: Response): Response {
    const body = req.body;

    if (body.object) {
      // Handle WhatsApp message here
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0] &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
        const from = body.entry[0].changes[0].value.messages[0].from;
        const msg_body = body.entry[0].changes[0].value.messages[0].text.body;

        axios({
          method: 'POST',
          url: `https://graph.facebook.com/v12.0/${phone_number_id}/messages?access_token=${this.WHATSAPP_TOKEN}`,
          data: {
            messaging_product: 'whatsapp',
            to: from,
            text: { body: `Ack: ${msg_body}` },
          },
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  }
}





