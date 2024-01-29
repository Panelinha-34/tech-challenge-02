import { FastifyInstance } from "fastify";

import { ClientController } from "@/adapters/controllers/client/ClientController";
import { checkClientByTaxvatDocSchema } from "@/adapters/controllers/client/schemas/CheckClientByTaxvatSchema";
import { createClientDocSchema } from "@/adapters/controllers/client/schemas/CreateClientSchema";
import { editClientDocSchema } from "@/adapters/controllers/client/schemas/EditClientSchema";
import { getClientByIdDocSchema } from "@/adapters/controllers/client/schemas/GetClientByIdSchema";
import { getClientsDocSchema } from "@/adapters/controllers/client/schemas/GetClientsSchema";
import { CheckClientByTaxvatPresenter } from "@/adapters/presenters/client/CheckClientByTaxvatPresenter";
import { CreateClientPresenter } from "@/adapters/presenters/client/CreateClientPresenter";
import { EditClientPresenter } from "@/adapters/presenters/client/EditClientPresenter";
import { GetClientByIdPresenter } from "@/adapters/presenters/client/GetClientByIdPresenter";
import { GetClientsPresenter } from "@/adapters/presenters/client/GetClientsPresenter";
import { makeClientRepository } from "@/adapters/repositories/PrismaRepositoryFactory";
import { ClientUseCase } from "@/core/useCases/client/ClientUseCase";

export async function ClientRoutes(app: FastifyInstance) {
  const clientController = new ClientController(
    new ClientUseCase(makeClientRepository()),

    new GetClientsPresenter(),
    new GetClientByIdPresenter(),
    new CreateClientPresenter(),
    new EditClientPresenter(),
    new CheckClientByTaxvatPresenter()
  );

  app.get("", {
    schema: getClientsDocSchema,
    handler: clientController.getClients.bind(clientController),
  });

  app.get("/:id", {
    schema: getClientByIdDocSchema,
    handler: clientController.getClientById.bind(clientController),
  });

  app.get("/check-taxvat", {
    schema: checkClientByTaxvatDocSchema,
    handler: clientController.checkClientByTaxvat.bind(clientController),
  });

  app.post("", {
    schema: createClientDocSchema,
    handler: clientController.createClient.bind(clientController),
  });

  app.put("/:id", {
    schema: editClientDocSchema,
    handler: clientController.editClient.bind(clientController),
  });
}
