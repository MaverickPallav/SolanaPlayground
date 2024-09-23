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
exports.airdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const airdrop = (address, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const publickey = new web3_js_1.PublicKey(address);
    const conn = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    const signature = yield conn.requestAirdrop(publickey, amount * web3_js_1.LAMPORTS_PER_SOL);
    yield conn.confirmTransaction(signature);
});
exports.airdrop = airdrop;
(0, exports.airdrop)(process.env.PUBLICKEY, 1);
//# sourceMappingURL=index.js.map