export async function POST(req: Request, res: Response) {
  console.log(req.body);
  return Response.json(req.body);
}
