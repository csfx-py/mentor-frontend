import { Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FeedContext } from "../Contexts/FeedContext";
import Post from "../Components/Feed/Post";

export default function SinglePost() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { getPost } = useContext(FeedContext);
  const [post, setPost] = useState({});

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(postId).then((res) => {
      console.log(res);
      if (res.success) {
        setPost(res?.post);
        return;
      }
      enqueueSnackbar(res?.error?.message, { variant: "error" });
      navigate("/post-not-found");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      {console.log(post)}
      <Post post={post} />
    </Container>
  );
}
