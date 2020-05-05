import { makeSchema } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";

makeSchema({
    types: [],
    // ...
    plugin: [nexusPrismaPlugin()]
});

