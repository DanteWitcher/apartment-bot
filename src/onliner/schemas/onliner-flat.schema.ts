import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OnlinerFlatDocument = OnlinerFlat & Document;

@Schema()
export class OnlinerFlat {
    @Prop()
    id: number;

    @Prop()
    created_at: string;

    @Prop()
    last_time_up: string;

    @Prop({ type: Object })
    location: { address: string, user_address: string, latitude: number, longitude: number };

    @Prop()
    photo: string;

    @Prop({ type: Object })
    price: { amount: string, currency: string, converted: object };

    @Prop()
    rent_type: string;

    @Prop()
    url: string;

    @Prop()
    up_available_in: number;
}

export const OnlinerFlatSchema = SchemaFactory.createForClass(OnlinerFlat);
