import dayjs from "dayjs";
import _ from "lodash";
import { Card, Form } from "react-bootstrap";

export default function ChatMessage({ msg, style, showName }) {
  return (
    <>
      {showName ? (
        <div className="mb-2">
          <Form.Text className="text-muted" style={{ float: "right" }}>
            <span style={{ color: "#037BFD" }}>{_.capitalize(msg.name)}</span>
          </Form.Text>
        </div>
      ) : null}

      <div>
        <Card style={style} m-1>
          <Card.Body>
            <Card.Text>{`${msg.message}`}</Card.Text>
          </Card.Body>
        </Card>
        <Form.Text className="text-muted">
          {dayjs(msg.date).fromNow()}
        </Form.Text>
      </div>
    </>
  );
}
