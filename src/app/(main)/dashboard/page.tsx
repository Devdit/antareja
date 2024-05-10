import { PrimaryLinkButton } from "@/app/components/global/LinkButton";
import { H2, H3, P } from "@/app/components/global/Text";
import SectionWrapper from "@/app/components/global/Wrapper";
import { getServerSession } from "@/lib/next-auth";
import { getPengumumans } from "@/queries/pengumuman.query";
import { findTim } from "@/queries/tim.query";
import {
  convertTimezone,
  stringifyDate,
  stringifyTime,
} from "@/utils/utilities";
import { redirect } from "next/navigation";
import { FaDownload } from "react-icons/fa";

export default async function TimDashboard() {
  const session = await getServerSession();

  if (!session) return redirect("/auth/login");

  const timByUser = await findTim({ userId: session.user?.id });
  if (!timByUser) return redirect("/form");

  const pengumumans = await getPengumumans();

  return (
    <>
      <SectionWrapper id="heading">
        <div className="flex items-center justify-between w-full mb-3">
          <H2 className="mb-2">Selamat Datang, {session?.user?.nama}👋</H2>
          <PrimaryLinkButton
            href="#"
            className="inline-flex gap-2 items-center"
          >
            Unduh buku panduan <FaDownload />
          </PrimaryLinkButton>
        </div>
        <div className="block w-full bg-white rounded-lg p-5">
          <H3 className="mb-8">Pengumuman Dari Panitia</H3>
          <div className="flex flex-col gap-6">
            {pengumumans.map((pengumuman) => (
              <div
                key={pengumuman.id}
                className="w-full flex items-center gap-4"
              >
                <dl className="w-full text-gray-500 md:max-w-[20%] md:border-r md:border-gray-500">
                  <dd className="flex flex-row gap-[18px] text-base font-medium leading-6 md:flex-col md:gap-2">
                    <time>{stringifyDate(pengumuman.createdAt)}</time>
                    <time>
                      {stringifyTime(
                        convertTimezone(pengumuman.createdAt, "Asia/Jakarta")
                      )}{" "}
                      WIB
                    </time>
                  </dd>
                </dl>
                <div className="w-full md:w-[80%]">
                  <P className="pl-0 md:pl-12">{pengumuman.content}</P>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
