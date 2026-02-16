#  AWS Serverless Todo API

Production-ready Serverless REST API built using AWS managed services.

---

##  Overview

This project implements a fully serverless backend using:

- API Gateway (HTTP API)
- AWS Lambda (Node.js 24 runtime)
- DynamoDB (On-demand capacity)
- IAM (Least privilege access control)
- CloudWatch Logs

Architecture:

Client → API Gateway → Lambda → DynamoDB

---

##  Architecture

(Add architecture screenshot here)

---

##  DynamoDB

- Table Name: `Todos`
- Partition Key: `id.`
- Capacity Mode: On-demand

---

##  IAM Role

Lambda execution role configured with:

- AWSLambdaBasicExecutionRole
- AmazonDynamoDBFullAccess (Development)

---

## ⚙ Lambda Function

Supports:

- GET /todos
- POST /todos
- DELETE /todos/{id}

---

##  Deployment

API deployed to `prod` stage via API Gateway.

Public endpoint successfully tested and verified.

Example Response:

```json
[
  {
    "id": "1",
    "task": "Learn Serverless"
  }
]
```

---

##  Key Learnings

- Serverless architecture design
- IAM trust relationships
- API Gateway routing & deployment
- DynamoDB scaling model
- End-to-end cloud debugging

---

##  Conclusion

This project demonstrates the ability to design and deploy scalable, event-driven backend systems using AWS managed services without provisioning servers.
