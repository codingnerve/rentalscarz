import { MetadataRoute } from "next";
import { prisma } from "../lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rentalscarz.co";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/cars`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/car-rental`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/economy-car-rental`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suv-rental`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/luxury-car-rental`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/airport-car-rental`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/long-term-car-rental`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/cancellation-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  let vehicleRoutes: MetadataRoute.Sitemap = [];
  let locationRoutes: MetadataRoute.Sitemap = [];

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    vehicleRoutes = vehicles.map((v) => ({
      url: `${baseUrl}/cars/${v.slug}`,
      lastModified: v.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const locations = await prisma.location.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    locationRoutes = locations.map((l) => ({
      url: `${baseUrl}/locations/${l.slug}`,
      lastModified: l.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Error generating dynamic sitemap:", err);
  }

  return [...staticRoutes, ...vehicleRoutes, ...locationRoutes];
}
