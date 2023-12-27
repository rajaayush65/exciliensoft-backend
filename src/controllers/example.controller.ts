import { Request, Response } from 'express';
const exampleResponse = (_req: Request, res: Response) => {
    try {
        return res.status(200).send({
            message: "Hi"
        })
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

export { exampleResponse };