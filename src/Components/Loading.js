import HideSourceIcon from "@mui/icons-material/HideSource";
import "../loading.css";

function Loading() {
  return (
    <div
      className="backdrop"
    >
      <HideSourceIcon className="spin" />
    </div>
  );
}

export default Loading;
