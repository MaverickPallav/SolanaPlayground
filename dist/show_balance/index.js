"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBalance = void 0;
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = __importDefault(require("dotenv"));
const airdrop_1 = require("../airdrop");
dotenv_1.default.config();
const showBalance = (publickey) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = new web3_js_1.Connection(process.env.CONNECTIONURL, "confirmed");
    const response = yield conn.getAccountInfo(publickey);
    return response.lamports / web3_js_1.LAMPORTS_PER_SOL;
});
exports.showBalance = showBalance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const publickey = process.env.PUBLICKEY;
    const balance = yield (0, exports.showBalance)(new web3_js_1.PublicKey(publickey));
    console.log(`The balance for the key ${publickey} is ${balance}`);
    yield (0, airdrop_1.airdrop)(publickey, 1);
    const updatedBalance = yield (0, exports.showBalance)(new web3_js_1.PublicKey(publickey));
    console.log(`Updated balance for the key ${publickey} is ${updatedBalance}`);
}))();
//# sourceMappingURL=index.js.map