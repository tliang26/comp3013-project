import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { Await, defer, useLoaderData } from "react-router-dom";
import PageLoader from "../../components/misc/PageLoader";
import React from "react";

export const PostPage = () => {
  const posts = useLoaderData();
  return (
    <Container>
      <SimpleGrid cols={3}>
        {posts?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  return res.data;
};

/*
<Container>
  <React.Suspense fallback={<PageLoader />}>
    <Await
      resolve={posts}
      errorElement={
        <p>Error loading posts!</p>
      }
    >
      <SimpleGrid cols={3}>
        {posts?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Await>
  </React.Suspense>
</Container>
*/