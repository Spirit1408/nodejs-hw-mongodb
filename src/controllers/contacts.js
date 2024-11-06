import createHttpError from "http-errors";
import {
	createContact,
	deleteContact,
	getAllContacts,
	getContactById,
	updateContact,
} from "../services/contacts.js";

export const getServerStatusController = (req, res) => {
	res.status(200).json({
		message: "Server is running",
	});
};

export const getContactsController = async (req, res) => {
	const contacts = await getAllContacts();
	res.status(200).json({
		status: 200,
		message: "Successfully found contacts",
		data: contacts,
	});
};

export const getContactByIdController = async (req, res) => {
	const { id } = req.params;

	const contact = await getContactById(id);

	if (!contact) {
		throw createHttpError(404, "Contact not found");
	}

	res.status(200).json({
		status: 200,
		message: `Successfully found contact with id ${id}!`,
		data: contact,
	});
};

export const createContactController = async (req, res) => {
	const newContact = await createContact(req.body);

	res.status(201).json({
		status: 201,
		message: "Successfully created a contact!",
		data: newContact,
	});
};

export const patchContactController = async (req, res, next) => {
	const { id } = req.params;

	const result = await updateContact(id, req.body);

	if (!result) {
		next(createHttpError(404, "Contact not found"));
	}

	res.json({
		status: 200,
		message: "Successfully patched a contact!",
		data: result.contact,
	});
};

export const deleteContactController = async (req, res, next) => {
	const { id } = req.params;

	const result = await deleteContact(id);

	if (!result) {
		next(createHttpError(404, "Contact not found"));
		return;
	}

	res.status(204).send();
};
