import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { FC, ReactNode, useEffect } from 'react'
import Router from 'next/router'

import { useLoading, useUser, client } from '@lib'
import { Loader } from '@components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider pageProps={pageProps}>
      <div className="bg-primary-3 min-h-screen">
        <Loader />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </UserProvider>
  )
}

// initiates the user state
const UserProvider: FC<{ children: ReactNode; pageProps: any }> = ({
  children,
  pageProps,
}) => {
  const { setLoading, loading } = useLoading()
  const { user, setUser } = useUser()

  useEffect(() => {
    if (user) return

    setLoading(true)
    client
      .get('/api/auth/me')
      .then((r) => {
        setUser(r.data)
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pageProps.protected && !user && !loading) {
      Router.push('/')
    }
  }, [user, loading]) // eslint-disable-line react-hooks/exhaustive-deps

  if (pageProps.protected && !user) return <Loader />

  return <>{children}</>
}

export default MyApp
