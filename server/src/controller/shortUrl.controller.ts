import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  try {
    // Get the destination from the request body
    const { destination, shortId } = await req.body;
    // Check if the ShortId already exists
    const short = await shortUrl.findOne({ shortId }).lean();
    if (short) {
      return res.status(409).json({ error: "ShortId already exists" });
    }
    // Create a shortUrl
    const newUrl = await shortUrl.create({ destination, shortId });
    // Return the shortUrl
    return res.send(newUrl);
  } catch (error) {
    // If there is an error, return a 500 error
    return res.sendStatus(500).json({ error: error });
  }
}

export async function handleRedirect(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const short = await shortUrl.findOne({ shortId }).lean();
    if (!short) return res.status(404).json({ error: "URL not found" });
    analytics.create({ shortUrl: short._id });
    return res.redirect(short.destination);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const data = await analytics.find({}).lean();
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export async function getAnalyticsforURL(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const data = await shortUrl.find({ shortId }).lean();
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export async function getShortUrl(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const short = await shortUrl.findOne({ shortId }).lean();
    if (!short) return res.status(404);
    return res.json(short);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export async function getAllUrls(req: Request, res: Response) {
  try {
    const data = await shortUrl.find({}).lean();
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
