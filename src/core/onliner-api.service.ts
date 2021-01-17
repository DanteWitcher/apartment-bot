import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defer, Observable } from 'rxjs';
import { map, retryWhen, tap } from 'rxjs/operators';
import { IOnlinerFlat } from '../common/interfaces/onliner/onliner-flat.interface';

@Injectable()
export class OnlinerApiService {
    params: string;
    domain: string;

    store: IOnlinerFlat[] = [];

    constructor(
        private httpClient: HttpService,
        private configService: ConfigService,
    ) {
        this.domain = 'https://r.onliner.by/sdapi/ak.api/search/apartments';
        // TODO: getting all data but it can be ui/api configure
        this.params = this.configService.get<string>('ONLINER_PARAMS');
    }

    getAllApartments(page: number = 1): Observable<IOnlinerFlat[]> {
        const stream$ = defer(() => {
            const url = `${this.domain}?${this.params}&page=${page}`;

            return this.httpClient.get(url);
        });

        return stream$.pipe(
            map(({ data }) => {
                const current = data.page.current;
                const last = data.page.last;

                if (current === 1) {
                    console.log('Last value is:', last);

                    this.store = [];
                }

                console.log(`Page is ${current} !`);

                this.store = [...this.store, ...data.apartments as IOnlinerFlat[]];

                if (current < last) {
                    throw(current + 1);
                }

                return this.store;
            }),
            retryWhen(errors =>
                errors.pipe(
                  tap(current => {
                      page = current;
                  }),
                ),
            ),
        );
    }
}
