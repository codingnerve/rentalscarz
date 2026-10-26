import mongoose, { Schema, Model } from "mongoose";

// ==========================================
// 1. Vehicle Model
// ==========================================
export interface IVehicle {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  seats: number;
  doors: number;
  luggage: number;
  transmission: string;
  fuelType: string;
  dailyRate: number;
  currency: string;
  depositAmount: number;
  mileageLimit: string;
  minDriverAge: number;
  featured: boolean;
  isActive: boolean;
  imageUrl: string;
  gallery: string;
  features: string;
  description: string;
  engine?: string | null;
  fuelEconomy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    category: { type: String, required: true, index: true },
    year: { type: Number, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    luggage: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    dailyRate: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    depositAmount: { type: Number, default: 250 },
    mileageLimit: { type: String, default: "Unlimited mileage included" },
    minDriverAge: { type: Number, default: 21 },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
    gallery: { type: String, default: "[]" },
    features: { type: String, default: "[]" },
    description: { type: String, required: true },
    engine: { type: String, default: null },
    fuelEconomy: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ==========================================
// 2. Location Model
// ==========================================
export interface ILocation {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  stateOrRegion: string;
  country: string;
  countryName: string;
  type: string;
  address: string;
  telephone: string;
  email: string;
  operatingHours: string;
  isPublished: boolean;
  description: string;
  features: string;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    city: { type: String, required: true },
    stateOrRegion: { type: String, required: true },
    country: { type: String, required: true },
    countryName: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    operatingHours: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    description: { type: String, required: true },
    features: { type: String, default: "[]" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ==========================================
// 3. Booking Model
// ==========================================
export interface IBooking {
  id: string;
  bookingReference: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocationId: string;
  pickupLocationName: string;
  returnLocationId: string;
  returnLocationName: string;
  pickupDate: Date;
  pickupTime: string;
  returnDate: Date;
  returnTime: string;
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: string;
  rentalDays: number;
  dailyRate: number;
  estimatedTotal: number;
  currency: string;
  customerNotes?: string | null;
  internalNotes?: string | null;
  driverAgeConfirmed: boolean;
  policyAcknowledged: boolean;
  confirmedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingReference: { type: String, required: true, unique: true, index: true },
    status: { type: String, default: "Pending" },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    pickupLocationId: { type: String, required: true },
    pickupLocationName: { type: String, required: true },
    returnLocationId: { type: String, required: true },
    returnLocationName: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    returnDate: { type: Date, required: true },
    returnTime: { type: String, required: true },
    vehicleId: { type: String, required: true },
    vehicleName: { type: String, required: true },
    vehicleCategory: { type: String, required: true },
    rentalDays: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    estimatedTotal: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    customerNotes: { type: String, default: null },
    internalNotes: { type: String, default: null },
    driverAgeConfirmed: { type: Boolean, default: true },
    policyAcknowledged: { type: Boolean, default: true },
    confirmedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ==========================================
// 4. AdminUser Model
// ==========================================
export interface IAdminUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ==========================================
// 5. BusinessSettings Model
// ==========================================
export interface IBusinessSettings {
  id: string;
  companyName: string;
  supportPhoneUS: string;
  supportPhoneUK: string;
  supportPhoneCA: string;
  supportEmail: string;
  defaultCurrency: string;
  gaMeasurementId: string;
  googleAdsConversionId: string;
  googleAdsBookingLabel: string;
  cancellationHours: number;
  updatedAt: Date;
}

const BusinessSettingsSchema = new Schema<IBusinessSettings>(
  {
    id: { type: String, default: "default", unique: true },
    companyName: { type: String, default: "RentalsCarz" },
    supportPhoneUS: { type: String, default: "+1 (800) 555-0199" },
    supportPhoneUK: { type: String, default: "+44 20 7946 0991" },
    supportPhoneCA: { type: String, default: "+1 (888) 555-0142" },
    supportEmail: { type: String, default: "reservations@rentalscarz.co" },
    defaultCurrency: { type: String, default: "USD" },
    gaMeasurementId: { type: String, default: "" },
    googleAdsConversionId: { type: String, default: "" },
    googleAdsBookingLabel: { type: String, default: "" },
    cancellationHours: { type: Number, default: 48 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Vehicle: Model<IVehicle> =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export const Location: Model<ILocation> =
  mongoose.models.Location || mongoose.model<ILocation>("Location", LocationSchema);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export const BusinessSettings: Model<IBusinessSettings> =
  mongoose.models.BusinessSettings || mongoose.model<IBusinessSettings>("BusinessSettings", BusinessSettingsSchema);
