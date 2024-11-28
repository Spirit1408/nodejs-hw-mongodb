import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import mainRouter from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

const PORT = Number(env("PORT", 3000));

export const setupServer = () => {
	const app = express();

	app.use(express.json());

	app.use(cors());

	app.use(cookieParser());

	app.use(
		pino({
			transport: {
				target: "pino-pretty",
			},
		}),
	);

	app.use('/api-docs', swaggerDocs());

	app.use(mainRouter);

	app.use("*", notFoundHandler);

	app.use(errorHandler);

	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
};
