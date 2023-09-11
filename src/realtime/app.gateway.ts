import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(85, {
    cors: { origin: '*' },
  })

export class gateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('Inicio el servicio')
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conecto al socket 👌👌👌');
  }

  handleDisconnect(client: any) {
    console.log('Alguien se fue! chao chao')
  }


  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message') //TODO Backend
  handleIncommingMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) 
  {
        const { room, message } = payload;
        console.log(payload)
        console.log("SocketID: " + client.id);

        this.server.to(`room_${room}`).emit('new_message',message);
        const thankYouMessage = "Gracias por su consulta";
        // Enviar un mensaje de agradecimiento solo al cliente que envió el mensaje original
        try{
            client.emit("thankyou", thankYouMessage);
            console.log("Se emitio el mensaje " + thankYouMessage + " al socket " + client.id + client.listeners.name.toString());
    
        }
        catch(err){
            console.error(err.message);
        }
  }

  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room:string) {
    console.log(`chao room_${room}`)
    client.leave(`room_${room}`);
  }
}