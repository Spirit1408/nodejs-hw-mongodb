import { Router } from "express";
import { ctrlWrapper } from "./../utils/ctrlWrapper.js";
import {
	createContactController,
	deleteContactController,
	getContactByIdController,
	getContactsController,
	patchContactController,
} from "../controllers/contacts.js";
import { validateBody } from "./../middlewares/validateBody.js";
import { isValidId } from "./../middlewares/isValidId.js";
import {
	createContactsSchema,
	updateContactsSchema,
} from "./../validation/contacts.js";
import { authenticate } from "./../middlewares/authenticate.js";
import { upload } from "./../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:id", isValidId, ctrlWrapper(getContactByIdController));

router.post(
	"/",
	upload.single("photo"),
	validateBody(createContactsSchema),
	ctrlWrapper(createContactController),
);

router.patch(
	"/:id",
	isValidId,
	upload.single("photo"),
	validateBody(updateContactsSchema),
	ctrlWrapper(patchContactController),
);

router.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

export default router;
