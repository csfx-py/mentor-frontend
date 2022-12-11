import {
    Autocomplete,
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useMemo, useState } from "react";
import { FeedContext } from "../Contexts/FeedContext";

export default function AdminsTags() {
  const { tagOptions } = useContext(FeedContext);

  const [tags, setTags] = useState(tagOptions);

  useMemo(() => {
    setTags(tagOptions);
  }, [tagOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: API call to update tags
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography vatagRefriant="h4" component="h1" gutterBottom>
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
              // if new input is not in tagOptions, add it to tags
              if (value.length > tags.length) {
                const newTag = value[value.length - 1];
                if (!tagOptions.find((tag) => tag.name === newTag)) {
                  setTags([...tags, { name: newTag }]);
                }
              } else setTags(value);
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
