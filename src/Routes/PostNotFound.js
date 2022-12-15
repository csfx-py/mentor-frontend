import PostNotFoundImg from "../Assets/PostNotFound.jpg";

function PostNotFound() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #FFEB3B 0%, #ffffff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={PostNotFoundImg}
        alt="404"
        style={{
          maxHeight: "100vh",
          minHeight: "40vh",
        }}
      />
    </div>
  );
}

export default PostNotFound;
