import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: 'ASIASS55P7OVDZFPG5YX',  
    secretAccessKey: 'PpBOb30f9gUeRVsF+7Xv7WNSp3MrWW3rQVu7K2TE',  
    region: 'us-east-1',
});

const s3 = new AWS.S3();

export default s3;
