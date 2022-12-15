import {
  Checkbox,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../Contexts/AdminContext";

const tableHead = [
  { id: "_id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "followingTags", label: "Following Tags" },
  { id: "posts", label: "Posts" },
];

export default function AdminUsercc() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { allUsers, getAllUsers } = useContext(AdminContext);

  const [users, setUsers] = useState(allUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useMemo(() => {
    setUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (!res.success) {
        enqueueSnackbar(res?.error?.message, { variant: "error" });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAllClick = (e) => {
    setSelectedUsers(selectedUsers.length === users?.length ? [] : users);
  };

  const handleCheck = (e, user, id) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, user]);
      return;
    }

    setSelectedUsers(selectedUsers.filter((user) => user?._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete users?")) return;

    const res = {
      success: true,
    };

    if (res.success) {
      enqueueSnackbar("Users updated", { variant: "success" });
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
            Manage Users
          </Typography>
        </Grid>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.length === users?.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select or delselect all" }}
                />
              </TableCell>
              {tableHead.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length > 0 &&
              users?.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user)}
                      onChange={(e) => handleCheck(e, user, user?._id)}
                      inputProps={{ "aria-label": "select or delselect" }}
                    />
                  </TableCell>
                  <TableCell>{user?._id}</TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell>
                    {user?.followingTags?.length > 0 ? (
                      user?.followingTags?.map((tag) => (
                        <Chip
                          key={tag._id}
                          label={tag.name}
                          sx={{
                            m: 0.5,
                          }}
                        />
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          m: 0.5,
                        }}
                      >
                        No tags followed
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {user?.posts?.length > 0 ? (
                      user?.posts?.slice(0, 5)?.map((post) => (
                        <Paper
                          elevation={3}
                          sx={{
                            p: 1,
                            m: 0.5,
                          }}
                        >
                          <Typography
                            component={Link}
                            to={`/post/${post._id}`}
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              m: 0.5,
                            }}
                            key={post}
                          >
                            {post?.description?.length > 15
                              ? `${post?.description?.substring(0, 15)}...`
                              : `${post?.description}`}
                          </Typography>
                          <br />
                        </Paper>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          m: 0.5,
                        }}
                      >
                        No posts
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>
    </Container>
  );
}
