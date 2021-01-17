import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defer, Observable } from 'rxjs';
import { map, retryWhen, tap } from 'rxjs/operators';
import { JSDOM } from 'jsdom';
import { _ } from 'lodash';
import { uniqid } from 'uniqid';
import { IDomovitaFlat } from '../common/interfaces/domovita/domovita-flat.interface';

const TAGS = {
    A: 'A',
    DIV: 'DIV',
};

@Injectable()
export class DomovitaApiService {
    params: string;
    domain: string;

    store: IDomovitaFlat[] = [];

    constructor(
        private httpClient: HttpService,
        private configService: ConfigService,
    ) {
        this.domain = 'https://domovita.by/minsk/flats/rent';
        this.params = this.configService.get<string>('DOMOVITA_PARAMS');
    }

    private _genErrorFlat(element: HTMLElement, err): IDomovitaFlat {
        return {
            photo: null,
            url: null,
            price: null,
            id: uniqid(),
            info: {
                full: null,
                location: null,
                rent_type: null,
            },
            logs: {
                bread_crumbs: element.innerHTML,
                err,
            },
        };
    }

    private _getInfoFromA(element: HTMLAnchorElement): IDomovitaFlat {
        return {
            photo: _.first(element.querySelectorAll('[data-url-mini]')).dataset.urlMini,
            url: element.href,
            price: element.querySelector('div.price.dropdown-toggle').firstChild.textContent.trim(),
            id: String(element.dataset.key),
            info: {
                location: null,
                rent_type: null,
                full: element.querySelector('div.title.title--listing').firstChild.textContent.trim(),
            },
            logs: {
                err: null,
                bread_crumbs: null,
            },
        };
    }

    private _getInfoFromDiv(element: HTMLDivElement): IDomovitaFlat {
        const a: HTMLAnchorElement = element.querySelector('a.title.title--listing');

        return {
            photo: _.first(element.querySelectorAll('[data-url-mini]')).dataset.urlMini,
            url: a.href,
            price: element.querySelector('div.price.dropdown-toggle').firstChild.textContent.trim(),
            id: String(element.dataset.key),
            info: {
                location: null,
                rent_type: null,
                full: a.firstChild.textContent.trim(),
            },
            logs: {
                bread_crumbs: null,
                err: null,
            },
        };
    }

    getHello(): string {
        return 'Domovita works!';
    }

    getAllApartments(page: number = 1): Observable<IDomovitaFlat[]> {
        const stream$ = defer(() => {
            const url = `${this.domain}?${this.params}&page=${page}`;

            return this.httpClient.get(url);
        });

        return stream$.pipe(
            map(({ data }) => {
                const dom: JSDOM = new JSDOM(data);

                const document: Document =  dom.window.document;

                const liArr = [...document.querySelectorAll('ul.pagination.pagajax > li')];
                const lastPage: number = Number(liArr[liArr.length - 2].firstChild.textContent.trim());

                if (page === 1) {
                    this.store = [];
                }

                const flats = [...document.querySelectorAll('[data-object-type="OFlatsRent"]')];

                const goodFlats: IDomovitaFlat[] = flats.map((flat: HTMLAnchorElement | HTMLDivElement) => {
                    try {
                        if (flat.tagName === TAGS.A) {
                            return this._getInfoFromA(flat as HTMLAnchorElement);
                        }

                        if (flat.tagName === TAGS.DIV) {
                            return this._getInfoFromDiv(flat as HTMLDivElement);
                        }
                    } catch (err) {
                        return this._genErrorFlat(flat, err);
                    }
                });

                this.store = [...this.store, ...goodFlats];

                if (page !== lastPage) {
                    throw(page + 1);
                }

                console.log(`Domovita contains ${this.store.length} values, and ${lastPage} pages`);

                return this.store;
            }),
            retryWhen(errors =>
                errors.pipe(
                  tap((current: number) => {
                      page = current;
                  }),
                ),
            ),
        );
    }
}
