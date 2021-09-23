import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '@services/api';
import { UserDto, UserTypeEnum } from '@dto/user-dto';
import { AuthOrganizationDto, OrganizationDto } from '@dto/organization-dto';
import axios from 'axios';

type SetOrganizationData = AuthOrganizationDto;

interface AuthContextData {
  user: UserDto;
  accessToken: string;
  organization: OrganizationDto;
  isLoading: boolean;
  clearAuthData: () => Promise<void>;
  reconcileOrganizationData: (organizationData: OrganizationDto) => void;
  setOrganizationData: ({
    organizationData,
    userData,
    accessToken,
  }: SetOrganizationData) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const STORAGE_KEY = '@help-app:user';

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState({} as UserDto);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState({} as OrganizationDto);

  const setOrganizationData = useCallback(
    async ({ organizationData, userData, accessToken }: SetOrganizationData): Promise<void> => {
      setUser(userData);
      setOrganization(organizationData);
      setAccessToken(accessToken);

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ organizationData, userData, accessToken }),
        );
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    [],
  );

  const reconcileOrganizationData = useCallback((organizationData: OrganizationDto) => {
    setOrganization((prevState) => ({ ...prevState, ...organizationData }));
  }, []);

  const clearAuthData = useCallback(async (): Promise<void> => {
    setAccessToken('');
    setUser({} as UserDto);
    setOrganization({} as OrganizationDto);

    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      api.defaults.headers.common['Authorization'] = '';
    } catch (error: any) {
      console.log('[clearAuthData] error:', error);
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const authData = await AsyncStorage.getItem(STORAGE_KEY);

      if (authData) {
        const formattedData = JSON.parse(authData) as SetOrganizationData;

        if (formattedData?.userData?.userType === UserTypeEnum.ORGANIZATION) {
          setOrganizationData(formattedData);
        }
      }

      setIsLoading(false);
    })();
  }, [setOrganizationData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        organization,
        isLoading,
        setOrganizationData,
        reconcileOrganizationData,
        clearAuthData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
