import { AppException } from "../appException";
import Request from "../request";
import TokenService from "../tokenServices";

export interface RefreshTokenApiParams {}

export interface RefreshTokenApiResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenApiDataResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokenApi = async (): Promise<RefreshTokenApiResponse> => {
  try {
    const localRefreshToken = TokenService.getLocalRefreshToken();
    const response = await Request.get(`auth/refresh-token`, {
      headers: { Authorization: `Bearer ${localRefreshToken}` },
    });

    TokenService.setLocalTokenServices({
      accessToken: response?.data?.data?.accessToken,
      refreshToken: response?.data?.data?.refreshToken,
    });

    return response.data.data;
  } catch (error) {
    throw new AppException(error);
  }
};
