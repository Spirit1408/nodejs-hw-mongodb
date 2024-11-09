import { Router } from "express";
import { ctrlWrapper } from "./../utils/ctrlWrapper.js";
import {
	createContactController,
	deleteContactController,
	getContactByIdController,
	getContactsController,
	getServerStatusController,
	patchContactController,
} from "../controllers/contacts.js";
import { validateBody } from "./../middlewares/validateBody.js";
import { isValidId } from "./../middlewares/isValidId.js";
import {
	createContactsSchema,
	updateContactsSchema,
} from "./../validation/contacts.js";

const router = Router();

router.get("/", ctrlWrapper(getServerStatusController));

router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:id", isValidId, ctrlWrapper(getContactByIdController));

router.post(
	"/contacts",
	validateBody(createContactsSchema),
	ctrlWrapper(createContactController),
);

router.patch(
	"/contacts/:id",
	isValidId,
	validateBody(updateContactsSchema),
	ctrlWrapper(patchContactController),
);

router.delete("/contacts/:id", isValidId, ctrlWrapper(deleteContactController));

export default router;
