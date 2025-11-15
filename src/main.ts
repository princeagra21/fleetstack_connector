import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  const server = app.getHttpServer() as import('http').Server;
  const addr = server.address();
  const actualPort = addr && typeof addr === 'object' ? addr.port : port;
  console.log(`Listener running on port ${actualPort}`);
}
void bootstrap();
