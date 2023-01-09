import { Delete, Paid } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { FeedContext } from "../../Contexts/FeedContext";
import { LoadingContext } from "../../Contexts/LoadingContext";

const draggedStyle = {
  border: "2px dashed #000",
  backgroundColor: "rgba(0,0,0,.05)",
};

function PostForm() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [dragging, setDragging] = useState(false);

  const { createPost, tagOptions } = useContext(FeedContext);
  const { setLoading } = useContext(LoadingContext);

  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragover" || e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    const newFiles = dt.files;

    setFiles([...files, ...newFiles]);
  };

  const handleTextChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      default:
        break;
    }
  };

  const validate = () => {
    if (
      !(
        description?.length === 0 ||
        tags?.length === 0 ||
        title?.length === 0 ||
        (isPaid && price === 0)
      )
    )
      return true;
    switch (true) {
      case description?.length === 0:
        enqueueSnackbar("Description is required", {
          variant: "error",
        });
        break;
      case title?.length === 0:
        enqueueSnackbar("Title is required", {
          variant: "error",
        });
        break;
      case tags?.length === 0:
        enqueueSnackbar("Tags are required", {
          variant: "error",
        });
        break;
      case isPaid && price === 0:
        enqueueSnackbar("Price is required", {
          variant: "error",
        });
        break;
      default:
        break;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("isPaid", isPaid);
    formData.append("price", price);

    tags.forEach((tag) => {
      formData.append("tags", tag._id);
    });

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await createPost(formData);

    if (res.success) {
      enqueueSnackbar("Post created successfully", {
        variant: "success",
      });
      setFiles([]);
      setTitle("");
      setIsPaid(false);
      setPrice(0);
      setDescription("");
      setTags([]);
    } else {
      enqueueSnackbar(res.error?.message, {
        variant: "error",
      });
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <form onDragEnter={handleDrag} onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Document title"
          size="small"
          fullWidth
          variant="outlined"
          value={title}
          onChange={handleTextChange}
          sx={{
            mb: 1,
          }}
        />
        <TextField
          name="description"
          label="Document description"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={description}
          onChange={handleTextChange}
          sx={{
            mb: 1,
          }}
        />
        {/* file input with drag and drop */}
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              pt: "16px !important",
            }}
          >
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              style={dragging ? draggedStyle : {}}
            >
              <input
                type="file"
                id="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <Button
                  variant="raised"
                  component="span"
                  fullWidth
                  sx={{
                    p: 1,
                    pt: 2,
                    pb: 3,
                    border: "2px dashed #ccc",

                    "&:focus": {
                      border: "2px dashed #000",
                      backgroundColor: "rgba(0,0,0,.05)",
                    },
                  }}
                >
                  Upload Files
                </Button>
              </label>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{
                mt: 1,
              }}
              multiple
              id="tags-outlined"
              options={tagOptions || []}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Tags" placeholder="Tags" />
              )}
              value={tags}
              onChange={(e, value) => {
                setTags(value);
              }}
            />
          </Grid>
        </Grid>
        {files.length > 0 && (
          <Grid
            container
            spacing={1}
            sx={{
              p: 0,
              mt: 1,
            }}
          >
            {files.map((file) => (
              <Grid
                item
                key={file.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  backgroundColor: "rgba(0,0,0,.05)",
                  m: 1,
                }}
              >
                {file.name}
                <IconButton
                  size="small"
                  onClick={() => {
                    setFiles(files.filter((f) => f.name !== file.name));
                  }}
                >
                  <Delete
                    sx={{
                      color: "red",
                    }}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )}
        Is the post paid?
        <Switch
          checked={isPaid}
          onChange={(e) => {
            setIsPaid(e.target.checked);
          }}
          value="isPaid"
          color="primary"
        />
        {isPaid && (
          <TextField
            name="price"
            type="number"
            label="Price"
            size="small"
            fullWidth
            variant="outlined"
            value={price}
            onChange={handleTextChange}
            sx={{
              mb: 1,
            }}
          />
        )}
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 1 }}>
          Submit
        </Button>
      </form>
    </Grid>
  );
}

export default PostForm;

// import { useState } from "react";
// import {
//   FormControl,
//   FormLabel,
//   TextField,
//   Switch,
//   FormControlLabel,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
//   Autocomplete,
// } from "@mui/material";
// import { useDropzone } from "react-dropzone";
// import { Delete } from "@mui/icons-material";

// export default function PostForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [files, setFiles] = useState([]);
//   const [isPaid, setIsPaid] = useState(false);
//   const [amount, setAmount] = useState(0);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => setFiles(acceptedFiles),
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Send the form data to the server here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <FormControl
//         sx={{
//           mt: 1,
//         }}
//         fullWidth
//       >
//         <FormLabel>Post Title</FormLabel>
//         <TextField
//           required
//           value={title}
//           onChange={(event) => setTitle(event.target.value)}
//         />
//       </FormControl>
//       <FormControl
//         sx={{
//           mt: 1,
//         }}
//         fullWidth
//       >
//         <FormLabel>Description</FormLabel>
//         <TextField
//           required
//           multiline
//           rows={4}
//           value={description}
//           onChange={(event) => setDescription(event.target.value)}
//         />
//       </FormControl>
//       <FormControl fullWidth sx={{ mt: 1 }}>
//         <Autocomplete
//           sx={{
//             mt: 1,
//           }}
//           multiple
//           id="tags-outlined"
//           options={tagOptions || []}
//           getOptionLabel={(option) => option.name}
//           filterSelectedOptions
//           renderInput={(params) => (
//             <TextField {...params} label="Tags" placeholder="Tags" />
//           )}
//           value={tags}
//           onChange={(e, value) => {
//             setTags(value);
//           }}
//         />
//       </FormControl>

//       <FormControl
//         sx={{
//           mt: 1,
//           border: "2px dashed #ccc",
//         }}
//         fullWidth
//       >
//         <FormLabel>Upload Images</FormLabel>
//         <div {...getRootProps()}>
//           <input {...getInputProps()} />
//           {files.length === 0 ? (
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           ) : (
//             <p>{files.length} files selected</p>
//           )}
//         </div>
//       </FormControl>
//       {files.length > 0 && (
//         <List>
//           {files.map((file) => (
//             <ListItem key={file.name}>
//               <ListItemText primary={file.name} />
//               <ListItemSecondaryAction>
//                 <IconButton
//                   edge="end"
//                   aria-label="delete"
//                   onClick={() => {
//                     setFiles(files.filter((f) => f.name !== file.name));
//                   }}
//                 >
//                   <Delete />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))}
//         </List>
//       )}
//       <FormControlLabel
//         control={
//           <Switch
//             checked={isPaid}
//             onChange={(event) => setIsPaid(event.target.checked)}
//           />
//         }
//         label="Is this a paid post?"
//       />
//       {isPaid && (
//         <TextField
//           required
//           type="number"
//           value={amount}
//           onChange={(event) => setAmount(event.target.value)}
//           size="small"
//         />
//       )}
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         sx={{
//           mt: 1,
//           ml: 1,
//         }}
//       >
//         Submit
//       </Button>
//     </form>
//   );
// }
