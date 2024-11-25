import { FilterQuery, QueryOptions, UpdateQuery, Model } from "mongoose";

export class BaseService<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    findAll({ page, limit }: { page: number; limit: number }) {
        const startIndex = (page - 1) * limit;
        return this.model.find().skip(startIndex).limit(limit);
    }

    findById({ id, options }: { id: string; options?: QueryOptions }) {
        return this.model.findById(id, {}, options);
    }

    findByIds({ ids, options }: { ids: string[]; options?: QueryOptions }) {
        return this.model.find({ _id: { $in: ids } }, {}, options);
    }

    findOne({
        query,
        options,
    }: {
        query: FilterQuery<T>;
        options?: QueryOptions;
    }) {
        return this.model.findOne(query, {}, options);
    }

    create({ data }: { data: Partial<T> }) {
        return this.model.create(data);
    }

    updateById({
        id,
        update,
        options = { new: true },
    }: {
        id: string;
        update: UpdateQuery<T>;
        options?: QueryOptions;
    }) {
        return this.model.findByIdAndUpdate(id, update, options);
    }

    deleteById({ id }: { id: string }) {
        return this.model.deleteOne({ _id: id });
    }

    countDocuments({ query }: { query?: FilterQuery<T> } = {}) {
        return this.model.countDocuments(query);
    }
}
