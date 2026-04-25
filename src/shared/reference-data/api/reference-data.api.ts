import { apiSync } from "@/core/api/client.sync";
import {
  BankOptionListSchema,
  CityOptionListSchema,
  CountryOptionListSchema,
  LgaOptionListSchema,
  StateOptionListSchema,
} from "../schemas/reference-data.schemas";
import type { BankOption, CityOption, CountryOption, LgaOption, StateOption } from "../types";

function unwrapData<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export const referenceDataApi = {
  async getCountries(): Promise<CountryOption[]> {
    const { data } = await apiSync.get("/v1/common/reference/countries/");
    return CountryOptionListSchema.parse(unwrapData(data));
  },

  async getStates(countryCode: string): Promise<StateOption[]> {
    const { data } = await apiSync.get(`/v1/common/reference/countries/${countryCode}/states/`);
    return StateOptionListSchema.parse(unwrapData(data));
  },

  async getLgas(countryCode: string, stateCode: string): Promise<LgaOption[]> {
    const { data } = await apiSync.get(
      `/v1/common/reference/countries/${countryCode}/states/${stateCode}/lgas/`,
    );
    return LgaOptionListSchema.parse(unwrapData(data));
  },

  async getCities(countryCode: string, stateCode?: string, lgaCode?: string): Promise<CityOption[]> {
    const { data } = await apiSync.get(`/v1/common/reference/countries/${countryCode}/cities/`, {
      params: { state: stateCode, lga: lgaCode },
    });
    return CityOptionListSchema.parse(unwrapData(data));
  },

  async getBanks(countryCode = "NG"): Promise<BankOption[]> {
    const { data } = await apiSync.get("/v1/common/reference/banks/", {
      params: { country: countryCode },
    });
    return BankOptionListSchema.parse(unwrapData(data));
  },
};

