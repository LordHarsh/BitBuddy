import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";

export async function createShortUrl(req: Request, res: Response) {
  try {
    // Get the destination and shortId from the request body
    const { destination, shortId } = await req.body;
    // Check if the ShortId already exists
    const short = await shortUrl.findOne({ shortId }).lean();
    if (short) {
      return res.status(409).send({ error: "ShortId already exists" });
    }
    // Create a shortUrl
    const newUrl = await shortUrl.create({ destination, shortId, clicks: 0 });
    // Return the shortUrl
    return res.send(newUrl);
  } catch (error) {
    // If there is an error, return a 500 error
    return res.send(500).send({ error: error });
  }
}

export async function getAnalyticsforURL(req: Request, res: Response) {
  try {
    // Get the shortId from the request params
    const { shortId } = req.params;
    // Find the shortUrl
    const data = await shortUrl.findOne({ shortId }).lean();
    // If the shortUrl does not exist, return a 404 error
    if (!data) return res.status(404).send({ error: "URL not found" });
    // Send the analytics for the shortUrl
    return res.send(data);
  } catch (error) {
    // If there is an error, return a 500 error
    return res.status(500).send({ error: error });
  }
}

export async function getShortUrl(req: Request, res: Response) {
  try {
    // Get the shortId from the request params
    const { shortId } = req.params;
    // Find the shortUrl
    const short = await shortUrl.findOne({ shortId }).lean();
    // If the shortUrl does not exist, return a 404 error
    if (!short) return res.status(404).send({ error: "URL not found" });
    // Create an updated analytics
    const updateData = await shortUrl
      .findOneAndUpdate({ shortId }, { $inc: { clicks: 1 } }, { new: true })
      .lean();
    // Send the updated analytics
    return res.send(updateData);
  } catch (error) {
    // If there is an error, return a 500 error
    return res.status(500).send({ error: error });
  }
}

export async function getAllUrls(req: Request, res: Response) {
  try {
    // Get all the shortUrls
    const data = await shortUrl.find({}).lean();
    // Send the shortUrls
    return res.send(data);
  } catch (error) {
    // If there is an error, return a 500 error
    return res.status(500).send({ error: error });
  }
}
