import { Controller, DefaultValuePipe, Get, Header, ParseBoolPipe, Query } from '@nestjs/common';
import { PacGeneratorService } from './pac-generator.service';

@Controller()
export class AppController {
  constructor(private readonly pacGeneratorService: PacGeneratorService) {}

  @Get()
  @Header('content-type', 'text/javascript')
  async generate(
    @Query('connection', new DefaultValuePipe('SOCKS5 127.0.0.1:1080')) connection: string,
    @Query('domain', new DefaultValuePipe(false), ParseBoolPipe) withDomains: boolean,
    @Query('ip', new DefaultValuePipe(false), ParseBoolPipe) withIps: boolean,
  ): Promise<string> {
    return this.pacGeneratorService.generate({
      connection: connection,
      withDomains,
      withIps,
    });
  }
}
