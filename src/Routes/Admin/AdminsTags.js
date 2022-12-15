import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useSnackbar } from "notistack";
import { useContext, useMemo, useState } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { FeedContext } from "../../Contexts/FeedContext";

export default function AdminsTags() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { tagOptions } = useContext(FeedContext);
  const { updateTags } = useContext(AdminContext);

  const [tags, setTags] = useState(tagOptions);
  const [newTag, setNewTag] = useState([]);
  const [removeTag, setRemoveTag] = useState([]);

  useMemo(() => {
    setTags(tagOptions);
  }, [tagOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateTags(removeTag, newTag);
    if (res.success) {
      enqueueSnackbar("Tags updated", { variant: "success" });
    } else {
      enqueueSnackbar(res?.error?.message, { variant: "error" });
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Tags
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit available tags
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="tags"
            freeSolo
            multiple
            options={tags}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
            defaultValue={tagOptions}
            filterSelectedOptions
            value={tags}
            onChange={(e, value) => {
              if (value.length > tags.length) {
                const current = value[value.length - 1];
                if (!tagOptions.find((tag) => tag.name === current)) {
                  setTags([...tags, { name: current }]);
                  setNewTag([...newTag, current]);
                }
              } else {
                setTags(value);
              }

              if (value.length < tags.length) {
                const current = tags.find(
                  (tag) => !value.find((v) => v.name === tag.name)
                );
                setRemoveTag([...removeTag, current._id]);
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 1 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
