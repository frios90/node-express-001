import { Router } from "express";
import { createLink, getLinks, removeLink, updateLink, getNanoLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.middleware.js";
import { linkValidator, paramsLinkValidator, tokenHeaderValidator, paramNanoLinkValidator } from "../middlewares/validatorManager.middleware.js";

const router = Router();

router.get("/", tokenHeaderValidator, requireToken, getLinks);
router.get("/:nanoLink", paramNanoLinkValidator, getNanoLink);
router.post("/", tokenHeaderValidator, requireToken, linkValidator, createLink);
router.delete(
    "/:id",
    tokenHeaderValidator,
    requireToken,
    paramsLinkValidator,
    removeLink
);
router.patch(
    "/:id",
    requireToken,
    paramsLinkValidator,
    linkValidator,
    updateLink
);
export default router;
