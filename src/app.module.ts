import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { gateway } from './realtime/app.gateway';
import { WhatsappModule } from './whatsapp/whatsapp.module'
@Module({
  imports: [
    WhatsappModule // Agrega el módulo de WhatsApp a la lista de módulos importados
  ],
  controllers: [AppController],
  providers: [AppService, gateway],
})
export class AppModule {}
