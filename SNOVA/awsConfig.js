import AWS from 'aws-sdk';

// Substitua essas credenciais por variáveis de ambiente para segurança
AWS.config.update({
    accessKeyId: 'ASIASS55P7OVDZFPG5YX',  // Substitua por sua chave de acesso
    secretAccessKey: 'PpBOb30f9gUeRVsF+7Xv7WNSp3MrWW3rQVu7K2TE',  // Substitua por sua chave secreta
    region: 'us-east-1',
});

const s3 = new AWS.S3();

export default s3;
