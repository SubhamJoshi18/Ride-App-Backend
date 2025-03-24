import kleur from 'kleur';
import winston from 'winston';

const { combine, printf } = winston.format;

const myFormat = printf(({ level, message, service }) => {
  let jsonString = `{ "message": "${level === 'error' ? kleur.red(message as string) : kleur.gray(message as string)}"`;
  jsonString += `, "level": "${level}", "service": "${kleur.yellow(service as string)}" }`;
  return jsonString;
});

function createLogger(service: string): winston.Logger {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    defaultMeta: { service },
    format: combine(myFormat),
    transports: [new winston.transports.Console()],
  });
}

const riderLogger = createLogger('rider-microservice');
export default riderLogger;
