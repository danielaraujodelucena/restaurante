import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;

    /*
        signIn é um função deve RECEBER umas props 
        iniciais (credentials) que devem obdecer a 
        tipagem SignInProps. signIn ainda RETORNA
        uma Promise void, ou seja, uma Promise
        que não retorna nada. 
    */
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

/* 
    Criando o contexto. 
    
    O context começa com o valor defult {}, ou seja,
    um objeto vazio. Entretanto, ele deve respeitar
    a tipagem AuthContextData.
*/

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log('Erro ao deslogar')
    }
}

/*
    Após criar o contexto, é necessário disponibilizá-lo
    através de um Provider, tornando as propriedades de
    AuthContextData acessíveis para todos os 
    componentes do projeto.
*/

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();

    /* 
        Converte a variável user para booleano.
        Se não tiver usuário é false.
    */
    const isAuthenticated = !!user; 

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id, 
                    name,
                    email
                })
            }).catch(() => {
                signOut();
            })
        }
    }, [])

    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })

            //qualquer página terá acesso a esses dados
            setUser({
                id,
                name,
                email,
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Login efetuado com sucesso");

            Router.push('/dashboard');
        } catch (error) {
            toast.error("Erro ao efetuar o login");
            console.log('Erro ao acessar ', error);
        }
    }

    async function signUp({name, email, password}: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Conta criada com sucesso")

            Router.push('/');
        } catch (error) {
            toast.error("Erro ao criar a conta")
            console.log("Erro ao cadastrar usuário: ", error)
        }
    }

    return(
        /* 
            Cada objeto Context vem com componente Provider.

            As props que estão declaradas em value são passadas para 
            os componentes descendentes do Provider (componentes consumidores). 
        */
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            { children }
        </AuthContext.Provider>
    )
}