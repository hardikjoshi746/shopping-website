import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

// const deleteHandler = () => {
//   if (window.confirm("Are you sure?")) alert("User deleted!");
// };
const UsersPageComponent = ({ fetchUser, deleteUser }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]); // users state
  const [userDeleted, setUserDeleted] = useState(false); // user deleted state

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userId); // delete user
      if (data === "User removed") {
        setUserDeleted(!userDeleted); // set user deleted state
      }
    } // delete user
  };
  useEffect(() => {
    const abctrl = new AbortController(); // abort controller
    // fetch users
    fetchUser(abctrl)
      .then((res) => setUsers(res))
      .catch((err) => {
        console.error("Error fetching users:", err);
        if (err.response && err.response.status === 401) {
          dispatch(logout());
        }
        // if (err.response) {
        //   console.log(
        //     err.response.data.message
        //       ? err.response.data.message
        //       : err.response.data
        //   );
        // } else {
        //   console.log("Error:", err.message); // Handle case when err.response is undefined
        // }
      }); // set users state
    return () => abctrl.abort(); // cleanup
  }, [userDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>User List</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text danger"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/edit-user/${user._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)} // delete user
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UsersPageComponent;
