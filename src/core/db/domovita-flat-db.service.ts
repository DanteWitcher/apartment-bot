import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DomovitaFlatDto } from '../../domovita/dto/domovita-flat.dto';
import { DomovitaFlat, DomovitaFlatDocument } from '../../domovita/schema/domovita-flat.schema';

@Injectable()
export class DomovitaFlatDbService {
    constructor(
        @InjectModel(DomovitaFlat.name) private readonly domovitaFlatModel: Model<DomovitaFlatDocument>,
    ) { }

    async delete(deleteApartmentDto: DomovitaFlatDto) {
        this.domovitaFlatModel.deleteOne(deleteApartmentDto, {}, (err) => {
            console.log(`the Err of deleting ${deleteApartmentDto} is, err: ${err}`);
        });
    }

    async create(createApartmentDto: DomovitaFlatDto): Promise<DomovitaFlat> {
        const createApartment = new this.domovitaFlatModel(createApartmentDto);
        return createApartment.save();
    }

    async findAll(): Promise<DomovitaFlat[]> {
        return this.domovitaFlatModel.find().exec();
    }
}
