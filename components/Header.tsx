import { Keyboard } from "lucide-react";
import Link from "next/link";
import React from "react";

interface RouteDataElement {
  routeName: string;
  routeLink: string;
}

const Header = () => {
  const routeData: Array<RouteDataElement> = [
    {
      routeName: "Type Test",
      routeLink: "/type-test",
    },
    {
      routeName: "Support",
      routeLink: "/support",
    },
  ];
  return (
    <div className="flex w-full  py-6 px-3 bg-black border-b-blue-500 border-b-2 text-white font-bold justify-between items-center">
      <div className=" mx-3 flex gap-2 flex-row w-full h-full">
        <Keyboard />
        <h1>Type-Test</h1>
      </div>
      <div className="flex w-1/4 gap-4">
        {routeData &&
          routeData?.map((ele, index) => {
            return (
              <Link key={index} href={ele.routeLink} title={ele.routeName}>
                {ele.routeName}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Header;
