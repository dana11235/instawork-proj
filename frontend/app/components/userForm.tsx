import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, InputGroup, Toast, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import type { User } from "../types/user";
import { Roles } from "../utils";
import "./userForm.css";

type Props = {
  submit: (formData: User, setError: (error: string) => void) => string;
  delete?: () => void;
  user?: User;
};

const newUser = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  role: 1,
};

export default function UserForm(props: Props) {
  const [formData, setFormData] = useState(newUser);
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (props.user) setFormData(props.user);
  }, [props.user]);
  const [validated, setValidated] = useState(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setRole = (value: number) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const setErrorMessage = (error: string) => {
    console.log("e", error);
    setError(error);
    setShowToast(true);
  };

  const handleSubmit = (event: FormEvent) => {
    // Use our custom submission logic
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    const form: any = event.currentTarget;
    if (form?.checkValidity() === true) {
      props.submit(formData, setErrorMessage);
    }
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={5000}
        bg={"danger"}
        className="wide"
        autohide
      >
        <Toast.Body>{error}</Toast.Body>
      </Toast>
      <Form.Group>
        <Form.Label className="bold">Info</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            name="first_name"
            type="text"
            required
            placeholder="First Name..."
            value={formData.first_name}
            onChange={handleInputChange}
          ></Form.Control>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            name="last_name"
            type="text"
            required
            placeholder="Last Name..."
            value={formData.last_name}
            onChange={handleInputChange}
          ></Form.Control>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            name="email"
            type="email"
            required
            placeholder="Email..."
            value={formData.email}
            onChange={handleInputChange}
          ></Form.Control>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            name="phone_number"
            type="phone"
            required
            placeholder="Phone Number..."
            pattern="\d{3}-?\d{3}-?\d{4}"
            value={formData.phone_number}
            onChange={handleInputChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please provide a valid 10-digit phone number (dashes allowed).
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label className="bold">Role</Form.Label>
        <Form.Check
          label="Regular - Can't delete members"
          name="role"
          type="radio"
          value={formData.role}
          checked={formData.role === Roles.USER}
          onChange={() => setRole(Roles.USER)}
        />
        <Form.Check
          label="Admin - Can delete members"
          name="role"
          type="radio"
          value={formData.role}
          checked={formData.role === Roles.ADMIN}
          onChange={() => setRole(Roles.ADMIN)}
        />
      </Form.Group>
      <br />
      <div className="actions">
        <div>
          <Button variant="primary" type="submit">
            Save
          </Button>
          &nbsp;
          <Link to="/">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </div>
        {props.delete && (
          <Button variant="danger" onClick={props.delete}>
            Delete
          </Button>
        )}
      </div>
    </Form>
  );
}
