import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {

  getEquifax(): string {
    // Simula un retraso de 2 segundos (2000 milisegundos)
    const delayInMilliseconds = 40000;
    
    // Sincroniza el retraso usando setTimeout
    const start = Date.now();
    while (Date.now() - start < delayInMilliseconds) { /* Espera */ }
    
    // Simula una acción asincrónica o cualquier otra lógica aquí
    return "Estado Equifax Ok";
  }

  getMalla(): string {
    return 'Estado Malla Ok';
  }

  getAchef(): string {
    return 'Estado Achef Ok';
  }

  asincEquifax(data: any): Promise<string> {

    // Simula un retraso de 2 segundos (2000 milisegundos)
    const delayInMilliseconds = 65000;
    
    // Sincroniza el retraso usando setTimeout
    const start = Date.now();
    while (Date.now() - start < delayInMilliseconds) { /* Espera */ }
    // Devuelve una promesa que resuelve con un mensaje de éxito.
    try {

      console.log("Recibe datos el equifax asincrono :" + "Informe: " + data.informe + ", " + "requestid: " + data.requestid);
      const postData = data;

      const postResponse = axios.post('http://localhost:3000/api/hookequifax', postData);
      
      // Aquí obtienes la respuesta del servicio POST de manera síncrona
      const responseData = postResponse;

    } catch (error) {
      // Manejo de errores
      console.error('Error al realizar la solicitud POST:', error);
      throw error;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Datos procesados exitosamente');
      }, 1000); // Simulamos una operación asincrónica que toma 1 segundo.
    });
  }
}
