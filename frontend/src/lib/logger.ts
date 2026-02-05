
import axios from 'axios';

class Logger {
  private apiKey: string;
  private service: string;

  constructor(apiKey: string, service: string) {
    this.apiKey = apiKey;
    this.service = service;
  }

  private async log(level: string, message: string, func: string) {
    try {
      await axios.post('/api/logs', {
        level,
        message,
        service: this.service,
        function: func,
      }, {
        headers: {
          'X-API-Key': this.apiKey,
        },
      });
    } catch (error) {
      console.error('Failed to send log', error);
    }
  }

  info(message: string, func: string) {
    this.log('info', message, func);
  }

  warn(message: string, func: string) {
    this.log('warn', message, func);
  }

  error(message: string, func: string) {
    this.log('error', message, func);
  }

  debug(message: string, func: string) {
    this.log('debug', message, func);
  }
}

export default Logger;
