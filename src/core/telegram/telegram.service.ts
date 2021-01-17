import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { EParseMode } from '../../common/enums/parse-mode.enum';
import { IDomovitaFlat } from '../../common/interfaces/domovita/domovita-flat.interface';
import { OnlinerFlatMessage } from './messages/onliner-flat-message';
import { FlatMessage } from './messages/domovita-flat-message';
import { IOnlinerFlat } from '../../common/interfaces/onliner/onliner-flat.interface';

@Injectable()
export class TelegramService {
    id: string;
    domain: string;
    chatId: string;
    params: { chat_id: string, text: OnlinerFlatMessage, parse_mode: EParseMode };

    constructor(
        private httpClient: HttpService,
        private configService: ConfigService,
    ) {
        this.id = this.configService.get<string>('TELEGRAM_ID');
        this.domain = `https://api.telegram.org/bot${this.id}`;
        // id of channel chat
        this.chatId = this.configService.get<string>('CHAT_ID');
        this.params = {
            chat_id: this.chatId,
            parse_mode: EParseMode.Markdown,
            text: null,
        };
    }

    getMessage(flat: IDomovitaFlat | IOnlinerFlat) {
          if ('location' in flat) {
              return new OnlinerFlatMessage(flat).markdownMessage;
          }

          if ('info' in flat) {
              return new FlatMessage(flat).markdownMessage;
          }
    }

    getUpdates(): Observable<any> {
        const url = `${this.domain}/getUpdates`;

        return this.httpClient.get(url);
    }

    sendMessage(apartment: IOnlinerFlat | IDomovitaFlat, chatid: string): Observable<any> {
        const message: string = this.getMessage(apartment);

        console.log('The message is ', message);

        const url = `${this.domain}/sendMessage`;
        const params = stringify({ ...this.params, text: message });

        return this.httpClient.post(url, params);
    }
}
