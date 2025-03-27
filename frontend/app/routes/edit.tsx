import type { Route } from "./+types/list";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import UserForm from "../components/userForm";
import "./list.css";
import type { User } from "../types/user";
import { formatPhone, URL } from "../utils";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New User Page" }, { name: "new", content: "New User" }];
}

type Params = {
  userId: string;
};

export default function Edit() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { userId } = useParams<Params>();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(URL.show(userId));
      const user: User = await response.json();
      user.phone_number = formatPhone(user.phone_number);
      setUser(user);
    };
    getUser();
  }, [userId]);

  const submit = async (formData: User) => {
    const response = await fetch(URL.show(userId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      console.log("Error submitting form");
    } else {
      location.href = "/";
    }
  };
  const deleteUser = async () => {
    const response = await fetch(URL.show(userId), {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Error deleting user");
    } else {
      location.href = "/";
    }
  };
  return (
    <>
      <Container>
        <h1>Edit team Member</h1>
        <p>Edit contact info, location, and role</p>
        <UserForm submit={submit} delete={deleteUser} user={user} />
      </Container>
    </>
  );
}
