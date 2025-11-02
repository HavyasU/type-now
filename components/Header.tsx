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
      routeName: "Home",
      routeLink: "/",
    },
    {
      routeName: "Type-Test",
      routeLink: "/type-test",
    }
  ];
  return (
    <div className="flex w-full   py-6 px-2 bg-black border-b-yellow-500 border-b-2 text-white font-bold justify-between items-center">
      <div className=" mx-3 flex gap-2 flex-row w-fit h-full">
        <Keyboard />
        <h1>Type-now</h1>
      </div>
      <div className="flex align-baseline w-fit mx-4 gap-4">
        {routeData &&
          routeData?.map((ele, index) => {
            return (
              <Link
              className="text-sm md:text-lg "
                key={index}
                href={ele.routeLink}
                title={ele.routeName}>
                {ele.routeName}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Header;
