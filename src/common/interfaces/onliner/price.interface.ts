import { ECurrency } from '../../enums/currency.enum';

export interface IPrice {
    amount: string;
    currency: ECurrency;
    converted: {
        [ECurrency.BYN]: {
            amount: string,
            currency: ECurrency.BYN,
        },
        [ECurrency.USD]: {
            amount: string,
            currency: ECurrency.USD,
        },
    };
}
