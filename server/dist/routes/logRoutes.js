"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logController_1 = require("../controllers/logController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/', logController_1.createLog);
router.get('/', logController_1.getLogs);
exports.default = router;
//# sourceMappingURL=logRoutes.js.map