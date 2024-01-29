export interface CheckClientByTaxvatUseCaseRequestDTO {
  taxvat: string;
}

export interface CheckClientByTaxvatUseCaseResponseDTO {
  exist: boolean;
}
