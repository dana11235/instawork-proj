import type { Route } from "./+types/list";
import { ListGroup, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PersonCircle, PlusCircleFill } from "react-bootstrap-icons";
import { formatPhone, URL } from "../utils";
import type { User } from "../types/user";
import "./list.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "User List Page" }, { name: "list", content: "User List" }];
}

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(URL.list);
      setUsers(await response.json());
    };
    getUsers();
  }, []);
  return (
    <>
      <Container>
        <h1>Team Members</h1>
        {!users && <div>loading...</div>}
        {users && (
          <>
            <div className="top">
              <p>You have {users.length} team members</p>
              <Link to="/users/new" className="add">
                <PlusCircleFill size={20} className="add" />
              </Link>
            </div>
            <ListGroup>
              {users.map((user: User) => {
                return (
                  <Link to={`/users/${user.id}`} className="edit" key={user.id}>
                    <ListGroup.Item>
                      <div className="person">
                        <PersonCircle size={48} className="image" />
                        <div className="info">
                          <div className="name">
                            {user.first_name} {user.last_name}{" "}
                            {user.role == 2 && <span>(admin)</span>}
                          </div>
                          <div>{formatPhone(user.phone_number)}</div>{" "}
                          <div>{user.email}</div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </Link>
                );
              })}
            </ListGroup>
          </>
        )}
      </Container>
    </>
  );
}
