import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "SUA_API_KEY", // Substitua por sua chave de API
  authDomain: "SEU_AUTH_DOMAIN", // Substitua pelo domínio de autenticação
  databaseURL: "SEU_DATABASE_URL", // Substitua pela URL do banco de dados
  projectId: "SEU_PROJECT_ID", // Substitua pelo ID do projeto
  storageBucket: "SEU_STORAGE_BUCKET", // Substitua pelo bucket de armazenamento
  messagingSenderId: "SEU_MESSAGING_SENDER_ID", // Substitua pelo ID do remetente
  appId: "SEU_APP_ID" // Substitua pelo ID do aplicativo
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
