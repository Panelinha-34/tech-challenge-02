/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */

import fastify from "fastify";

import { errorHandling } from "./config/errorHandling";
import { redocConfig } from "./config/redocConfig";
import { routes } from "./config/routes";
import { subscribers } from "./config/subscribers";
import { swaggerConfig } from "./config/swaggerConfig";

export const app = fastify();

swaggerConfig(app);
redocConfig(app);

routes(app);
errorHandling(app);

subscribers();
