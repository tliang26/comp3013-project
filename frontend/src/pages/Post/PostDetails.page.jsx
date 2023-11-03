import { Link, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Button, Container, Title, Text, Image } from "@mantine/core";
import { findUserById } from "../../../../backend/fakedb"
import classes from "./PostDetails.module.css";

function PostDetailsPage() {
  // get correct post details
  const post = useLoaderData();

  // get name of post author
  const name = findUserById(post.userId).email.split("@")[0];

  // get id of currently logged in user
  const userId = jwtDecode(localStorage.getItem("jwt_access_token")).id;

  return (
    <>
      <Container>
        <div className={classes.details}>
          <div className={classes.flexItem}>
            <Text c="blue">Taken by: {name[0].toUpperCase() + name.slice(1)}</Text>
            <Title order={1}>{post.title}</Title>
            <Text c="blue" fs="italic">{post.category}</Text>
            <p>{post.content}</p>
          </div>
          <Image src={post.image} className={classes.flexItem} />
        </div>
        <div className={classes.button}>
          {userId == post.userId
            ? <Button>
                <Link to="/posts/create" state={post}>Edit</Link>
              </Button>
            : null
          }
          <Button>
            <Link to="/posts">Back to Posts</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;