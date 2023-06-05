import { Express, Request, Response } from "express";
import {
  createShortUrl,
  getShortUrl,
  getAllUrls,
  getAnalyticsforURL,
} from "../controller/shortUrl.controller";
import validateResourse from "../middleware/validateResourse";
import shortUrlSchema from "../schemas/createShortUrl.schema";

function routes(app: Express) {
  // head request for uptime robot
  app.head("/", (req: Request, res: Response) => {
    return res.status(200).send();
  });

  // get request for healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.status(200).send({
      success: "✅ success",
      message: "🆗 server is up and running",
    });
  });

  // post request for creating short url
  app.post("/api/url", validateResourse(shortUrlSchema), createShortUrl);

  // get request for getting all urls
  app.get("/api/history", getAllUrls);

  // get request for getting short url
  app.get("/api/url/:shortId", getShortUrl);

  // get request for getting analytics for short url
  app.get("/api/analytics/:shortId", getAnalyticsforURL);
}

export default routes;
