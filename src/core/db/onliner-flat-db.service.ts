import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnlinerFlatDto } from '../../../src/onliner/dto/onliner-flat.dto';
import { OnlinerFlat, OnlinerFlatDocument } from '../../../src/onliner/schemas/onliner-flat.schema';

@Injectable()
export class ApartmentDbService {
    constructor(
        @InjectModel(OnlinerFlat.name) private readonly onlinerFlatModel: Model<OnlinerFlatDocument>,
    ) { }

    async delete(deleteApartmentDto: OnlinerFlatDto) {
        this.onlinerFlatModel.deleteOne(deleteApartmentDto, {}, (err) => {
            console.log(`the Err of deleting ${deleteApartmentDto} is, err: ${err}`);
        });
    }

    async create(createApartmentDto: OnlinerFlatDto): Promise<OnlinerFlat> {
        const createApartment = new this.onlinerFlatModel(createApartmentDto);
        return createApartment.save();
    }

    async findAll(): Promise<OnlinerFlat[]> {
        return this.onlinerFlatModel.find().exec();
    }
}
