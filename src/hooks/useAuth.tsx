import { UserDto, UserTypeEnum } from '@dto/user-dto';
import { AuthOrganizationDto, OrganizationDto } from '@dto/organization-dto';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SetOrganizationData = AuthOrganizationDto;

interface AuthContextData {
  user: UserDto;
  accessToken: string;
  organization: OrganizationDto;
  isLoading: boolean;
  clearAuthData: () => Promise<void>;
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

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as UserDto);
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState({} as OrganizationDto);

  async function setOrganizationData({
    organizationData,
    userData,
    accessToken,
  }: SetOrganizationData): Promise<void> {
    setUser(userData);
    setOrganization(organizationData);
    setAccessToken(accessToken);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ organizationData, userData, accessToken }),
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function clearAuthData(): Promise<void> {
    setAccessToken('');
    setUser({} as UserDto);
    setOrganization({} as OrganizationDto);

    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      console.log('[clearAuthData] error:', error);
      throw new Error(error);
    }
  }

  console.log({ user });

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
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, organization, isLoading, setOrganizationData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
