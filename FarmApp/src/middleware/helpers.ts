//midlewares da lib morgan
import morgan, { StreamOptions } from "morgan";

import config from "config";

//Logger
import Logger from "../../config/logger";

//config as messages de http com meu modelo de logger
const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = config.get<string>("env") || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms ",
  { stream, skip }
);

export default morganMiddleware;
