import React from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
import "./Assignment.css";

const Assignment = ({item}) => (
  <Link to={`/assignments/${item.id}`}>
    <List.Item>{item.title}</List.Item>
  </Link>
)

export default Assignment;