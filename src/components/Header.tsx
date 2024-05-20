import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SideMenu } from "@/components/SideMenu";
import { getUserAuth } from "@/lib/auth/utils";
import { AuthMenu } from "@/components/auth/AuthMenu";

export const Header = async () => {
    const session = await getUserAuth();

    return (
        <>
            <header>
                <div className="bg-muted">
                    <div className="header-container">
                        <div className="flex justify-end py-2">
                            <AuthMenu isLoggedIn={!!session.session} />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="header-container">
                        <div className="flex items-center justify-between py-4 relative">
                            <div className="flex items-center space-x-4">
                                <Link href={"/"}>
                                    {/*<Image*/}
                                    {/*    src="/images/Logo.svg"*/}
                                    {/*    alt="Logo"*/}
                                    {/*    width={34}*/}
                                    {/*    height={40}*/}
                                    {/*/>*/}
                                    <div className="font-bold text-3xl">
                                        TalkTrek
                                    </div>
                                </Link>
                            </div>

                            <Navbar />

                            <SideMenu session={session} />
                        </div>
                    </div>
                </div>

                <div className="bg-muted">
                    <div className="container">
                        <div className="flex items-center justify-center py-4">
                            <div className="text-center space-y-1">
                                <p className="text-sm">
                                    สร้างกระทู้แลกเปลี่ยนความคิดเห็นกันได้เลย
                                </p>
                                <p className="text-xs font-light">
                                    ไม่ว่าจะเป็นเรื่องอะไรก็สามารถปรึกษากันได้
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
