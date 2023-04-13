import { PrismaClient } from "@prisma/client";

export const PrismaHelper = {
  client: new PrismaClient(),

  map: (data: any): any => {
    const { id, ...rest } = data;
    return Object.assign({}, rest, { id: id });
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => PrismaHelper.map(c));
  },
};
