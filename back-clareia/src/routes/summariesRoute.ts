import Elysia, { t } from "elysia";
import { generateSummary } from "../services/summaries/summaryService";
import {
  findAllSummaries,
  findSummaryById,
} from "../repositories/summaryRepository";

export const summariesRoute = new Elysia({
  prefix: "/summaries",
})
  .get("/", async () => {
    return await findAllSummaries();
  })
  .get("/:id", async ({ params: { id } }) => {
    return await findSummaryById(id);
  })
  .post(
    "/",
    async ({ body: { file }, status }) => {
      const summary = generateSummary(file);
      return status("Created", summary);
    },
    {
      body: t.Object({
        file: t.File(),
      }),
    },
  );
