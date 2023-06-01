import { Express, Request, Response } from "express";
import {
  createShortUrl,
  handleRedirect,
  getAnalytics,
  getShortUrl,
  getAllUrls,
  getAnalyticsforURL,
} from "../controller/shortUrl.controller";
import validateResourse from "../middleware/validateResourse";
import shortUrlSchema from "../schemas/createShortUrl.schema";

function routes(app: Express) {
  app.head("/healthcheck", (req: Request, res: Response) => {
    return res.status(200).send({
      success: "✅ success",
      message: "🆗 server is up and running",
    });
  });

  app.post("/api/url", validateResourse(shortUrlSchema), createShortUrl);

  app.get("/:shortId", handleRedirect);

  app.get("/api/history", getAllUrls);

  app.get("/api/url/:shortId", getShortUrl);

  app.get("/api/analytics", getAnalytics);

  app.get("/api/analytics/:shortId", getAnalyticsforURL);
}

export default routes;
