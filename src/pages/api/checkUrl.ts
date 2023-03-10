// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import isReachable from 'is-reachable';

type Data = {
  valid: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { url } = JSON.parse(req.body);
  await isReachable(url).then((valid) => {
    res.status(200).json({ valid });
  });
}
