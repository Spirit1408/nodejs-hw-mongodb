import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import { getAllContacts, getContactById } from "./services/contacts.js";

const PORT = Number(env("PORT", 3000));

export const setupServer = () => {
	const app = express();

	app.use(cors());

	app.use(
		pino({
			transport: {
				target: "pino-pretty",
			},
		}),
	);

	app.get("/", (req, res) => {
		res.status(200).json({
			message: "Server is running",
		});
	});

	app.get("/contacts", async (req, res) => {
		const contacts = await getAllContacts();
		res.status(200).json({
			status: 200,
			message: "Successfully found contacts",
			data: contacts,
		});
	});

	app.get("/contacts/:id", async (req, res) => {
		const { id } = req.params;

		const contact = await getContactById(id);

		if (!contact) {
			return res.status(404).json({
				message: "Contact not found",
			});
		}

		res.status(200).json({
			message: `Successfully found contact with id ${id}!`,
			data: contact,
		});
	});

	app.use("*", (req, res) => {
		res.status(404).json({
			message: "Not found",
		});
	});

	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
};
