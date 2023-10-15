import http from 'http';
import { buildApp } from './app';

const run = async () => {
  const app = await buildApp();
  
  const httpServer = http.createServer(app);
  await httpServer.listen( { port: 4000 });

  console.log(`🚀  Server ready at http://localhost:4000`);
}

run().catch(console.dir);