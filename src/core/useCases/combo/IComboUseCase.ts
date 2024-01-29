import {
  CreateComboUseCaseRequestDTO,
  CreateComboUseCaseResponseDTO,
} from "./dto/CreateComboUseCaseDTO";
import { DeleteComboUseCaseRequestDTO } from "./dto/DeleteComboUseCaseDTO";
import {
  EditComboUseCaseRequestDTO,
  EditComboUseCaseResponseDTO,
} from "./dto/EditComboUseCaseDTO";
import {
  GetComboByIdUseCaseRequestDTO,
  GetComboByIdUseCaseResponseDTO,
} from "./dto/GetComboByIdUseCaseDTO";
import {
  GetCombosUseCaseRequestDTO,
  GetCombosUseCaseResponseDTO,
} from "./dto/GetCombosUseCaseDTO";

export interface IComboUseCase {
  getCombos(
    props: GetCombosUseCaseRequestDTO
  ): Promise<GetCombosUseCaseResponseDTO>;

  getComboById(
    props: GetComboByIdUseCaseRequestDTO
  ): Promise<GetComboByIdUseCaseResponseDTO>;

  createCombo(
    props: CreateComboUseCaseRequestDTO
  ): Promise<CreateComboUseCaseResponseDTO>;

  editCombo(
    props: EditComboUseCaseRequestDTO
  ): Promise<EditComboUseCaseResponseDTO>;

  deleteCombo(props: DeleteComboUseCaseRequestDTO): Promise<void>;
}
