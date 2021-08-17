import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function ItemForm(props) {
  return (
    <div>
      <h2>Add To Do Item</h2>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Label>
            <span>To Do Item</span>
            <Form.Control
              onChange={props.handleChange}
              name="text"
              type="text"
              placeholder="Item Details"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <span>Assigned To</span>
            <Form.Control
              onChange={props.handleChange}
              name="assignee"
              type="text"
              placeholder="Assignee Name"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <span>Difficulty</span>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={3}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </Form.Label>
        </Form.Group>

        <Button variant='secondary' type='submit'>
          Add Item
        </Button>
      </Form>
    </div>
  );
}