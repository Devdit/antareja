import { protectedRoutes } from "@/utils/protectedRoutes";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon } from "./Icons";
import { H3 } from "./global/Text";

interface Sidenavprops {
  active: boolean;
  session?: Session;
}

export default function Sidebar({ active, session }: Readonly<Sidenavprops>) {
  const pathname = usePathname();
  const allowedRoutes = protectedRoutes.filter((item) =>
    item.roles.includes(session?.user?.role!)
  );

  return (
    <aside
      id="sidebar"
      className={`fixed ${
        active ? "w-80" : "w-0 opacity-0"
      } left-0 bg-white top-0 z-20 h-full flex-shrink-0 transition-all duration-300 lg:w-80 lg:opacity-100 hidden lg:flex`}
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 flex-1 flex-col border-r px-4 border-gray-200 bg-white pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex-1 space-y-1 bg-white px-3">
            <Link href={"/"} className="block">
              <H3 className="text-[#F70048]">Admin Panel</H3>
            </Link>
            <ul className="space-y-4 pb-2">
              <li>
                <Link
                  href={"/admin"}
                  className="group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 hover:bg-red-100 transition-all"
                >
                  <DashboardIcon />
                  <p className="ml-3 whitespace-nowrap text-primary-400 font-semibold">
                    Dashboard
                  </p>
                </Link>
              </li>
              <p className="font-semibold">Menu</p>
              {allowedRoutes.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={
                      (pathname.includes(item.path) ? "bg-red-100 " : "") +
                      "group flex items-center rounded-lg p-2 text-base font-normal text-primary-400 hover:bg-red-200 transition-all"
                    }
                  >
                    {/* <div dangerouslySetInnerHTML={{ __html: item.icon }} /> */}
                    <p className="ml-3 whitespace-nowrap text-primary-400 font-semibold">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
