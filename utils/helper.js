const {
  LambdaClient,
  InvokeCommand,
  LogType,
} = require("@aws-sdk/client-lambda");

const invoke = async (funcName, payload) => {
  const client = new LambdaClient({
    region: process.env.S3_LAMDA_REGION,
    credentials: {
      secretAccessKey: process.env.S3_SECRET_KEY,
      accessKeyId: process.env.S3_ACCESS_KEY,
    },
  });
  const command = new InvokeCommand({
    FunctionName: funcName,
    Payload: JSON.stringify(payload),
    LogType: LogType.Tail,
  });

  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  return { logs, result };
};

module.exports = invoke;
