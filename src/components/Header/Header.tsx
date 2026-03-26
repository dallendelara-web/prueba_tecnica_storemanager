import React from "react";
import type { HeaderProps }  from "@/types/Components";

const Header = ({ title, subtitle, headerActions }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col">
        <h1 className="text-text-ismo-blue text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-ismo-gray-medium text-md">{subtitle}</p>
        )}
      </div>

      {headerActions ? (
        <div className="flex justify-start md:justify-end items-center">
          {headerActions}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
