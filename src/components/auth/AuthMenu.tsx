"use client";

import { signIn, signOut } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export const AuthMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return (
        <div className="flex items-center space-x-4 text-xs text-primary">
            {isLoggedIn ? (
                <button
                    type="button"
                    onClick={() => signOut()}
                    className="hover:opacity-75"
                >
                    ออกจากระบบ
                </button>
            ) : (
                <WithoutAuth />
            )}
        </div>
    );
};

const WithoutAuth = () => {
    const [title, setTitle] = useState("เข้าสู่ระบบ");
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const isRequiredAuth = searchParams.get("auth") === "required";

    const onClose = (state: boolean) => {
        if (!state) {
            window.history.replaceState({}, "", "/");
        }

        setOpen(state);
    };

    useEffect(() => {
        if (isRequiredAuth) {
            setTitle("เข้าสู่ระบบ");
            setOpen(true);
        }
    }, [isRequiredAuth]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <button
                    onClick={() => setTitle("เข้าสู่ระบบ")}
                    type="button"
                    className="hover:opacity-75"
                >
                    เข้าสู่ระบบ
                </button>
            </DialogTrigger>
            <span className="w-[2px] h-3 bg-primary"></span>
            <DialogTrigger asChild>
                <button
                    onClick={() => setTitle("สมัครสมาชิก")}
                    type="button"
                    className="hover:opacity-75"
                >
                    สมัครสมาชิก
                </button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-md md:max-w-2xl p-0 overflow-hidden"
                suppressHydrationWarning
            >
                <div className="flex">
                    <div className="flex-1">
                        <Image
                            src={"/images/hoo.jpg"}
                            alt={""}
                            className={"object-cover"}
                            height={500}
                            width={500}
                            quality={100}
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-center p-8 w-full bg-background">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={"/images/logo.svg"}
                            alt={"logo"}
                            width={50}
                            className={"mb-4"}
                        />
                        <h2 className={"text-primary"}>{title}</h2>
                        <div className="relative w-full my-6 opacity-30 ">
                            <hr className="h-0.5 w-full bg-muted-foreground rounded-full" />
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-2 text-muted-foreground">
                                ด้วย
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            className="w-full px-4 py-2 border rounded-full relative text-muted-foreground hover:border-muted-foreground hover:text-primary active:scale-[0.99]"
                        >
                            <div className="absolute top-2 left-4">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_53_188)">
                                        <path
                                            d="M11.1477 1.0525C7.95043 2.16167 5.19309 4.26691 3.28071 7.059C1.36833 9.85109 0.401709 13.1829 0.522836 16.5649C0.643964 19.947 1.84645 23.201 3.95367 25.8492C6.06089 28.4973 8.96178 30.3999 12.2302 31.2775C14.88 31.9612 17.6563 31.9913 20.3202 31.365C22.7335 30.8229 24.9647 29.6634 26.7952 28C28.7004 26.2159 30.0833 23.9462 30.7952 21.435C31.5688 18.7041 31.7065 15.8323 31.1977 13.04H16.3177V19.2125H24.9352C24.763 20.197 24.3939 21.1366 23.8501 21.9751C23.3063 22.8136 22.5989 23.5338 21.7702 24.0925C20.7181 24.7888 19.5318 25.2572 18.2877 25.4675C17.0401 25.6995 15.7604 25.6995 14.5127 25.4675C13.2481 25.2063 12.0518 24.6844 11.0002 23.935C9.3106 22.739 8.04192 21.0398 7.37523 19.08C6.69745 17.0835 6.69745 14.919 7.37523 12.9225C7.8498 11.523 8.63431 10.2488 9.67023 9.19499C10.8557 7.96686 12.3566 7.08899 14.0081 6.65769C15.6597 6.22638 17.3981 6.25832 19.0327 6.75C20.3097 7.1418 21.4775 7.82669 22.4427 8.75C23.4144 7.78333 24.3844 6.81416 25.3527 5.8425C25.8527 5.32 26.3977 4.82249 26.8902 4.2875C25.4166 2.91629 23.6869 1.84926 21.8002 1.1475C18.3645 -0.10003 14.6052 -0.133556 11.1477 1.0525Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M11.1474 1.05249C14.6046 -0.134368 18.3639 -0.101725 21.7999 1.14499C23.6869 1.85152 25.4158 2.92369 26.8874 4.29999C26.3874 4.83499 25.8599 5.33499 25.3499 5.85499C24.3799 6.82332 23.4108 7.78832 22.4424 8.74999C21.4772 7.82668 20.3094 7.1418 19.0324 6.74999C17.3984 6.25659 15.66 6.22281 14.008 6.65235C12.356 7.08188 10.8542 7.95814 9.66744 9.18499C8.63153 10.2388 7.84701 11.513 7.37244 12.9125L2.18994 8.89999C4.04496 5.22139 7.25681 2.40755 11.1474 1.05249Z"
                                            fill="#E33629"
                                        />
                                        <path
                                            d="M0.814876 12.875C1.09322 11.4945 1.55569 10.1575 2.18988 8.90002L7.37238 12.9225C6.6946 14.9191 6.6946 17.0835 7.37238 19.08C5.64571 20.4134 3.91821 21.7534 2.18988 23.1C0.602752 19.9408 0.118707 16.3413 0.814876 12.875Z"
                                            fill="#F8BD00"
                                        />
                                        <path
                                            d="M16.3175 13.0375H31.1975C31.7062 15.8298 31.5686 18.7016 30.795 21.4325C30.0831 23.9437 28.7002 26.2133 26.795 27.9975C25.1225 26.6925 23.4425 25.3975 21.77 24.0925C22.5992 23.5332 23.3069 22.8122 23.8508 21.9728C24.3946 21.1334 24.7634 20.1928 24.935 19.2075H16.3175C16.315 17.1525 16.3175 15.095 16.3175 13.0375Z"
                                            fill="#587DBD"
                                        />
                                        <path
                                            d="M2.1875 23.1C3.91583 21.7666 5.64333 20.4266 7.37 19.08C8.03802 21.0405 9.30851 22.7397 11 23.935C12.0549 24.6809 13.2537 25.1986 14.52 25.455C15.7676 25.687 17.0474 25.687 18.295 25.455C19.5391 25.2447 20.7253 24.7763 21.7775 24.08C23.45 25.385 25.13 26.68 26.8025 27.985C24.9722 29.6493 22.741 30.8097 20.3275 31.3525C17.6635 31.9787 14.8873 31.9487 12.2375 31.265C10.1418 30.7054 8.18419 29.7189 6.4875 28.3675C4.69182 26.9415 3.22509 25.1448 2.1875 23.1Z"
                                            fill="#319F43"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_53_188">
                                            <rect
                                                width="32"
                                                height="32"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            Google
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
