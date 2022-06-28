import * as https from 'https';
import * as http from 'http';

const cacheResult: Record<string, { data: string; time: number }> = {};

export const getUrlContent = async (url: string, cacheTime = 300_000): Promise<string> => {
  if (cacheResult[url] && new Date().getTime() - cacheResult[url].time > cacheTime) {
    return cacheResult[url].data;
  }
  const res = await new Promise<string>((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    client
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
  cacheResult[url] = { data: res, time: new Date().getTime() };
  return res;
};
