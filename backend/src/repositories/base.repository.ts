import {
    FilterQuery,
    QueryOptions,
    PopulateOptions,
    UpdateQuery,
    Model,
} from "mongoose";

export class BaseRepository<T> {
    private readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    findAll(filter: FilterQuery<T> = {}, page?: number, limit?: number) {
        const query = this.model
            .find(filter)
            .populate({
                path: "createdBy",
                select: "id username",
                strictPopulate: false,
            })
            .populate({
                path: "updatedBy",
                select: "id username",
                strictPopulate: false,
            });
        if (page && limit) {
            const startIndex = (page - 1) * limit;
            query.skip(startIndex).limit(limit);
        }
        return query;
    }

    findById(id: string) {
        return this.model.findById(id);
    }

    findByIds(ids: string[]) {
        return this.model.find({ _id: { $in: ids } });
    }

    create(data: Partial<T>) {
        return this.model.create(data);
    }

    updateById(id: string, update: UpdateQuery<T>) {
        return this.model.findByIdAndUpdate(id, update, { new: true });
    }

    updateByIds(ids: string[], update: UpdateQuery<T>) {
        return this.model.updateMany({ _id: { $in: ids } }, update);
    }

    deleteById(id: string) {
        return this.model.deleteOne({ _id: id });
    }

    count() {
        return this.model.countDocuments();
    }
}
