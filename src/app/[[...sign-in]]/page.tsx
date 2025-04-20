'use client';

import Head from 'next/head';
import Image from 'next/image';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const currentYear = new Date().getFullYear();

  // Get user data from the sign-in step
  const { isSignedIn, user, isLoaded } = useUser();

  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata?.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <>
      {/* Preload the background image */}
      <Head>
        <link rel="preload" href="/wallpaper.webp" as="image" type="image/webp" />
        <style>{`
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          #__next {
            height: 100%;
          }
          /* Handle mobile viewport height */
          @supports (-webkit-touch-callout: none) {
            .min-h-screen {
              min-height: 100vh;
              min-height: calc(var(--vh, 1vh) * 100);
            }
          }
        `}</style>
      </Head>

      <div className="min-h-screen h-full flex flex-col items-center justify-center py-6 px-4 bg-loginImage bg-cover bg-center">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/60" />

        {/* School Logo at Top-Left */}
        <div className="fixed top-8 left-8 z-20 p-2 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="School Logo"
            width={48}
            height={48}
            className="object-contain w-120"
            priority
            quality={100}
          />
        </div>

        {/* Content */}
        <div className="relative grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full z-10 pt-24 md:pt-0">
          <div>
            <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-white">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                SchoolConnect
              </span>
              : Your Gateway to Learning
            </h2>
            <p className="text-sm mt-6 text-gray-200 leading-relaxed">
              Fostering collaboration and connection within the educational community to create a seamless and enriched learning experience.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <SignIn.Root>
              <SignIn.Step
                name="start"
                className="max-w-md w-full bg-white/80 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
                  Sign in
                </h3>

                <Clerk.GlobalError className="text-sm text-red mb-4" />

                <div className="space-y-6">
                  <Clerk.Field name="identifier">
                    <Clerk.Label className="text-sm text-slate-800 font-medium mb-2 block">
                      Username
                    </Clerk.Label>
                    <Clerk.Input
                      type="text"
                      required
                      className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                      placeholder="Student No/username"
                    />
                    <Clerk.FieldError className="text-sm text-red mt-1" />
                  </Clerk.Field>

                  <Clerk.Field name="password">
                    <Clerk.Label className="text-sm text-slate-800 font-medium mb-2 block">
                      Password
                    </Clerk.Label>
                    <Clerk.Input
                      type="password"
                      required
                      className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                      placeholder="Enter your Password"
                    />
                    <Clerk.FieldError className="text-sm text-red mt-1" />
                  </Clerk.Field>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm">
                      <a
                        href="javascript:void(0);"
                        className="text-blue-600 hover:text-blue-500 font-medium"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                </div>

                <SignIn.Action
                  submit
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600 focus:outline-none transition-all duration-300 !mt-12"
                >
                  Log in
                </SignIn.Action>
              </SignIn.Step>
            </SignIn.Root>

            {/* Centered "Don't have an account?" text */}
            <div className="max-w-md w-full text-center">
              <p className="text-sm mt-4 text-white">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-500 font-medium hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
              {/* Copyright text with dynamic year */}
              <p className="text-sm mt-4 text-gray-300">
                Copyright © {currentYear} - Jasiri labs Tech
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;