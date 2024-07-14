import { StorageKeys } from "@/utils/sorageKeys";
import Storage from "@/utils/storage";

export interface TOKEN_SERVICES_TYPES {
  refreshToken: string;
  accessToken: string;
}

const getLocalRefreshToken = () => {
  try {
    const tokenServices: TOKEN_SERVICES_TYPES = Storage.getObject(
      StorageKeys.TOKEN_SERVICES
    );

    return tokenServices?.refreshToken;
  } catch (error) {
    return null;
  }
};

const getLocalAccessToken = () => {
  try {
    const tokenServices: TOKEN_SERVICES_TYPES = Storage.getObject(
      StorageKeys.TOKEN_SERVICES
    );
  
    return tokenServices?.accessToken;
  } catch (error) {
    return null;
  }
};

const updateLocalTokenServices = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const tokenServices: TOKEN_SERVICES_TYPES = Storage.getObject(
    StorageKeys.TOKEN_SERVICES
  );

  tokenServices.accessToken = accessToken;
  tokenServices.refreshToken = refreshToken;

  Storage.setObject(
    StorageKeys.TOKEN_SERVICES,
    tokenServices as unknown as { [key: string]: string }
  );
};

const getLocalTokenServices = () => {
  return Storage.getObject(StorageKeys.TOKEN_SERVICES);
};

const setLocalTokenServices = (tokenServices: { [key: string]: string }) => {
  console.log(JSON.stringify(tokenServices));

  Storage.setObject(StorageKeys.TOKEN_SERVICES, tokenServices);
};

const removeLocalTokenServices = () => {
  Storage.delete(StorageKeys.TOKEN_SERVICES);
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalTokenServices,
  getLocalTokenServices,
  setLocalTokenServices,
  removeLocalTokenServices,
};

export default TokenService;
