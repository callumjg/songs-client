import React, { ReactNode } from "react";
import useSong from "../hooks/useSong";

const SongTitle: React.FC<{
  id: string;
  children?: ReactNode;
  placeholder?: string;
}> = ({ id, children, placeholder }) => {
  const [song] = useSong(id, { refreshOnLoad: false });

  return <span>{song?.title || placeholder || children}</span>;
};

export default SongTitle;
