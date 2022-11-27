"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const enums_1 = __importDefault(require("../controllers/enums"));
const enum_1 = require("../models/enum");
const roleValidation_1 = __importDefault(require("../middleware/roleValidation"));
const authValidation_1 = __importDefault(require("../middleware/authValidation"));
const router = express.Router();
router.get('/user/roles', authValidation_1.default, (0, roleValidation_1.default)(enum_1.ALL_ROLES), enums_1.default.roles);
router.get('/order/statuses', authValidation_1.default, (0, roleValidation_1.default)(enum_1.ALL_ROLES), enums_1.default.statuses);
router.get('/order/types', authValidation_1.default, (0, roleValidation_1.default)(enum_1.ALL_ROLES), enums_1.default.types);
exports.default = router;
