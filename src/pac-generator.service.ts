import { Injectable } from '@nestjs/common';
import { PacGenerator, PacGeneratorOptions } from 'pac-generator';
import * as path from 'path';
import { getListFromUrl } from './utils/getListFromUrl';

@Injectable()
export class PacGeneratorService {
  config!: {
    ipsUrls?: string[];
    domainsUrls?: string[];
    domains?: string[];
    ips?: string[];
  };

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.config = require(path.resolve(process.cwd(), './pac.config.js'));
  }

  async generate({
    connection,
    withDomains,
    withIps,
  }: {
    connection: string;
    withDomains: boolean;
    withIps: boolean;
  }): Promise<string> {
    const pacGeneratorOptions: PacGeneratorOptions = {
      proxies: [
        {
          connection,
          domains: [...(this.config.domains || [])],
          ips: [...(this.config.ips || [])],
        },
      ],
    };

    if (withIps && this.config.ipsUrls) {
      for (const ipsUrl of this.config.ipsUrls) {
        const ips = await getListFromUrl(ipsUrl);
        pacGeneratorOptions.proxies[0].ips.push(...ips);
      }
    }

    if (withDomains && this.config.domainsUrls) {
      for (const domainsUrl of this.config.domainsUrls) {
        const domains = await getListFromUrl(domainsUrl);
        pacGeneratorOptions.proxies[0].domains.push(...domains);
      }
    }

    if (!withDomains) {
      pacGeneratorOptions.proxies[0].domains = [];
    }
    if (!withIps) {
      pacGeneratorOptions.proxies[0].ips = [];
    }

    const pacGenerator = new PacGenerator(pacGeneratorOptions);
    return pacGenerator.generate();
  }
}
