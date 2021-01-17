import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DomovitaFlatDocument = DomovitaFlat & Document;

@Schema()
export class DomovitaFlat {
    @Prop()
    id: string;

    @Prop()
    photo: string;

    @Prop()
    price: string;

    @Prop()
    url: string;

    @Prop({ type: Object })
    info: { full: string, location: string, rent_type: string };

    @Prop({ type: Object })
    logs: { err: string, bread_crumbs: string };
}

export const DomovitaFlatSchema = SchemaFactory.createForClass(DomovitaFlat);
