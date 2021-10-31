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
import { PersonDto } from '@dto/person-dto';

type SetOrganizationData = AuthOrganizationDto;

type SetPersonData = {
  userData: UserDto;
  personData: PersonDto;
  accessToken: string;
};

interface AuthContextData {
  user: UserDto;
  accessToken: string;
  organization: OrganizationDto;
  person: PersonDto;
  isLoading: boolean;
  clearAuthData: () => Promise<void>;
  reconcileOrganizationData: (organizationData: OrganizationDto) => void;
  reconcilePersonData: (personData: PersonDto) => void;
  setPersonData: (data: SetPersonData) => Promise<void>;
  setOrganizationData: (data: SetOrganizationData) => Promise<void>;
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
  const [person, setPerson] = useState({} as PersonDto);

  const setOrganizationData = useCallback(
    async ({
      organizationData,
      userData,
      accessToken: _accessToken,
    }: SetOrganizationData): Promise<void> => {
      setUser(userData);
      setOrganization(organizationData);
      setAccessToken(_accessToken);

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ organizationData, userData, accessToken: _accessToken }),
        );
        api.defaults.headers.common['Authorization'] = `Bearer ${_accessToken}`;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    [],
  );

  const setPersonData = useCallback(
    async ({ personData, userData, accessToken: _accessToken }: SetPersonData) => {
      setUser(userData);
      setPerson(personData);
      setAccessToken(_accessToken);
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ personData, userData, accessToken: _accessToken }),
        );
        api.defaults.headers.common['Authorization'] = `Bearer ${_accessToken}`;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    [],
  );

  const reconcileOrganizationData = useCallback((organizationData: OrganizationDto) => {
    setOrganization((prevState) => ({ ...prevState, ...organizationData }));
  }, []);

  const reconcilePersonData = useCallback((personData: PersonDto) => {
    setPerson((prevState) => ({ ...prevState, ...personData }));
  }, []);

  const clearAuthData = useCallback(async (): Promise<void> => {
    setAccessToken('');
    setUser({} as UserDto);
    setPerson({} as PersonDto);
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
      setIsLoading(true);
      const authData = await AsyncStorage.getItem(STORAGE_KEY);
      if (authData) {
        const formattedData = JSON.parse(authData);

        if (formattedData?.userData?.userType === UserTypeEnum.ORGANIZATION) {
          await setOrganizationData(formattedData);
        } else if (formattedData?.userData?.userType === UserTypeEnum.PERSON) {
          await setPersonData(formattedData);
        }
      }

      setIsLoading(false);
    })();
  }, [setOrganizationData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        person,
        accessToken,
        organization,
        isLoading,
        reconcilePersonData,
        setPersonData,
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
