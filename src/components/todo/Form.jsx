import React from "react";
import { Form } from "react-bootstrap";
import useForm from './hooks.form'
import { Button } from "@blueprintjs/core";
import './form.css'
export default function ItemForm(props) {
  const { handleChange, handleSubmit } = useForm(props.addItem);
  return (
    <div>
      <h2 style={{color:'#ffb3b3'}} >Add To Do Item</h2>
      <form onSubmit={handleSubmit}>

                <label style={{marginLeft:'1%'}}>
                    <span style={{marginRight:'10px'}}>To Do Item</span>
                    <input className="bp3-input" style={{width:'70px'}} placeholder="Item Details" name="text" type="text" onChange={handleChange} />
                </label>

                <label style={{marginLeft:'1%'}}>
                    <span style={{marginRight:'10px'}}>Assigned To</span>
                    <input style={{marginRight:'10px'}} className="bp3-input" style={{width:'70px'}} placeholder="Assignee Name" name="assignee" type="text" onChange={handleChange} />
                </label>

                <label style={{marginLeft:'1%'}}>
                    <span style={{marginRight:'10px'}}>Difficulty</span>
                    <input style={{marginRight:'10px'}} name="difficulty" min={1} max={5} type="range" onChange={handleChange} defaultValue={3} />

                </label>

                <label>
                    <Button style={{backgroundColor:'#ffb3b3'}} type="submit">Add Item</Button>
                </label>
            </form>
    </div>
  );
}