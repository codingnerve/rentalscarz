import { connectToDatabase } from "./mongodb";
import {
  Vehicle,
  Location,
  Booking,
  AdminUser,
  BusinessSettings,
  IVehicle,
  ILocation,
  IBooking,
  IAdminUser,
  IBusinessSettings,
} from "./models";

// Helper to translate Prisma query operators to MongoDB query operators
function translateWhere(where: any = {}) {
  const query: any = {};
  for (const key of Object.keys(where)) {
    const val = where[key];
    if (key === "id") {
      // Check both _id and id virtual
      if (typeof val === "string" && val.length === 24) {
        query.$or = [{ _id: val }, { id: val }];
      } else {
        query[key] = val;
      }
      continue;
    }

    if (val && typeof val === "object" && !Array.isArray(val) && !(val instanceof Date)) {
      const fieldQuery: any = {};
      if ("equals" in val) fieldQuery.$eq = val.equals;
      if ("not" in val) fieldQuery.$ne = val.not;
      if ("in" in val) fieldQuery.$in = val.in;
      if ("notIn" in val) fieldQuery.$nin = val.notIn;
      if ("lt" in val) fieldQuery.$lt = val.lt;
      if ("lte" in val) fieldQuery.$lte = val.lte;
      if ("gt" in val) fieldQuery.$gt = val.gt;
      if ("gte" in val) fieldQuery.$gte = val.gte;
      if ("contains" in val) {
        fieldQuery.$regex = new RegExp(val.contains, val.mode === "insensitive" ? "i" : "");
      }
      query[key] = fieldQuery;
    } else {
      query[key] = val;
    }
  }
  return query;
}

function translateOrderBy(orderBy: any) {
  if (!orderBy) return { createdAt: -1 };
  if (Array.isArray(orderBy)) {
    const sort: any = {};
    for (const item of orderBy) {
      for (const k of Object.keys(item)) {
        sort[k] = item[k] === "desc" ? -1 : 1;
      }
    }
    return sort;
  }
  const sort: any = {};
  for (const k of Object.keys(orderBy)) {
    sort[k] = orderBy[k] === "desc" ? -1 : 1;
  }
  return sort;
}

function cleanDoc(doc: any) {
  if (!doc) return null;
  const obj = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };
  if (obj._id && !obj.id) {
    obj.id = obj._id.toString();
  }
  delete obj.__v;
  return obj;
}

// Model wrapper factory
function createModelWrapper<T>(model: any) {
  return {
    async findMany(args: { where?: any; orderBy?: any; take?: number; skip?: number; select?: any } = {}): Promise<T[]> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      const sort = translateOrderBy(args.orderBy);
      let q = model.find(filter).sort(sort);
      if (args.skip) q = q.skip(args.skip);
      if (args.take) q = q.limit(args.take);
      const docs = await q.exec();
      return docs.map(cleanDoc) as T[];
    },

    async findUnique(args: { where: any }): Promise<T | null> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      const doc = await model.findOne(filter).exec();
      return cleanDoc(doc) as T | null;
    },

    async findFirst(args: { where?: any; orderBy?: any } = {}): Promise<T | null> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      const sort = translateOrderBy(args.orderBy);
      const doc = await model.findOne(filter).sort(sort).exec();
      return cleanDoc(doc) as T | null;
    },

    async count(args: { where?: any } = {}): Promise<number> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      return await model.countDocuments(filter).exec();
    },

    async create(args: { data: any }): Promise<T> {
      await connectToDatabase();
      const doc = new model(args.data);
      await doc.save();
      return cleanDoc(doc) as T;
    },

    async update(args: { where: any; data: any }): Promise<T> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      const doc = await model.findOneAndUpdate(filter, { $set: args.data }, { new: true }).exec();
      return cleanDoc(doc) as T;
    },

    async upsert(args: { where: any; update: any; create: any }): Promise<T> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      const existing = await model.findOne(filter).exec();
      if (existing) {
        const doc = await model.findOneAndUpdate(filter, { $set: args.update }, { new: true }).exec();
        return cleanDoc(doc) as T;
      } else {
        const doc = new model({ ...args.create, ...args.where });
        await doc.save();
        return cleanDoc(doc) as T;
      }
    },

    async delete(args: { where: any }): Promise<T | null> {
      await connectToDatabase();
      const filter = translateWhere(args.where);
      const doc = await model.findOneAndDelete(filter).exec();
      return cleanDoc(doc) as T | null;
    },
  };
}

export const prisma = {
  vehicle: createModelWrapper<IVehicle>(Vehicle),
  location: createModelWrapper<ILocation>(Location),
  booking: createModelWrapper<IBooking>(Booking),
  adminUser: createModelWrapper<IAdminUser>(AdminUser),
  businessSettings: createModelWrapper<IBusinessSettings>(BusinessSettings),
  $disconnect: async () => {
    // No-op for Mongoose connection reuse
  },
};

export { connectToDatabase, Vehicle, Location, Booking, AdminUser, BusinessSettings };
export type { IVehicle, ILocation, IBooking, IAdminUser, IBusinessSettings };
export default prisma;
