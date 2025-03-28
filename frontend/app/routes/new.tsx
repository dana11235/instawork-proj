import type { Route } from "./+types/list";
import { Container } from "react-bootstrap";
import UserForm from "../components/userForm";
import "./list.css";
import type { User } from "../types/user";
import { URL, parseErrors } from "../utils";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New User Page" }, { name: "new", content: "New User" }];
}

export default function New() {
  const submit = async (formData: User, setError: (error: string) => void) => {
    const response = await fetch(URL.list, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      // This isn't the prettiest way to handle server-side errors, but we catch most errors client-side
      setError(parseErrors(await response.json()));
    } else {
      location.href = "/";
    }
  };
  return (
    <>
      <Container>
        <h1>Add a team Member</h1>
        <p>Set email, location, and role</p>
        <UserForm submit={submit} />
      </Container>
    </>
  );
}
