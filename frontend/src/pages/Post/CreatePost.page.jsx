import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useLocation, useNavigate } from "react-router-dom";

function CreatePostPage() {
  const navigate = useNavigate();

  let { state } = useLocation();
  const form = useForm({
    initialValues: {
      title: `${state == null ? "" : state.title}`,
      category: `${state == null ? "" : state.category}`,
      image: `${state == null ? "" : state.image}`,
      content: `${state == null ? "" : state.content}`,
    },
  });

  const handleSubmit = async (values) => {
    if (state == null) {
      const res = await axios.post(`${DOMAIN}/api/posts`, values);
      if (res?.data.success) {
        navigate("/posts");
      }
    }
    else {
      const res = await axios.post(`${DOMAIN}/api/posts/${window.location.pathname.split("/").pop()}`, values);
      if (res?.data.success) {
        navigate(`/posts/${window.location.pathname.split("/").pop()}`);
      }
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">{state == null ? "Submit" : "Update"}</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CreatePostPage;