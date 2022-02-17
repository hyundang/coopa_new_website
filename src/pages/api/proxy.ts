import { NextApiRequest, NextApiResponse } from "next";

function isTypeOfUrlString(url: any): url is string {
  return true;
}

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  if (isTypeOfUrlString(req.query.url)) {
    const url = decodeURIComponent(req.query.url);
    const result = await fetch(url);
    const body = await result.body;
    // @ts-ignore
    body?.pipe(res);
  }
};

export default proxy;
