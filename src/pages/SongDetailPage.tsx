import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSong from "../hooks/useSong";

const SongDetailPage: React.FC = () => {
  const { id } = useParams();

  const [song, error, loading] = useSong(Number(id));

  return <div style={{ margin: "3rem 0" }}>{JSON.stringify(song)}</div>;
};

export default SongDetailPage;
